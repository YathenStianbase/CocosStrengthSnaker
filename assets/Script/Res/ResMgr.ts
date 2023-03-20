import { _decorator, Component, Node, assetManager, AssetLibrary, AssetManager, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ResMgr')
export class ResMgr extends Component {

    public static Instance: ResMgr;

    prefabassetsLoaded: boolean = false;

    private prefabAssetsBundle: AssetManager.Bundle;

    start() {
        if (ResMgr.Instance == null) {
            ResMgr.Instance = this;
        }
        else {
            this.node.destroy();
        }
        this.init();
    }

    init() {
        console.log(this.name + " init ... ");

        // 加载prefab bundle
        assetManager.loadBundle("PrefabAssets", () => {
            console.log("PrefabAssets was loaded.");
            this.prefabassetsLoaded = true;
            this.prefabAssetsBundle = assetManager.getBundle("PrefabAssets");
        });

        // assetManager.preloadAny("PrefabAssets", () => {
        //     console.log("PrefabAssets was loaded.");
        // });

    }

    public GetBundle(bundleName: string): AssetManager.Bundle {
        return this.prefabAssetsBundle;
    }


    public GetPrefab(prefabName: string): Prefab {
        if (!this.prefabassetsLoaded) return;
        let pfb: Prefab;
        // this.prefabAssetsBundle.load(prefabName, Prefab, (err, prefab) => {
        this.GetBundle("").load(prefabName, Prefab, (err, prefab) => {
            console.log(prefab.name + " was loaded.");
            pfb = prefab;
        });
        return pfb;
    }

}


