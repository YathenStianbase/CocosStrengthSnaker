import { _decorator, Component, Node, Button } from 'cc';
import { LevelStageMenu } from './LevelStageMenu';
import { MainMenu } from './MainMenu';
import { Menu } from './Menu';
const { ccclass, property, type } = _decorator;

@ccclass('MenuController')
export class MenuController extends Component {

    public static instance: MenuController;

    // buttons
    @type(Button)
    public btn_start: Button;

    @type(Button)
    public btn_levelStage: Button;


    @type(MainMenu)
    public mainMenu: MainMenu;

    @type(LevelStageMenu)
    public levelStageMenu: LevelStageMenu;

    // @type(MainMenu)
    // public mainMenu: MainMenu;

    // current
    public curMenu: Menu;

    public get IsActivated(): boolean {
        return this.curMenu != null && this.curMenu.IsCurrentActive();
    }

    start() {
        if (MenuController.instance == null) {
            MenuController.instance = this;
        } else {
            this.node.destroy();
        }

        this.Init();
    }

    public Init() {
        this.mainMenu.SetActive(true);
        this.curMenu = this.mainMenu;
        this.mainMenu.menuController = this;
        this.curMenu.IsActivated = true;
        
        this.levelStageMenu.SetActive(false);
        this.curMenu = this.levelStageMenu;
        this.levelStageMenu.menuController = this;
        this.curMenu.IsActivated = false;
        
        this.btn_start.node.on(Button.EventType.CLICK, this.OnBtnStartClick, this);
        
        this.ShowMainMenu();
    }

    update(deltaTime: number) {
    }

    public BackToMainMenu(isBackgroundOn: boolean): void {
        this.curMenu.FadeOut(0.4);
        if (isBackgroundOn) {

        }
        else {
        }
        this.ShowMainMenu();
    }

    // for button recall
    public OnBtnStartClick() {
        if (!this.IsActivated) return;
        this.mainMenu.FadeOut(0.4);
        this.ShowChapterMenu();
    }


    public ShowMainMenu(): void {
        this.curMenu = this.mainMenu;
        this.mainMenu.FadeIn(0.4);
    }

    public ShowChapterMenu(): void {
        this.curMenu = this.levelStageMenu;
        this.levelStageMenu.FadeIn(0.6);
    }
}


