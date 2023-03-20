import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, BoxCollider } from 'cc';
import { Snaker } from './Snake';
const { ccclass, property } = _decorator;

@ccclass('Food')
export class Food extends Component {

    private collider: Collider2D;

    onLoad() {
        this.collider = this.getComponent(Collider2D);
    }

    start() {

        this.collider.on(Contact2DType.BEGIN_CONTACT, this.OnBeginContact, this);
    }

    public OnBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {

        if (otherCollider.tag == 1) {
            //     otherCollider.getComponent(Snaker).Grow();
            //     console.log("Food was be eat at --> " + this.node.position);
            this.recall();
        }


        // RandomizePosition();
    }

    public recall() {
        console.log("Food was be eat at --> " + this.node.position);
        this.scheduleOnce(this.FuckVanish, 0);

    }

    public FuckVanish() {
        // setTimeout(() => {
        //     this.node.destroy();
        // }, 300);
        this.scheduleOnce(() => {
            this.node.destroy();
        }, 0);
    }

    // public void RandomizePosition()
    // {
    //     Bounds bounds = gridArea.bounds;
    //     // Pick a random position inside the bounds
    //     float x = Random.Range(bounds.min.x, bounds.max.x);
    //     float y = Random.Range(bounds.min.y, bounds.max.y);

    //     // Round the values to ensure it aligns with the grid
    //     // x = Mathf.Round(x);
    //     // y = Mathf.Round(y);
    //     x = (float)System.Math.Round(x, System.MidpointRounding.AwayFromZero);
    //     y = (float)System.Math.Round(y, System.MidpointRounding.AwayFromZero);

    //     // x = SnakerMathLibWrap.MathRound(x);
    //     // y = SnakerMathLibWrap.MathRound(y);

    //     transform.position = new Vector2(x, y);

    //     // 不超过level边界
    //     if (x >= 20 || x <= -20 || y >= 10 || y <= -10)
    //     {
    //         RandomizePosition();
    //         return;
    //     }

    //     RaycastHit2D[] hits = Physics2D.RaycastAll(transform.position, Vector2.down, 0.25f);
    //     foreach (var item in hits)
    //     {
    //         // Debug.Log(item.transform.name);
    //         // Debug.Log(item.transform.gameObject.layer);
    //         if (item.transform.gameObject.layer == 8 || item.transform.gameObject.tag == "Coin")
    //         {
    //             RandomizePosition();
    //             return;
    //         }
    //     }

    //     RaycastHit2D[] snakenodes = Physics2D.RaycastAll(transform.position, Vector2.down, 0.25f);
    //     foreach (var item in snakenodes)
    //     {
    //         // Debug.Log(item.transform.name);
    //         // Debug.Log(item.transform.gameObject.layer);
    //         if (item.transform.gameObject.layer == 10)
    //         {
    //             RandomizePosition();
    //             return;
    //         }
    //     }
    // }

    update(deltaTime: number) {

    }
}


