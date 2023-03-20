import { _decorator, Component, Node, Vec3, Vec2, Prefab, instantiate, input, Input, EventKeyboard, KeyCode, director, Collider2D, Contact2DType, IPhysics2DContact, RigidBody2D } from 'cc';
import { Detector } from './Detector';
import { Food } from './Food';
import { InputMgr } from './Input/InputMgr';
const { ccclass, property, type } = _decorator;

@ccclass('Snaker')
export class Snaker extends Component {

    @type([Node])
    public segments: Node[] = [];

    @type(Prefab)
    public segmentPrefab: Prefab;

    public direction: Vec2 = Vec2.ZERO;
    private input1: Vec2 = Vec2.ZERO;

    @property
    public initialSize: number = 2;

    // public internalTime: number = 0.5;
    public canMove: boolean = true;

    public coinCount: number = 0;

    private collider: Collider2D;

    @property
    public movestep: number = 10;

    start() {
        // console.log("Vec2.NEG_ONE --> " + Vec2.UNIT_X);

        // console.log(this.getComponent(Detector).PosIsWall(new Vec2(-2.5, 0)));

        // console.log(this.getComponent(Detector).PosIsSeg(new Vec2(2.5, 0)));

        // console.log(this.getComponent(Detector).DetectorWall());

        this.ResetState();

        input.on(Input.EventType.KEY_UP, this.OnKeyUp, this);

        this.collider = this.getComponent(Collider2D);

        this.collider.on(Contact2DType.BEGIN_CONTACT, this.OnBeginContact, this);
    }

    public OnKeyUp(event: EventKeyboard) {
/*
        if (!this.canMove) return;
        switch (event.keyCode) {

            case KeyCode.KEY_W:
                this.input1 = new Vec2(0, 1 * this.movestep);;
                break;
            case KeyCode.KEY_S:
                this.input1 = new Vec2(0, -1 * this.movestep);
                break;
            case KeyCode.KEY_D:
                this.input1 = new Vec2(1 * this.movestep, 0);
                break;
            case KeyCode.KEY_A:
                this.input1 = new Vec2(-1 * this.movestep, 0);
                break;
            default:
                break;
        }
        // console.log(this.input1);
*/
    }


    update(deltaTime: number) {

        if (!this.canMove) return;
        this.input1 = InputMgr.Instance.GetActiveInputCtrl().GetVec2Dir;

        // if (this.input1 != Vec2.ZERO) {
        if (this.input1.x != 0 || this.input1.y != 0) {

            console.log(this.input1);
            this.direction = this.input1;

            this.canMove = false;
            // StartCoroutine(move());
            this.move();
        }
        // this.input1 = Vec2.ZERO;
        InputMgr.Instance.GetActiveInputCtrl().DirReset();
    }

    public move() {
        let detector: Detector = this.node.getComponent(Detector);
        if (
            detector.PosIsWall(this.input1) ||
            detector.PosIsSeg(this.input1)
        ) {
            this.canMove = true;
            return;
        }

        this.moveNormal();

        console.log("snaker head pos -> " + this.node.position);


        // 下落
        this.schedule(this.moveDownLoop, 0.1);

        // 回调
        // this.canMove = true;

    }

    public moveNormal(): void {
        for (let i = this.segments.length - 1; i > 0; i--) {
            this.segments[i].position = this.segments[i - 1].position;
        }

        let x = Math.round(this.node.position.x) + this.direction.x;
        let y = Math.round(this.node.position.y) + this.direction.y;

        this.node.setPosition(new Vec3(x, y, 0));
    }

    private detectOnewall: Boolean = false;
    public moveDownLoop() {
        if (!this.detectOnewall) {
            for (let i = 0; i < this.segments.length; i++) {
                const item = this.segments[i];
                let detector: Detector = item.getComponent(Detector);
                detector.canDetect = true;
                if (!detector.DetectorWall()) {
                    this.detectOnewall = false;
                    detector.canDetect = false;
                    continue;
                }
                else {
                    this.detectOnewall = true;
                    detector.canDetect = false;
                    break;
                }
            }
            // yield return new WaitForSeconds(0.1f);
            if (!this.detectOnewall) {
                for (let i = 0; i < this.segments.length; i++) {
                    const item = this.segments[i];
                    let pos: Vec3 = item.position;
                    pos.add(new Vec3(0, -1 * this.movestep, 0));
                    item.position = pos;
                    console.log(item.position);
                    
                }
            }
        }
        else {
            if (!this.detectOnewall) {
                for (let i = 0; i < this.segments.length; i++) {
                    const item = this.segments[i];
                    let pos: Vec3 = item.position;
                    pos.add(new Vec3(0, -1 * this.movestep, 0));
                    item.position = pos;
                    console.log(item.position);

                }
            }
            this.unschedule(this.moveDownLoop);
            this.canMove = true;
            this.detectOnewall = false;
        }
    }

    public Grow(): void {
        let segment: Node = instantiate(this.segmentPrefab);
        this.segments.push(segment);
        segment.getComponent(RigidBody2D).enabled = false;
        segment.position = this.segments[this.segments.length - 2].position;
        this.scheduleOnce(() => {
            segment.getComponent(RigidBody2D).enabled = true;
        }, 0);
        // segment.position = new Vec3(99,99,99);
        director.getScene().getChildByName("Canvas").addChild(segment);
    }

    public GrowBegin() {
        let segment: Node = instantiate(this.segmentPrefab);
        director.getScene().getChildByName("Canvas").addChild(segment);

        console.log(this.segments[this.segments.length - 1]);

        segment.position = this.segments[this.segments.length - 1].position;
        let x = segment.position.x + 1 * this.movestep;
        let y = segment.position.y;
        let pos: Vec2 = new Vec2(Math.ceil(x), y);
        segment.position.set(new Vec3(pos.x, pos.y, 0));
        this.segments.push(segment);
    }

    public ResetState(): void {
        this.direction = Vec2.UNIT_X;
        // this.node.position = Vec3.ZERO;

        for (let i = 1; i < this.segments.length; i++) {
            this.segments[i].destroy();
        }

        this.segments.length = 1;
        // this.segments = [];
        // this.segments.push(this.node);

        for (let i = 0; i < this.initialSize - 1; i++) {
            this.GrowBegin();
        }

    }

    public OnBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.tag == 2) {
            console.log("Snaker eat one food and grow ... now body length is " + this.segments.length);
            // otherCollider.getComponent(Food).recall();
            this.Grow();
        }
    }
}


