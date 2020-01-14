import ScreenUtility from '../../module/screen/screen_utility';

import PauseView from './pause_scene_view';


export default class PauseSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'PauseScene'});
    }

    init(){
        this.initPause();
    }

    initPause = ()=>{
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();

    }
    
    create = ()=>{
        this.view = new PauseView(this);
        this.view.create();

        this.view.OnClickMainmenu(this.clickMainmenu);
        this.view.OnClickResume(this.clickResume);
        this.view.OnClickClose(this.clickResume);
    }

    update = ()=>{

    }

    clickMainmenu = ()=>{
        this.scene.start('TitleScene');
    }

    clickResume = ()=>{
        this.scene.switch('GameScene');
    }
}