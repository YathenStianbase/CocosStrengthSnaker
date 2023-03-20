import { _decorator, Component, Node } from 'cc';
import { MenuController } from './MenuController';
const { ccclass, property } = _decorator;

@ccclass('Menu')
export class Menu extends Component {

    public IsActivated: boolean = false;

    public menuController: MenuController;

    start() {

    }

    update(deltaTime: number) {
        if (!this.IsCurrentActive()) return;

    }

    public IsCurrentActive(): boolean {
        return this.IsActivated && this.menuController.curMenu == this;
    }

    public SetActive(val: boolean) {
        this.node.active = val;
    }

    public FadeIn(t: number) {
        this.SetActive(true);
        this.IsActivated = true;
    }

    public FadeOut(t: number) {
        this.IsActivated = false;
        this.SetActive(false);
    }
}


