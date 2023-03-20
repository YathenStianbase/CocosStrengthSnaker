import { _decorator, Component, Node, Button, director } from 'cc';
import { GameMgr } from '../../Game/GameMgr';
import { Menu } from './Menu';
const { ccclass, property, type } = _decorator;

@ccclass('MainMenu')
export class MainMenu extends Menu {

    @type(Button)
    public btn_start: Button;

    @type(Button)
    public btn_leave: Button;

    onLoad() {
        // this.btn_start.node.on(Button.EventType.CLICK, this.MainMenuStartBtn, this);
        // this.btn_leave.node.on(Button.EventType.CLICK, this.MainMenuLeaveBtn, this);
    }

    start() {
    }

    update(deltaTime: number) {

    }

    public MainMenuStartBtn() {
        console.log("MainMenuStartBtn was clicked ... ");
        director.loadScene("InGame");

        // 写入存档
        GameMgr.Instance.WriteSave();
    }

    public MainMenuLeaveBtn() {
        director.end();
    }
}


