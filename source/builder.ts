import * as fs from 'fs';
import { PrefabComp, NodeComp, isNodeNameMatch, getCompName, isTargetCompName, convertProperty, getWriteFindContent } from './def'
import path from 'path';
interface ITypeData {
    __type__: string;
    _name: string;
    _parent?: { __id__: number }
    _children?: [{ __id__: number }]
    node?: { __id__: number }
}

interface INodeInf {
    src: ITypeData;
    child: Array<number>;
    comp?: string;
    id: number;
}



async function readFile(filePath: string, encoding: BufferEncoding = "utf-8") {
    let promise = new Promise<string>((resolve) => {
        fs.readFile(filePath, { encoding: encoding }, (err: NodeJS.ErrnoException | null, data: string) => {
            if (err) {
                console.error("readFile error", err);
            }

            resolve(data.toString());
        });

    })
    return promise;
}

async function writeFile(filePath: string, content: string, encoding: BufferEncoding = "utf-8") {
    let dirPath = path.dirname(filePath);
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
    }

    let promise = new Promise<boolean>((resolve) => {
        fs.writeFile(filePath, content, { encoding: encoding }, (err: NodeJS.ErrnoException | null) => {
            if (err) {
                console.error("writeFile error", err);
            }

            resolve(true);
        });
    })
    return promise;
}

function initNodeTree(prefabName: string, data: Array<ITypeData>) {
    let result: Record<string, INodeInf> = {}
    let root = data.find((v) => {
        return v.__type__ == PrefabComp && v._name == prefabName;
    })

    let root_id: number;
    root_id = root["data"]["__id__"];

    const getParentEmptyChildID: Function = (parent: INodeInf) => {
        return parent.child.find((v) => {
            if (result[v] == null) {
                return v;
            }
        })
    }

    for (let i = 0; i < data.length; i++) {
        const element = data[i];

        if (element.__type__ == NodeComp) {
            console.log(i, element._children);

            let curNode: INodeInf;
            if (element._parent) {
                let parentNode = result[element._parent.__id__];
                if (!parentNode) {
                    continue;
                }
                //根据父节点，new 一个没有初始化过的子节点
                let childID = getParentEmptyChildID(parentNode);
                curNode = result[childID] = {
                    src: element,
                    child: [],
                    id: childID,
                };
            }
            else if (element._name == prefabName) {
                curNode = result[root_id] = {
                    src: element,
                    child: [],
                    id: root_id,
                };
            }

            if (curNode && element._children) {
                curNode.child = element._children.map((v) => { return v.__id__ });
            }
        }

    }

    //寻找对应组件（拿对应节点名去匹配组件）
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let node: INodeInf;
        if (element.node) {
            node = result[element.node.__id__];
        }
        else if (element.__type__ == NodeComp) {
            // node.comp = element.__type__;

            for (const key in result) {
                if (Object.prototype.hasOwnProperty.call(result, key)) {
                    const tmp = result[key];
                    if (tmp.src == element) {
                        node = tmp;
                        break;
                    }

                }
            }

        }

        if (node && isTargetCompName(element.__type__) && node.src._name && isNodeNameMatch(node.src._name, element.__type__)) {
            node.comp = element.__type__;
        }

    }
    return result;
}


export async function startBuildView(filePath: string) {
    console.log("==================start build ====================");
    console.log("filePath", filePath);
    let promise = new Promise<boolean>(async (resolve) => {
        let templateFilePath = path.join(__dirname, "config/template_view.txt");
        let templateData = await readFile(templateFilePath);
        // console.log("templateData", templateData);

        let fileData = await readFile(filePath);
        let array = JSON.parse(fileData) as Array<ITypeData>;

        let fileName: string = path.basename(filePath);
        let fileNameExp = new RegExp(/(.+)\.([^.]+)$/);
        let fileNameWithoutExt = fileName.match(fileNameExp)[1];
        // console.log("fileWithoutExt", fileNameWithoutExt);

        let nodeTree = initNodeTree(fileNameWithoutExt, array);

        //改类名
        templateData = templateData.replace("$1$", fileNameWithoutExt);
        // console.log("templateData", templateData);
        //增加成员变量
        let propertyContent: string = "";
        //寻找节点内容
        let propertyFindContent: string = "";
        //需要导入的引擎组件
        let importType: string[] = [];
        for (const key in nodeTree) {
            if (Object.prototype.hasOwnProperty.call(nodeTree, key)) {
                const element = nodeTree[key];
                const scrType = element.src.__type__;
                const compName = element.comp || scrType;
                const name = element.src._name;
                // console.log(key, element);

                if (!name) {//防止命名为空
                    continue;
                }

                if (isNodeNameMatch(name, compName)) {
                    const comp = getCompName(compName);
                    // console.log("name", name, "type", type, "comp", comp);
                    let str = convertProperty(comp, name);
                    // console.log("str", str);
                    propertyContent += '\t' + str + '\n';

                    if (!importType.includes(comp)) {
                        importType.push(comp);
                    }

                    str = getWriteFindContent(name, comp);
                    propertyFindContent += '\t\t' + str + '\n';
                }

            }
        }
        //写入节点属性
        console.log("propertyContent", propertyContent);
        templateData = templateData.replace("$2$", propertyContent);
        console.log("templateData ============>", templateData);

        //写入 import 
        let importContent: string = importType.join(', ');
        templateData = templateData.replace("$3$", importContent);
        console.log("templateData ============>", templateData);

        //写入查找节点
        console.log("propertyFindContent", propertyFindContent);
        templateData = templateData.replace("$4$", propertyFindContent);
        console.log("templateData ============>", templateData);

        let writeFilePath: string = filePath;
        console.log("writeFilePath", writeFilePath);
        let splitPathList = writeFilePath.split(path.sep);

        let newFile = "Auto_" + fileNameWithoutExt + ".ts"
        splitPathList[splitPathList.length - 1] = newFile;

        splitPathList.splice(splitPathList.length - 2, 0, "Scripts");
        writeFilePath = splitPathList.join(path.sep);
        console.log("splitPathList", splitPathList.join(path.sep));
        console.log("writeFilePath", writeFilePath);

        writeFile(writeFilePath, templateData);
    })

    return promise;
}

export async function startBuild(filePath: string, templateFileName: string) {
    console.log("==================start build ====================");
    console.log("filePath", filePath);
    let promise = new Promise<boolean>(async (resolve) => {
        let templateFilePath = path.join(__dirname, "config", templateFileName);
        let templateData = await readFile(templateFilePath);
        // console.log("templateData", templateData);

        let fileData = await readFile(filePath);
        let array = JSON.parse(fileData) as Array<ITypeData>;

        let fileName: string = path.basename(filePath);
        let fileNameExp = new RegExp(/(.+)\.([^.]+)$/);
        let fileNameWithoutExt = fileName.match(fileNameExp)[1];
        // console.log("fileWithoutExt", fileNameWithoutExt);

        let nodeTree = initNodeTree(fileNameWithoutExt, array);

        //改类名
        templateData = templateData.replace("$1$", fileNameWithoutExt);
        // console.log("templateData", templateData);
        //增加成员变量
        let propertyContent: string = "";
        //寻找节点内容
        let propertyFindContent: string = "";
        //需要导入的引擎组件
        let importType: string[] = [];
        for (const key in nodeTree) {
            if (Object.prototype.hasOwnProperty.call(nodeTree, key)) {
                const element = nodeTree[key];
                const scrType = element.src.__type__;
                const compName = element.comp || scrType;
                const name = element.src._name;
                // console.log(key, element);

                if (!name) {//防止命名为空
                    continue;
                }

                if (isNodeNameMatch(name, compName)) {
                    const comp = getCompName(compName);
                    // console.log("name", name, "type", type, "comp", comp);
                    let str = convertProperty(comp, name);
                    // console.log("str", str);
                    propertyContent += '\t' + str + '\n';

                    if (!importType.includes(comp)) {
                        importType.push(comp);
                    }

                    str = getWriteFindContent(name, comp);
                    propertyFindContent += '\t\t' + str + '\n';
                }

            }
        }
        //写入节点属性
        console.log("propertyContent", propertyContent);
        templateData = templateData.replace("$2$", propertyContent);
        console.log("templateData ============>", templateData);

        //写入 import 
        let importContent: string = importType.join(', ');
        templateData = templateData.replace("$3$", importContent);
        console.log("templateData ============>", templateData);

        //写入查找节点
        console.log("propertyFindContent", propertyFindContent);
        templateData = templateData.replace("$4$", propertyFindContent);
        console.log("templateData ============>", templateData);

        let writeFilePath: string = filePath;
        console.log("writeFilePath", writeFilePath);
        let splitPathList = writeFilePath.split(path.sep);

        let newFile = "Auto_" + fileNameWithoutExt + ".ts"
        splitPathList[splitPathList.length - 1] = newFile;

        splitPathList.splice(splitPathList.length - 2, 0, "Scripts");
        writeFilePath = splitPathList.join(path.sep);
        console.log("splitPathList", splitPathList.join(path.sep));
        console.log("writeFilePath", writeFilePath);

        writeFile(writeFilePath, templateData);
    })

    return promise;
}
