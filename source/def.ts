/**普通界面 */
export const TemplateViewFile: string = "template_view.txt"
/**2d 游戏基础界面 */
export const TemplateGameViewFile: string = "template_GameView.txt"
/**带有切换动画的界面 */
export const TemplateSwitchAnimViewFile: string = "template_SwitchAnimView.txt"
/**普通item */
export const TemplateItemFile: string = "template_item.txt"
/*---------------读取用------------------*/
export const PrefabComp: string = "cc.Prefab";
export const SpriteComp: string = "cc.Sprite";
export const ButtonComp: string = "cc.Button";
export const NodeComp: string = "cc.Node";
export const LabelComp: string = "cc.Label";
export const EditBoxComp: string = "cc.EditBox";
export const ProgressBarComp: string = "cc.ProgressBar";
export const AnimationComp: string = "cc.Animation";
export const ScrollViewComp: string = "cc.ScrollView";
export const LayoutComp: string = "cc.Layout";
export const RichTextComp: string = "cc.RichText";
export const ToggleComp: string = "cc.Toggle";
export const ToggleContainerComp: string = "cc.ToggleContainer";
export const SliderComp: string = "cc.Slider";
export const ScrollBarComp: string = "cc.ScrollBar";
export const PageViewComp: string = "cc.PageView";
export const PageViewIndicatorComp: string = "cc.PageViewIndicator";
export const ListViewComp: string = "cc.ListView";
export const MaskComp: string = "cc.Mask";
export const ParticleSystemComp: string = "cc.ParticleSystem";
export const LabelOutlineComp: string = "cc.LabelOutline";
export const LabelShadowComp: string = "cc.LabelShadow";
export const AudioSourceComp: string = "cc.AudioSource";
export const VideoPlayerComp: string = "cc.VideoPlayer";
export const WebViewComp: string = "cc.WebView";
export const CameraComp: string = "cc.Camera";
export const Collider2DComp: string = "cc.Collider2D";
export const RigidBody2DComp: string = "cc.RigidBody2D";
export const PhysicsCircleColliderComp: string = "cc.PhysicsCircleCollider";
export const PhysicsBoxColliderComp: string = "cc.PhysicsBoxCollider";
export const PhysicsPolygonColliderComp: string = "cc.PhysicsPolygonCollider";

/**节点名映射 */
export const nodeNameMap: Record<string, Array<string>> = {
    [NodeComp]: ["node_"],
    [SpriteComp]: ["spr_", "Spr_"],
    [ButtonComp]: ["btn_", "Btn_"],
    [LabelComp]: ["lab_"],
    [EditBoxComp]: ["editBox_"],
    [ProgressBarComp]: ["progressBar_"],
    [AnimationComp]: ["anim_"],
    [ScrollViewComp]: ["scrollView_"],
    [LayoutComp]: ["layout_"],
    [RichTextComp]: ["richText_"],
    [ToggleComp]: ["toggle_"],
    [ToggleContainerComp]: ["toggleContainer_"],
    [SliderComp]: ["slider_"],
    [ScrollBarComp]: ["scrollBar_"],
    [PageViewComp]: ["pageView_"],
    [PageViewIndicatorComp]: ["pageViewIndicator_"],
    [ListViewComp]: ["listView_"],
    [MaskComp]: ["mask_"],
    [ParticleSystemComp]: ["particle_"],
    [LabelOutlineComp]: ["labelOutline_"],
    [LabelShadowComp]: ["labelShadow_"],
    [AudioSourceComp]: ["audio_"],
    [VideoPlayerComp]: ["video_"],
    [WebViewComp]: ["webView_"],
    [CameraComp]: ["camera_"],
    [Collider2DComp]: ["collider_"],
    [RigidBody2DComp]: ["rigidBody_"],
    [PhysicsCircleColliderComp]: ["circleCollider_"],
    [PhysicsBoxColliderComp]: ["boxCollider_"],
    [PhysicsPolygonColliderComp]: ["polygonCollider_"],
}

/*---------------写入用------------------*/
export const SpriteCompType: string = "Sprite";
export const ButtonCompType: string = "Button";
export const NodeCompType: string = "Node";
export const LabelCompType: string = "Label";
export const EditBoxCompType: string = "EditBox";
export const ProgressBarCompType: string = "ProgressBar";
export const AnimationCompType: string = "Animation";
export const ScrollViewCompType: string = "ScrollView";
export const LayoutCompType: string = "Layout";
export const RichTextCompType: string = "RichText";
export const ToggleCompType: string = "Toggle";
export const ToggleContainerCompType: string = "ToggleContainer";
export const SliderCompType: string = "Slider";
export const ScrollBarCompType: string = "ScrollBar";
export const PageViewCompType: string = "PageView";
export const PageViewIndicatorCompType: string = "PageViewIndicator";
export const ListViewCompType: string = "ListView";
export const MaskCompType: string = "Mask";
export const ParticleSystemCompType: string = "ParticleSystem";
export const LabelOutlineCompType: string = "LabelOutline";
export const LabelShadowCompType: string = "LabelShadow";
export const AudioSourceCompType: string = "AudioSource";
export const VideoPlayerCompType: string = "VideoPlayer";
export const WebViewCompType: string = "WebView";
export const CameraCompType: string = "Camera";
export const Collider2DCompType: string = "Collider2D";
export const RigidBody2DCompType: string = "RigidBody2D";
export const PhysicsCircleColliderCompType: string = "PhysicsCircleCollider";
export const PhysicsBoxColliderCompType: string = "PhysicsBoxCollider";
export const PhysicsPolygonColliderCompType: string = "PhysicsPolygonCollider";

export const PropertyTemplate: string = "{1}: {2};"

export const propertyFindCompTemplate: string = "this.{name} = UICompUtil.findNodeComp({str_name}, {type}, this.node);"
export const propertyFindNodeTemplate: string = "this.{name} = UICompUtil.findNode({str_name}, this.node);"
export const regExp_name = new RegExp(/{name}/g);
export const regExp_str_name = new RegExp(/{str_name}/g);
export const regExp_type = new RegExp(/{type}/g);


/**组件名映射 */
export const compNameMap: Record<string, string> = {
    [SpriteComp]: SpriteCompType,
    [ButtonComp]: ButtonCompType,
    [NodeComp]: NodeCompType,
    [LabelComp]: LabelCompType,
    [EditBoxComp]: EditBoxCompType,
    [ProgressBarComp]: ProgressBarCompType,
    [AnimationComp]: AnimationCompType,
    [ScrollViewComp]: ScrollViewCompType,
    [LayoutComp]: LayoutCompType,
    [RichTextComp]: RichTextCompType,
    [ToggleComp]: ToggleCompType,
    [ToggleContainerComp]: ToggleContainerCompType,
    [SliderComp]: SliderCompType,
    [ScrollBarComp]: ScrollBarCompType,
    [PageViewComp]: PageViewCompType,
    [PageViewIndicatorComp]: PageViewIndicatorCompType,
    [ListViewComp]: ListViewCompType,
    [MaskComp]: MaskCompType,
    [ParticleSystemComp]: ParticleSystemCompType,
    [LabelOutlineComp]: LabelOutlineCompType,
    [LabelShadowComp]: LabelShadowCompType,
    [AudioSourceComp]: AudioSourceCompType,
    [VideoPlayerComp]: VideoPlayerCompType,
    [WebViewComp]: WebViewCompType,
    [CameraComp]: CameraCompType,
    [Collider2DComp]: Collider2DCompType,
    [RigidBody2DComp]: RigidBody2DCompType,
    [PhysicsCircleColliderComp]: PhysicsCircleColliderCompType,
    [PhysicsBoxColliderComp]: PhysicsBoxColliderCompType,
    [PhysicsPolygonColliderComp]: PhysicsPolygonColliderCompType,
}

/**是否为目标组件 */
export function isTargetCompName(compName: string) {
    for (const key in nodeNameMap) {
        if (Object.prototype.hasOwnProperty.call(nodeNameMap, key)) {
            if (key == compName) {
                return true;
            }

        }
    }

    return false;
}
/**
 * 判断节点的命名是否满足规则
 * @param nodeName 节点命名
 * @param type 类型
 * @returns 
 */
export function isNodeNameMatch(nodeName: string, type: string) {
    let arr_name = nodeNameMap[type];
    if (arr_name) {
        for (const name of arr_name) {
            if (nodeName.startsWith(name)) {
                return true;
            }
        }
    }

    return false;
}

/**获取对应组件名 */
export function getCompName(compName: string) {
    console.log("getCompName", compName, compNameMap[compName]);

    return compNameMap[compName];
}

export function convertProperty(comp: string, nodeName: string) {
    let exp = new RegExp(/{(\w+)}/g);
    let matchResult = PropertyTemplate.match(exp);
    if (!matchResult) {
        return;
    }

    let param: string[] = [nodeName, comp];
    let str = String(PropertyTemplate);
    for (let i = 0; i < matchResult.length; i++) {
        const element = matchResult[i];
        str = str.replace(element, param[i]);
    }

    return str;
}

/**获取写入查找内容 */
export function getWriteFindContent(nodeName: string, comp: string) {
    console.log("getFindContent", nodeName, comp);

    let str: string;
    if (comp == NodeCompType) {
        str = String(propertyFindNodeTemplate);
    }
    else {
        str = String(propertyFindCompTemplate);
    }

    str = String(str);
    str = str.replace(regExp_name, nodeName);
    str = str.replace(regExp_str_name, `"${nodeName}"`);
    str = str.replace(regExp_type, comp);

    return str;
}
