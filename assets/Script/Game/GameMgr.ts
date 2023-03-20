import { _decorator, Component, Node, director, sys } from 'cc';
const { ccclass, property } = _decorator;

export enum LEVELSTAGE {
    NEW = 0,
    STAGE1,
    STAGE2,
}

@ccclass('GameMgr')
export class GameMgr extends Component {

    public static Instance: GameMgr;

    // 进度
    processing: number = LEVELSTAGE.NEW;

    start() {
        if (GameMgr.Instance == null) {
            GameMgr.Instance = this;
        }
        else {
            this.node.destroy();
        }
        this.init();

        // // 写入存档
        // this.WriteSave();

        // // 读取进度存档

    }

    public init() {
        if (this.processing == 0) {
            this.scheduleOnce(() => {
                director.loadScene("MainTitle");
            }, 1);
        }
    }

    update(deltaTime: number) {

    }

    public ReadSave() {
        sys.localStorage.setItem('userData', JSON.stringify(LEVELSTAGE[this.processing]));
    }

    public WriteSave() {
        sys.localStorage.setItem('userData', JSON.stringify(LEVELSTAGE[this.processing]));
    }
}


