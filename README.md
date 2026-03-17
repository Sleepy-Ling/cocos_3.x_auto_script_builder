# auto_script_builder User Guide

## 1. Installation Method

### 1.1 Build the Plugin

1. **Clone the project**:
   ```bash
   git clone https://github.com/Sleepy-Ling/cocos_3.x_auto_script_builder.git
   ```

2. **Install dependencies**:
   ```bash
   cd auto_script_builder
   npm install
   ```

3. **Build the plugin**:
   ```bash
   npm run build
   ```
   After building, the plugin will be generated in the `dist` directory.

### 1.2 Install in Cocos Creator

1. Open the Cocos Creator editor
2. Click the top menu bar **Extensions** → **Extension Manager**
3. Click the **Import Plugin** button
4. Select the built `dist` directory
5. Wait for the plugin installation to complete, then enable the plugin

## 2. How to Use the Plugin

### 2.1 Auto-generate Scripts

1. **Create or select a prefab**: Create or select a prefab file in Cocos Creator
2. **Save the prefab**: When saving the prefab, the plugin will automatically trigger script generation
3. **View generated scripts**: In the `Scripts` folder at the same level as the prefab, an `Auto_PrefabName.ts` file will be generated

Currently, prefab names only support those with suffixes GameView, View, SAView, and Item. For example:
- `MainGameView.prefab` will generate `Auto_MainGameView.ts`
- `SettingView.prefab` will generate `Auto_SettingView.ts`
- `SettingSAView.prefab` will generate `Auto_SettingSAView.ts`
- `ScoreItem.prefab` will generate `Auto_ScoreItem.ts`
- `Item_HP.prefab` will generate `Auto_Item_HP.ts`
 
### 2.2 Manually Generate Scripts

1. Click the top menu bar **Extensions** → **auto_script_builder** → **Show Log**
2. In the pop-up panel, select the prefab file for which you want to generate scripts
3. Click the **Generate Script** button

## 3. How to Use Generated Scripts

### 3.1 Script Structure Explanation

Generated script files include the following parts:

1. **Import statements**: Automatically import required Cocos Creator components
2. **Class definition**: Class named after the prefab
3. **Member variables**: Corresponding to nodes and components in the prefab
4. **firstInitView method**: Template's first initialization function, which automatically generates node lookup code
5. **Other lifecycle methods**: Based on the methods included in the template

### 3.2 Example Script

```typescript
import { Button, Node, Sprite, Layout } from 'cc';
import { UICompUtil } from 'db://assets/MainPack/Frame/Core/Utils/UICompUtil';
import { ViewBase, ViewParamBase } from 'db://assets/MainPack/Frame/Core/View/ViewBase';
export class Auto_ShopView<T extends ViewParamBase> extends ViewBase<T> {
	btn_close2: Button;
	node_root: Node;
	spr_bg: Sprite;
	layout_bg: Layout;
	spr_title_0: Sprite;
	layout_characterImage: Layout;
	spr_title_1: Sprite;
	btn_close: Button;


    public firstInitView(param?: T): Promise<boolean> {
		this.btn_close2 = UICompUtil.findNodeComp("btn_close2", Button, this.node);
		this.node_root = UICompUtil.findNode("node_root", this.node);
		this.spr_bg = UICompUtil.findNodeComp("spr_bg", Sprite, this.node);
		this.layout_bg = UICompUtil.findNodeComp("layout_bg", Layout, this.node);
		this.spr_title_0 = UICompUtil.findNodeComp("spr_title_0", Sprite, this.node);
		this.layout_characterImage = UICompUtil.findNodeComp("layout_characterImage", Layout, this.node);
		this.spr_title_1 = UICompUtil.findNodeComp("spr_title_1", Sprite, this.node);
		this.btn_close = UICompUtil.findNodeComp("btn_close", Button, this.node);


        return super.firstInitView(param);
    }
}
```

### 3.3 Using Generated Scripts
1. **Create prefab component**: Create a ts file with the corresponding prefab name in Cocos Creator
2. **Inherit base class**: According to the prefab type, choose to inherit from base classes like `Auto_XXXGameView`, `Auto_XXXView`, or `Auto_XXXItem`

3. **Add the script to the prefab**:
   - Select the prefab node
   - In the property inspector, click **Add Component** → **Script** → **Prefab Name**

3. **Access components**:
   ```typescript
   import { Auto_ShopView } from './Auto_ShopView'
   
    @ccclass('ShopView')// Get component instance
    export class ShopView extends Auto_ShopView<ViewParamBase> {
        public firstInitView(param?: ViewParamBase): Promise<boolean> {
            let p = super.firstInitView(param);
            //Directly use btn_close button
            this.bindBtnClickEvent(this.btn_close, "closeSelf");
            return p;
        }

        public onViewOpen(param: ViewParamBase): void {
            super.onViewOpen(param);

            //Directly use node_root node
            this.node_root.active = true;
        }
    }

   ```

3. **Extend functionality**:
   - Add custom methods to the generated script
   - Handle user interaction events
   - Implement business logic

## 4. Node Naming Conventions

To ensure the plugin can correctly identify and process nodes, node names need to follow the following conventions:

### 4.1 Core Component Naming

| Component Type | Node Naming Prefix | Example |
|---------|-------------|------|
| Node | `node_` | `node_container` |
| Sprite | `spr_` or `Spr_` | `spr_background` |
| Button | `btn_` or `Btn_` | `btn_login` |
| Label | `lab_` | `lab_title` |
| EditBox | `editBox_` | `editBox_username` |
| ProgressBar | `progressBar_` | `progressBar_loading` |
| Animation | `anim_` | `anim_idle` |
| ScrollView | `scrollView_` | `scrollView_list` |
| Layout | `layout_` | `layout_grid` |
| RichText | `richText_` | `richText_content` |

### 4.2 Other Component Naming

| Component Type | Node Naming Prefix | Example |
|---------|-------------|------|
| Toggle | `toggle_` | `toggle_music` |
| Slider | `slider_` | `slider_volume` |
| PageView | `pageView_` | `pageView_gallery` |
| Mask | `mask_` | `mask_effect` |
| Particle System | `particle_` | `particle_explosion` |
| Audio Source | `audio_` | `audio_bg` |
| Camera | `camera_` | `camera_main` |

## 5. Common Issues

### 5.1 Generated Scripts Don't Include All Nodes

**Reason**: The plugin only generates nodes whose names match the component type.
**Solution**: Ensure node names follow the naming conventions, for example, `Label` type nodes should include the `lab_` prefix.

### 5.2 Incorrect Generated Script Path

**Reason**: The plugin creates a `Scripts` folder at the same level as the prefab.
**Solution**: Ensure the prefab's directory has write permissions.

### 5.3 Plugin Doesn't Trigger Auto-generation

**Reason**: The plugin may not be properly enabled, the save event may not be triggered, or no nodes follow the naming conventions.
**Solution**: Check if the plugin is enabled, try manually saving the prefab, and ensure node names follow the naming conventions.

### 5.4 Syntax Errors in Generated Scripts

**Reason**: Node names may contain special characters or not comply with TypeScript variable naming conventions.
**Solution**: Modify node names to ensure they comply with TypeScript variable naming conventions.

## 6. Best Practices

1. **Standardize naming**: Strictly follow naming conventions for node naming
2. **Organize logically**: Organize related nodes under the same parent node
3. **Moderate extension**: Add necessary business logic based on generated scripts
4. **Regular updates**: Regenerate scripts when the prefab structure changes
5. **Version control**: Include generated scripts in version control for easy change tracking

By using the auto_script_builder plugin, you can quickly generate standardized script code, reduce repetitive work, and focus more on the development of core game logic.# Project Title

An blank extension.

## Install

```bash
# Install dependent modules
npm install
# build
npm run build
```
