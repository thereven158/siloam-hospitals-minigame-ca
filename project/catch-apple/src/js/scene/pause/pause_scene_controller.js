import ScreenUtility from '../../module/screen/screen_utility';

import PauseSceneView from './pause_scene_view';


export default class PauseSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'PauseScene'});
        
    }

    create = ()=>{
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();

        this.PauseView = new PauseSceneView(this);
        this.PauseView.create();
    }

    update = ()=>{

    }

    clickPlay = ()=>{

    }
}