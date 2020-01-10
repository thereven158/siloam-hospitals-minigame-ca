import ScreenUtility from '../../module/screen/screen_utility';


export default class StopSceneController extends Phaser.Scene {
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
        
    }

    update = ()=>{

    }

    clickPlay = ()=>{

    }
}