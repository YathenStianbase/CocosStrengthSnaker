import { _decorator, Component, Node, Prefab } from 'cc';
import { ResMgr } from '../Res/ResMgr';
const { ccclass, property } = _decorator;

@ccclass('LevelCtrl')
export class LevelCtrl extends Component {

    private readonly SNAKERNAME = "Snaker/Snake";

    snakerPrefab: Prefab;

    start() {
        this.init();
    }

    public init() {
        this.snakerPrefab = ResMgr.Instance.GetPrefab(this.SNAKERNAME);
    }

    update(deltaTime: number) {
        console.log(this.snakerPrefab);
        
    }
}


