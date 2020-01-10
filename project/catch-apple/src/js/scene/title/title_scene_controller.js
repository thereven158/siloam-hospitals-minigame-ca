import ScreenUtility from '../../module/screen/screen_utility';

import TitleSceneView from './title_scene_view';
import TutorialView from '../setting/tutorial_view';
import SettingView from '../setting/setting_view';

export default class TitleSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'TitleScene'});
        this.Bgm = null;
        this.music = true;
        this.sfx = true;
        this.counterNext = 0;
    }

    init(){
        console.log('title screen')

        this.initTitle();
    }

    initTitle = ()=>{
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }
    create = ()=>{
        this.view = new TitleSceneView(this).create();
        this.view.OnClickPlay(this.clickPlay);
        this.view.OnCLickTutorial(this.clickTutorial);
        this.view.OnCLickSetting(this.clickSetting);

        if(this.Bgm == null){
            this.Bgm = this.sound.add('menu_music',{
                loop:-1,
                volume: 1
            });
            
        }
        this.Bgm.play();
    }

    update = ()=>{

    }

    showTutorial = ()=>{
        this.TutorialView = new TutorialView(this);
        this.TutorialView.OnClickClose(this.clickCloseTutorial);
        this.TutorialView.OnClickNext(this.clickNext);

        this.TutorialView.Open();;
    }

    showSetting = ()=>{
        this.SettingView = new SettingView(this);
        this.SettingView.OnClickClose(this.clickCloseSetting)
        this.SettingView.OnClickMusic(this.clickMusicSetting);
        
        this.SettingView.Open();
    }

    clickPlay = ()=>{
        this.Bgm.stop();
        this.game.sound.play('audio_btn_click');
        this.scene.start('GameScene');
    }

    clickTutorial = ()=>{
        this.game.sound.play('audio_btn_click');
        this.showTutorial();
    }

    clickSetting = ()=>{
        this.game.sound.play('audio_btn_click');
        this.showSetting();
    }

    clickMusicSetting = ()=>{
        if(this.music == true){
            this.music = false;
            this.Bgm.setMute(true);
            this.SettingView.BtnMusic.Image.setTexture('sound_off');
        }else{
            this.music = true;
            this.Bgm.setMute(false);
            this.SettingView.BtnMusic.Image.setTexture('sound_on');
        }
    }

    clickNext = ()=>{
        this.game.sound.play('audio_btn_click');
        if(this.counterNext == 0){
            this.TutorialView.TitleText.setText("SCORE & HEALTH POINT");
            this.TutorialView.ContentText.setText("Untuk mendapatkan point, tangkap buah dan sayur.");
            this.TutorialView.ContentText2.setText("");
            this.TutorialView.ImageContent.setTexture('tutorial2');
        }else if(this.counterNext == 1){
            this.TutorialView.TitleText.setText("SCORE & HEALTH POINT");
            this.TutorialView.ContentText.setText("Menangkap junk food atau gagal menangkap buah / sayur dapat mengurangi health point.");
            this.TutorialView.ContentText2.setText("Game berakhir jika health point habis.");
            this.TutorialView.ContentText.setPosition(this.TutorialView.ContentContainer.x, this.TutorialView.TitleText.y * 1.2);
            this.TutorialView.ImageContent.setTexture('tutorial3');
        }else{
            this.TutorialView.TitleText.setText("BONUS SCORE");
            this.TutorialView.ContentText.setText("Setiap kali kamu berhasil menangkap buah dan sayur berutur-turut, akan muncul combo.");
            this.TutorialView.ContentText2.setText("Semakin banyak combo, semakin besar point bonus yang didapat.");
            this.TutorialView.ImageContent.setTexture('tutorial4');
            this.TutorialView.IconNext.setTexture('icon_play');
            this.TutorialView.BtnNext.Image.setTexture('btn_play_pressed');
            this.TutorialView.BtnTxt.setText("Play");
            this.TutorialView.BtnTxt.setColor('#ffffff');;
            
            this.TutorialView.OnClickNext(this.clickPlay);
        }

        this.counterNext ++;
    }

    clickCloseTutorial = ()=>{
        this.counterNext = 0;
        this.TutorialView.OnClickNext(this.clickNext);
        this.TutorialView.ContentText2.setText("");
        this.game.sound.play('audio_btn_close');
        this.TutorialView.Close();
    }

    clickCloseSetting = ()=>{
        this.game.sound.play('audio_btn_close');
        this.SettingView.Close();
    }
}