import { _decorator, Component, Node, Prefab, instantiate, director } from 'cc';
import { InputMgr } from '../Input/InputMgr';
const { ccclass, property, type } = _decorator;

@ccclass('Loader')
export class Loader extends Component {


    @type(Prefab)
    public resMgr: Prefab;

    @type(Prefab)
    public inputMgr: Prefab;

    @type(Prefab)
    public gameMgr: Prefab;


    start() {

        if (this.resMgr != null) {
            let resMgrNode = instantiate(this.resMgr);
            director.addPersistRootNode(resMgrNode);
            this.PrintWhenLoaded(resMgrNode);
        }

        if (this.inputMgr != null) {
            let inputMgrNode = instantiate(this.inputMgr);
            director.addPersistRootNode(inputMgrNode);
            this.PrintWhenLoaded(inputMgrNode);
        }

        if (this.gameMgr != null) {
            let gameMgrNode = instantiate(this.gameMgr);
            director.addPersistRootNode(gameMgrNode);
            this.PrintWhenLoaded(gameMgrNode);
        }


        this.scheduleOnce(this.PrintWhenFinishedAllLoaded, 1);
        // this.PrintWhenFinishedAllLoaded();
    }

    update(deltaTime: number) {

    }

    private PrintWhenLoaded(n: Node) {
        let testDate = new Date();
        testDate.getHours(); //获取当前小时数(0-23)
        testDate.getMinutes(); //获取当前分钟数(0-59)
        testDate.getSeconds(); //获取当前秒数(0-59)
        testDate.getMilliseconds(); //获取当前毫秒数(0-999)
        testDate.toLocaleDateString(); //获取当前日期 
        console.log(testDate.toLocaleTimeString() + " : " + n.name + " was add to persistRoot.");
    }

    private PrintWhenFinishedAllLoaded() {
        let testDate = new Date();
        this.schedule(() => {
            this.node.destroy();
        }, 0);
        
        //
        InputMgr.Instance.init();
        
        console.log(testDate.toLocaleTimeString() + " : All root node was add to persistRoot. This loader object will destory in next frame.");
    }
}


