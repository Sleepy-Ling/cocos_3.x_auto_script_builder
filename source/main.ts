import path from "path";
import { startBuild, startBuildView } from "./builder";
import { TemplateSwitchAnimViewFile, TemplateGameViewFile, TemplateItemFile, TemplateViewFile } from "./def";
 

/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
export const methods: { [key: string]: (...any: any) => any } = {
    /**
     * @en A method that can be triggered by message
     * @zh 通过 message 触发的方法
     */
    showLog() {
        console.log('Hello World !!');
    },
    onSaveAsset(url: string, content: any) {
        if (content.type != "cc.Prefab") {
            return;
        }

        let fileName: string = path.basename(content.file);
        let fileNameExp = new RegExp(/(.+)\.([^.]+)$/);
        let fileNameWithoutExt = fileName.match(fileNameExp)[1];


        if (fileNameWithoutExt.endsWith("SAView")) {
            startBuild(content.file, TemplateSwitchAnimViewFile);
        }
        else if (fileNameWithoutExt.endsWith("GameView")) {
            startBuild(content.file, TemplateGameViewFile);
        }
        else if (fileNameWithoutExt.endsWith("View")) {
            startBuild(content.file, TemplateViewFile);
        }
        else if (fileNameWithoutExt.endsWith("Item") || fileNameWithoutExt.startsWith("Item")) {
            startBuild(content.file, TemplateItemFile);
        }

        console.log("url", url, "content", content);
    },
    onOpenScene(assetUuid: string) {
        console.log("ready");
    }
};

/**
 * @en Method Triggered on Extension Startup
 * @zh 扩展启动时触发的方法
 */
export function load() { }

/**
 * @en Method triggered when uninstalling the extension
 * @zh 卸载扩展时触发的方法
 */
export function unload() { }
