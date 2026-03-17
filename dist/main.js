"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
const path_1 = __importDefault(require("path"));
const builder_1 = require("./builder");
const def_1 = require("./def");
/**
 * @en Registration method for the main process of Extension
 * @zh 为扩展的主进程的注册方法
 */
exports.methods = {
    /**
     * @en A method that can be triggered by message
     * @zh 通过 message 触发的方法
     */
    showLog() {
        console.log('Hello World !!');
    },
    onSaveAsset(url, content) {
        if (content.type != "cc.Prefab") {
            return;
        }
        let fileName = path_1.default.basename(content.file);
        let fileNameExp = new RegExp(/(.+)\.([^.]+)$/);
        let fileNameWithoutExt = fileName.match(fileNameExp)[1];
        if (fileNameWithoutExt.endsWith("SAView")) {
            (0, builder_1.startBuild)(content.file, def_1.TemplateSwitchAnimViewFile);
        }
        else if (fileNameWithoutExt.endsWith("GameView")) {
            (0, builder_1.startBuild)(content.file, def_1.TemplateGameViewFile);
        }
        else if (fileNameWithoutExt.endsWith("View")) {
            (0, builder_1.startBuild)(content.file, def_1.TemplateViewFile);
        }
        else if (fileNameWithoutExt.endsWith("Item") || fileNameWithoutExt.startsWith("Item")) {
            (0, builder_1.startBuild)(content.file, def_1.TemplateItemFile);
        }
        console.log("url", url, "content", content);
    },
    onOpenScene(assetUuid) {
        console.log("ready");
    }
};
/**
 * @en Method Triggered on Extension Startup
 * @zh 扩展启动时触发的方法
 */
function load() { }
exports.load = load;
/**
 * @en Method triggered when uninstalling the extension
 * @zh 卸载扩展时触发的方法
 */
function unload() { }
exports.unload = unload;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NvdXJjZS9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdEQUF3QjtBQUN4Qix1Q0FBdUQ7QUFDdkQsK0JBQTZHO0FBRzdHOzs7R0FHRztBQUNVLFFBQUEsT0FBTyxHQUE0QztJQUM1RDs7O09BR0c7SUFDSCxPQUFPO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFDRCxXQUFXLENBQUMsR0FBVyxFQUFFLE9BQVk7UUFDakMsSUFBSSxPQUFPLENBQUMsSUFBSSxJQUFJLFdBQVcsRUFBRTtZQUM3QixPQUFPO1NBQ1Y7UUFFRCxJQUFJLFFBQVEsR0FBVyxjQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxJQUFJLFdBQVcsR0FBRyxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQy9DLElBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUd4RCxJQUFJLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUN2QyxJQUFBLG9CQUFVLEVBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxnQ0FBMEIsQ0FBQyxDQUFDO1NBQ3hEO2FBQ0ksSUFBSSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDOUMsSUFBQSxvQkFBVSxFQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsMEJBQW9CLENBQUMsQ0FBQztTQUNsRDthQUNJLElBQUksa0JBQWtCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzFDLElBQUEsb0JBQVUsRUFBQyxPQUFPLENBQUMsSUFBSSxFQUFFLHNCQUFnQixDQUFDLENBQUM7U0FDOUM7YUFDSSxJQUFJLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDbkYsSUFBQSxvQkFBVSxFQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsc0JBQWdCLENBQUMsQ0FBQztTQUM5QztRQUVELE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDaEQsQ0FBQztJQUNELFdBQVcsQ0FBQyxTQUFpQjtRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3pCLENBQUM7Q0FDSixDQUFDO0FBRUY7OztHQUdHO0FBQ0gsU0FBZ0IsSUFBSSxLQUFLLENBQUM7QUFBMUIsb0JBQTBCO0FBRTFCOzs7R0FHRztBQUNILFNBQWdCLE1BQU0sS0FBSyxDQUFDO0FBQTVCLHdCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XHJcbmltcG9ydCB7IHN0YXJ0QnVpbGQsIHN0YXJ0QnVpbGRWaWV3IH0gZnJvbSBcIi4vYnVpbGRlclwiO1xyXG5pbXBvcnQgeyBUZW1wbGF0ZVN3aXRjaEFuaW1WaWV3RmlsZSwgVGVtcGxhdGVHYW1lVmlld0ZpbGUsIFRlbXBsYXRlSXRlbUZpbGUsIFRlbXBsYXRlVmlld0ZpbGUgfSBmcm9tIFwiLi9kZWZcIjtcclxuIFxyXG5cclxuLyoqXHJcbiAqIEBlbiBSZWdpc3RyYXRpb24gbWV0aG9kIGZvciB0aGUgbWFpbiBwcm9jZXNzIG9mIEV4dGVuc2lvblxyXG4gKiBAemgg5Li65omp5bGV55qE5Li76L+b56iL55qE5rOo5YaM5pa55rOVXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgbWV0aG9kczogeyBba2V5OiBzdHJpbmddOiAoLi4uYW55OiBhbnkpID0+IGFueSB9ID0ge1xyXG4gICAgLyoqXHJcbiAgICAgKiBAZW4gQSBtZXRob2QgdGhhdCBjYW4gYmUgdHJpZ2dlcmVkIGJ5IG1lc3NhZ2VcclxuICAgICAqIEB6aCDpgJrov4cgbWVzc2FnZSDop6blj5HnmoTmlrnms5VcclxuICAgICAqL1xyXG4gICAgc2hvd0xvZygpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnSGVsbG8gV29ybGQgISEnKTtcclxuICAgIH0sXHJcbiAgICBvblNhdmVBc3NldCh1cmw6IHN0cmluZywgY29udGVudDogYW55KSB7XHJcbiAgICAgICAgaWYgKGNvbnRlbnQudHlwZSAhPSBcImNjLlByZWZhYlwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBmaWxlTmFtZTogc3RyaW5nID0gcGF0aC5iYXNlbmFtZShjb250ZW50LmZpbGUpO1xyXG4gICAgICAgIGxldCBmaWxlTmFtZUV4cCA9IG5ldyBSZWdFeHAoLyguKylcXC4oW14uXSspJC8pO1xyXG4gICAgICAgIGxldCBmaWxlTmFtZVdpdGhvdXRFeHQgPSBmaWxlTmFtZS5tYXRjaChmaWxlTmFtZUV4cClbMV07XHJcblxyXG5cclxuICAgICAgICBpZiAoZmlsZU5hbWVXaXRob3V0RXh0LmVuZHNXaXRoKFwiU0FWaWV3XCIpKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QnVpbGQoY29udGVudC5maWxlLCBUZW1wbGF0ZVN3aXRjaEFuaW1WaWV3RmlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZpbGVOYW1lV2l0aG91dEV4dC5lbmRzV2l0aChcIkdhbWVWaWV3XCIpKSB7XHJcbiAgICAgICAgICAgIHN0YXJ0QnVpbGQoY29udGVudC5maWxlLCBUZW1wbGF0ZUdhbWVWaWV3RmlsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZpbGVOYW1lV2l0aG91dEV4dC5lbmRzV2l0aChcIlZpZXdcIikpIHtcclxuICAgICAgICAgICAgc3RhcnRCdWlsZChjb250ZW50LmZpbGUsIFRlbXBsYXRlVmlld0ZpbGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChmaWxlTmFtZVdpdGhvdXRFeHQuZW5kc1dpdGgoXCJJdGVtXCIpIHx8IGZpbGVOYW1lV2l0aG91dEV4dC5zdGFydHNXaXRoKFwiSXRlbVwiKSkge1xyXG4gICAgICAgICAgICBzdGFydEJ1aWxkKGNvbnRlbnQuZmlsZSwgVGVtcGxhdGVJdGVtRmlsZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmxvZyhcInVybFwiLCB1cmwsIFwiY29udGVudFwiLCBjb250ZW50KTtcclxuICAgIH0sXHJcbiAgICBvbk9wZW5TY2VuZShhc3NldFV1aWQ6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwicmVhZHlcIik7XHJcbiAgICB9XHJcbn07XHJcblxyXG4vKipcclxuICogQGVuIE1ldGhvZCBUcmlnZ2VyZWQgb24gRXh0ZW5zaW9uIFN0YXJ0dXBcclxuICogQHpoIOaJqeWxleWQr+WKqOaXtuinpuWPkeeahOaWueazlVxyXG4gKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGxvYWQoKSB7IH1cclxuXHJcbi8qKlxyXG4gKiBAZW4gTWV0aG9kIHRyaWdnZXJlZCB3aGVuIHVuaW5zdGFsbGluZyB0aGUgZXh0ZW5zaW9uXHJcbiAqIEB6aCDljbjovb3mianlsZXml7bop6blj5HnmoTmlrnms5VcclxuICovXHJcbmV4cG9ydCBmdW5jdGlvbiB1bmxvYWQoKSB7IH1cclxuIl19