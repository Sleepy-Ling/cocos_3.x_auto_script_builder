# auto_script_builder 使用文档

## 1. 安装方法

### 1.1 构建插件

1. **克隆项目**：
   ```bash
   git clone https://github.com/Sleepy-Ling/cocos_3.x_auto_script_builder.git
   ```

2. **安装依赖**：
   ```bash
   cd auto_script_builder
   npm install
   ```

3. **构建插件**：
   ```bash
   npm run build
   ```
   构建完成后，插件会生成在 `dist` 目录中。

### 1.2 在 Cocos Creator 中安装

1. 打开 Cocos Creator 编辑器
2. 点击顶部菜单栏 **扩展** → **扩展管理器**
3. 点击 **导入插件** 按钮
4. 选择构建后的 `dist` 目录
5. 等待插件安装完成，然后启用插件

## 2. 如何使用插件

### 2.1 自动生成脚本

1. **创建或选择预制体**：在 Cocos Creator 中创建或选择一个预制体文件
2. **保存预制体**：当保存预制体时，插件会自动触发脚本生成
3. **查看生成的脚本**：在预制体同级目录的 `Scripts` 文件夹中，会生成 `Auto_预制体名称.ts` 文件

预制体名称目前仅支持命名后缀为GameView,View,SAView和Item的预制体 例如：
- `MainGameView.prefab` 会生成 `Auto_MainGameView.ts`
- `SettingView.prefab` 会生成 `Auto_SettingView.ts`
- `SettingSAView.prefab` 会生成 `Auto_SettingSAView.ts`
- `ScoreItem.prefab` 会生成 `Auto_ScoreItem.ts`
- `Item_HP.prefab` 会生成 `Auto_Item_HP.ts`
 
### 2.2 手动生成脚本

1. 点击顶部菜单栏 **扩展** → **auto_script_builder** → **显示日志**
2. 在弹出的面板中，选择需要生成脚本的预制体文件
3. 点击 **生成脚本** 按钮

## 3. 生成后如何使用

### 3.1 脚本结构说明

生成的脚本文件包含以下部分：

1. **导入语句**：自动导入所需的 Cocos Creator 组件
2. **类定义**：以预制体名称命名的类
3. **成员变量**：对应预制体中的节点和组件
4. **firstInitView 方法**：模板中首次初始化函数，会自动生成节点查找代码
5. **其他生命周期方法**：根据模板包含的方法

### 3.2 示例脚本

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

### 3.3 使用生成的脚本
1. **创建预制体组件**：在 Cocos Creator 中创建一个对应预制体名字的ts文件
2. **继承基类**：根据预制体类型，选择继承 `Auto_XXXGameView`,`Auto_XXXView` 或 `Auto_XXXItem` 等基类

3. **添加该脚本到预制体**：
   - 选中预制体节点
   - 在属性检查器中点击 **添加组件** → **脚本** → **预制体名称**

3. **访问组件**：
   ```typescript
   import { Auto_ShopView } from './Auto_ShopView'
   
    @ccclass('ShopView')// 获取组件实例
    export class ShopView extends Auto_ShopView<ViewParamBase> {
        public firstInitView(param?: ViewParamBase): Promise<boolean> {
            let p = super.firstInitView(param);
            //直接使用btn_close按钮
            this.bindBtnClickEvent(this.btn_close, "closeSelf");
            return p;
        }

        public onViewOpen(param: ViewParamBase): void {
            super.onViewOpen(param);

            //直接使用node_root节点
            this.node_root.active = true;
        }
    }

   ```

3. **扩展功能**：
   - 在生成的脚本中添加自定义方法
   - 处理用户交互事件
   - 实现业务逻辑

## 4. 节点命名规范

为了确保插件能够正确识别和处理节点，节点名称需要遵循以下规范：

### 4.1 核心组件命名

| 组件类型 | 节点命名前缀 | 示例 |
|---------|-------------|------|
| 节点 | `node_` | `node_container` |
| 精灵 | `spr_` 或 `Spr_` | `spr_background` |
| 按钮 | `btn_` 或 `Btn_` | `btn_login` |
| 标签 | `lab_` | `lab_title` |
| 输入框 | `editBox_` | `editBox_username` |
| 进度条 | `progressBar_` | `progressBar_loading` |
| 动画 | `anim_` | `anim_idle` |
| 滚动视图 | `scrollView_` | `scrollView_list` |
| 布局 | `layout_` | `layout_grid` |
| 富文本 | `richText_` | `richText_content` |

### 4.2 其他组件命名

| 组件类型 | 节点命名前缀 | 示例 |
|---------|-------------|------|
| 开关 | `toggle_` | `toggle_music` |
| 滑块 | `slider_` | `slider_volume` |
| 页面视图 | `pageView_` | `pageView_gallery` |
| 遮罩 | `mask_` | `mask_effect` |
| 粒子系统 | `particle_` | `particle_explosion` |
| 音频源 | `audio_` | `audio_bg` |
| 相机 | `camera_` | `camera_main` |

## 5. 常见问题

### 5.1 生成的脚本没有包含所有节点

**原因**：插件只会生成名称与组件类型匹配的节点。
**解决方法**：确保节点名称符合命名规范，例如 `Label` 类型的节点名称应包含 `lab_` 前缀。

### 5.2 生成的脚本路径不正确

**原因**：插件会在预制体同级目录创建 `Scripts` 文件夹。
**解决方法**：确保预制体所在目录有写入权限。

### 5.3 插件不触发自动生成

**原因**：可能是插件未正确启用或保存事件未触发，或者没有一个节点符合命名规范。
**解决方法**：检查插件是否启用，尝试手动保存预制体，确保节点名称符合命名规范。

### 5.4 生成的脚本有语法错误

**原因**：可能是节点名称包含特殊字符或不符合 TypeScript 变量命名规范。
**解决方法**：修改节点名称，确保符合 TypeScript 变量命名规范。

## 6. 最佳实践

1. **规范命名**：严格按照命名规范为节点命名
2. **合理组织**：将相关节点组织在同一父节点下
3. **适度扩展**：在生成的脚本基础上添加必要的业务逻辑
4. **定期更新**：当预制体结构变化时，重新生成脚本
5. **版本控制**：将生成的脚本纳入版本控制，便于追踪变更

通过使用 auto_script_builder 插件，您可以快速生成标准化的脚本代码，减少重复劳动，让您更专注于游戏核心逻辑的开发。