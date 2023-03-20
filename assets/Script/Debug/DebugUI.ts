import { _decorator, Component, Node, find } from 'cc';
import { ResMgr } from '../Res/ResMgr';
const { ccclass, property } = _decorator;

@ccclass('DebugUI')
export class DebugUI extends Component {

    start() {
        this.GetBundle();
    }

    public GetBundle() {
        // console.log("DebugUI: " + ResMgr.Instance.GetBundle("").name);
        // console.log("DebugUI: " + ResMgr.Instance.GetPrefab("Input/InputCtrl"));

    }
}


