import { _decorator, Component, Node, assetManager, Prefab, AssetManager, instantiate, director } from 'cc';
import { ResMgr } from '../Res/ResMgr';
import { InputController } from './InputController';
import { SnakerInputController } from './SnakerInputController';
const { ccclass, property } = _decorator;

@ccclass('InputMgr')
export class InputMgr extends Component {

    public static Instance: InputMgr;

    // private inputctrls: InputController[] = [];
    private inputctrls: SnakerInputController[] = [];

    private prefabAssetsBundle: AssetManager.Bundle;

    start() {
        if (InputMgr.Instance == null) {
            InputMgr.Instance = this;
        }
        else {
            this.node.destroy();
        }

        // this.init();
    }

    public init() {
        console.log(this.name + " init ... ");

        // // 加载bundle
        // assetManager.loadBundle("PrefabAssets", () => {
        //     console.log("PrefabAssets was loaded.");
        // });

        // setTimeout(() => {
        //     this.prefabAssetsBundle = assetManager.getBundle("PrefabAssets");
        //     this.prefabAssetsBundle.load("Input/InputCtrl", Prefab, (err, prefab) => {
        //         console.log(prefab.name + " was loaded.");
        //     });
        // }, 2000);

        // setTimeout(() => {

        //     let inputPrefab = ResMgr.Instance.GetPrefab("Input/SnakerInputCtrl");
        //     let prefabNode;

        //     console.log(inputPrefab);

        //     if (inputPrefab != null && inputPrefab != undefined) {
        //         prefabNode = instantiate(inputPrefab);
        //         this.inputctrls.push(prefabNode.getComponent(SnakerInputController));
        //         this.node.addChild(this.inputctrls[0].node);
        //     }
        // }, 500);

        //
        let snakerInputCtrlNode: Node = new Node();
        let snakerInputCtrl: SnakerInputController = snakerInputCtrlNode.addComponent(SnakerInputController);
        this.inputctrls.push(snakerInputCtrl);
        this.node.addChild(snakerInputCtrlNode);

        // setTimeout(() => {
        //     let prefab = this.prefabAssetsBundle.get("Input/InputCtrl", Prefab);
        //     let prefabNode = instantiate(prefab);
        //     this.inputctrls.push(prefabNode.getComponent(InputController));

        //     // console.log(this.inputctrls.length);

        //     this.node.addChild(this.inputctrls[0].node);

        // }, 4000);

    }

    // 默认使用第一顺位的inputctrl
    public ActiveDefaultInputCtrl() {

        this.inputctrls.forEach(inputctrl => {
            inputctrl.node.active = false;
        });

        this.inputctrls[0].node.active = true;
    }

    public GetActiveInputCtrl() {
        return this.inputctrls[0];
    }

    update(deltaTime: number) {

    }
}


