import { _decorator, Component, Node, input, Input, EventKeyboard, KeyCode, Vec2 } from 'cc';
import { Menu } from './Menu';
import { MenuController } from './MenuController';
const { ccclass, property } = _decorator;

@ccclass('LevelStageMenu')
export class LevelStageMenu extends Menu {


    start() {
        input.on(Input.EventType.KEY_UP, this.OnKeyUp, this);
    }

    update(deltaTime: number) {
        super.update(deltaTime);
        // if (STBInput.GetButtonDown("Cancel")) {
        //     SoundManager.instance.PlayUiEfx(UiEfx.CANCEL);
        //     MenuController.instance.BackToMainMenu(true);
        // }
    }

    // public IsCurrentActive(): boolean {
    //     return this.IsActivated && this.menuController.curMenu == this;
    // }

    public OnKeyUp(event: EventKeyboard) {
        if (!this.IsCurrentActive) return;
        switch (event.keyCode) {
            case KeyCode.ESCAPE:
                this.menuController.BackToMainMenu(true);
                break;
            default:
                break;
        }
    }
}


