import ScreenUtility from '../../module/screen/screen_utility';

import PauseView from './pause_scene_view';


export default class PauseSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'PauseScene'});
    }

    init = (data)=>{
        console.log('pause scene', data)

        this.initPause();
        this.initAudio();
        this.music = data.music;
        this.sfx = data.sfx;
    }

    initPause = ()=>{
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }

    initAudio = ()=>{
        this.audioClick = this.sound.add('audio_btn_click');
        this.audioClose = this.sound.add('audio_btn_close');
    }
    
    create = ()=>{
        this.view = new PauseView(this);
        this.view.create();

        this.view.OnClickMainmenu(this.clickMainmenu);
        this.view.OnClickResume(this.clickResume);
        this.view.OnClickClose(this.clickClose);

        if(this.sfx == true){
            this.unMuteAllSfx();
        }else{
            this.muteAllSfx();
        }
    }

    update = ()=>{

    }

    clickMainmenu = ()=>{
        this.audioClick.play();

        this.scene.stop('GameScene');
        this.scene.start('TitleScene', { music: this.music, sfx: this.sfx });
    }

    clickResume = ()=>{
        this.audioClick.play();

        this.scene.resume('GameScene');
        this.scene.stop();
    }

    clickClose = ()=>{
        this.audioClose.play();

        this.scene.resume('GameScene');
        this.scene.stop();
    }

    muteAllSfx(){
        this.audioClick.mute = true;
        this.audioClose.mute = true;
    }

    unMuteAllSfx(){
        this.audioClick.mute = false;
        this.audioClose.mute = false;
    }
}