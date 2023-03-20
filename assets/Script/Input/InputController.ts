import { _decorator, Component, Node, Vec3, EventKeyboard, KeyCode, Vec2, input, Input } from 'cc';
const { ccclass, property, type } = _decorator;

@ccclass('InputController')
export class InputController extends Component {

    public IsInputActive = true;
    onLoad() {
        input.on(Input.EventType.KEY_UP, this.OnKeyUp, this);
    }

    start() {

    }

    update(deltaTime: number) {
    }

    public OnKeyUp(event: EventKeyboard) {
        if (!this.IsInputActive) return;
    }

}


