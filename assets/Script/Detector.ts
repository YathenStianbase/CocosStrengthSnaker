import { _decorator, Component, Node, Vec3, Vec2, PhysicsSystem2D, ERaycast2DType } from 'cc';
import { Snaker } from './Snake';
const { ccclass, property } = _decorator;

@ccclass('Detector')
export class Detector extends Component {

    public canDetect: boolean = false;

    // 墙壁检测
    public PosIsWall(direction: Vec2): boolean {
        let begin: Vec3 = this.node.worldPosition;
        let end: Vec3 = new Vec3(direction.x / 2 + begin.x, direction.y / 2 + begin.y, 0);

        const hits = PhysicsSystem2D.instance.raycast(begin, end, ERaycast2DType.All);
        for (let i = 0; i < hits.length; i++) {
            const item = hits[i];
            if (item && item.collider.node != this.node) {
                if (item.collider.node.name.search("Wall") != -1) {
                    return true;
                }
            }
        }
        return false;
    }

    // 自身节点检测
    public PosIsSeg(direction: Vec2): boolean {
        let begin: Vec3 = this.node.worldPosition;
        let end: Vec3 = new Vec3(direction.x / 2 + begin.x, direction.y / 2 + begin.y, 0);

        const hits = PhysicsSystem2D.instance.raycast(begin, end, ERaycast2DType.All);
        for (let index = 0; index < hits.length; index++) {
            const item = hits[index];
            if (item && item.collider.node != this.node) {
                if (item.collider.node.getComponent(Detector)) {
                    return true;
                }
            }
        }
        return false;
    }

    // 下方检测
    public DetectorWall(): boolean {
        let begin: Vec3 = this.node.worldPosition;
        // let end: Vec3 = new Vec3(begin.x, begin.y + -0.5 * this.getComponent(Snaker).movestep, 0);
        let end: Vec3 = new Vec3(begin.x, begin.y + -0.5 * 10, 0);

        const hits = PhysicsSystem2D.instance.raycast(begin, end, ERaycast2DType.All);

        for (let i = 0; i < hits.length; i++) {
            const item = hits[i];
            if (item && item.collider.node != this.node) {
                if (item.collider.node.name.search("Wall") != -1) {
                    return true;
                }
            }
        }
        return false;
    }
}


