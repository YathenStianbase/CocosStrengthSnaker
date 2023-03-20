import { _decorator, Component, Node, EventKeyboard, KeyCode, Vec2 } from 'cc';
import { InputController } from './InputController';
const { ccclass, property } = _decorator;

@ccclass('SnakerInputController')
export class SnakerInputController extends InputController {

    public IsInputActive = true;

    private vec2Dir: Readonly<Vec2> = Vec2.ZERO;
    private set SetVec2Dir(dir: Vec2) {
        this.vec2Dir = dir;
    }
    public get GetVec2Dir(): Vec2 {
        return this.vec2Dir;
    }

    @property
    public canMove: boolean = true;
    @property
    public movestep: number = 10;


    start() {
        super.start();
    }

    update(deltaTime: number) {
        super.update(deltaTime);
    }

    public OnKeyUp(event: EventKeyboard) {
        super.OnKeyUp(event);
        switch (event.keyCode) {

            case KeyCode.KEY_W:
                this.vec2Dir = new Vec2(0, 1 * this.movestep);;
                break;
            case KeyCode.KEY_S:
                this.vec2Dir = new Vec2(0, -1 * this.movestep);
                break;
            case KeyCode.KEY_D:
                this.vec2Dir = new Vec2(1 * this.movestep, 0);
                break;
            case KeyCode.KEY_A:
                this.vec2Dir = new Vec2(-1 * this.movestep, 0);
                break;
            default:
                break;
        }
        // console.log(this.input1);
    }

    public DirReset() {
        this.vec2Dir = new Vec2(0, 0);
    }
}
