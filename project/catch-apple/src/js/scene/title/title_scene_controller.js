import ScreenUtility from '../../module/screen/screen_utility';

import TitleSceneView from './title_scene_view';
import TutorialView from '../setting/tutorial_view';
import SettingView from '../setting/setting_view';
import LeaderView from '../setting/leaderboard_view';
import ApiController from '../../module/api/api_controller';

export default class TitleSceneController extends Phaser.Scene {
	constructor() {
        super({key: 'TitleScene'});
        this.Bgm = null;
        this.music = true;
        this.sfx = true;
        this.counterNext = 0;
    }

    init = (data)=>{
        console.log('title screen', data);

        this.initTitle();
        this.initAudio();
        this.music = data.music;
        this.sfx = data.sfx;

        if(this.music == null){
            this.music = true;
        }

        if(this.sfx == null){
            this.sfx = true;
        }
    }

    initAudio(){
        this.audioClick = this.sound.add('audio_btn_click');
        this.audioClose = this.sound.add('audio_btn_close');
    }

    initTitle = ()=>{
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
    }
    
    create = ()=>{
        this.api = ApiController.getInstance();
        this.view = new TitleSceneView(this).create();
        this.view.OnClickPlay(this.clickPlay);
        this.view.OnCLickTutorial(this.clickTutorial);
        this.view.OnCLickSetting(this.clickSetting);
        this.view.OnClickLeaderboard(this.clickLeaderboard);

        if(this.Bgm == null){
            this.Bgm = this.sound.add('menu_music',{
                loop:-1,
                volume: 1
            });
            
        }
        this.Bgm.play();

        if(this.music == false){
            this.Bgm.mute = true;
        }

        if(this.sfx == true){
            this.unMuteAllSfx();
        }else{
            this.muteAllSfx();
        }
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
        this.SettingView.OnClickClose(this.clickCloseSetting);
        this.SettingView.OnClickMusic(this.clickMusicSetting);
        this.SettingView.OnClickSfx(this.clickSfxSetting);

        if(this.music == false){
            this.SettingView.BtnMusic.Image.setTexture('sound_off');
        }

        if(this.sfx == false){
            this.SettingView.BtnSfx.Image.setTexture('sound_off');
        }
        
        this.SettingView.Open();
    }

    showLeaderboard = ()=>{
        this.LeaderView = new LeaderView(this);
        this.LeaderView.OnClickClose(this.clickCloseLeaderboard);
        
        this.LeaderView.Open();

        this.api.Leaderboard().then(data => {
            console.log(data.data.data);
            this.LeaderView.Fill(data.data.data, data.myRank);
        });
    }

    clickPlay = ()=>{
        this.Bgm.stop();
        this.audioClick.play();
        this.scene.start('GameScene', { music: this.music, sfx: this.sfx });
    }

    clickTutorial = ()=>{
        this.audioClick.play();
        this.showTutorial();
    }
    

    clickSetting = ()=>{
        this.audioClick.play();
        this.showSetting();
    }

    clickLeaderboard = ()=>{
        this.audioClick.play();
        this.showLeaderboard();
    }

    clickMusicSetting = ()=>{
        this.audioClick.play();
        if(this.music == true){
            this.music = false;
            this.Bgm.mute = true;
            this.SettingView.BtnMusic.Image.setTexture('sound_off');
        }else{
            this.music = true;
            this.Bgm.mute = false;
            this.SettingView.BtnMusic.Image.setTexture('sound_on');
        }
    }

    clickSfxSetting = ()=>{
        this.audioClick.play();
        if(this.sfx == true){
            this.sfx = false;
            this.muteAllSfx();
            this.SettingView.BtnSfx.Image.setTexture('sound_off');
        }else{
            this.sfx = true;
            this.unMuteAllSfx();
            this.SettingView.BtnSfx.Image.setTexture('sound_on');
        }
    }

    muteAllSfx(){
        this.audioClick.mute = true;
        this.audioClose.mute = true;
    }

    unMuteAllSfx(){
        this.audioClick.mute = false;
        this.audioClose.mute = false;
    }

    clickNext = ()=>{
        this.audioClick.play();
        if(this.counterNext == 0){
            this.TutorialView.SetDescription(
                "SCORE & HEALTH POINT",
                "Untuk mendapatkan point, tangkap buah dan sayur.",
                "",
                'tutorial2',
                'btn_normal',
                'icon_next',
                "NEXT"
            );
        }else if(this.counterNext == 1){
            this.TutorialView.SetDescription(
                "SCORE & HEALTH POINT",
                "Menangkap junk food atau gagal menangkap buah / sayur dapat mengurangi health point.",
                "Game berakhir jika health point habis.",
                'tutorial3',
                'btn_normal',
                'icon_next',
                "NEXT"
            );
        }else{
            this.TutorialView.SetDescription(
                "BONUS SCORE",
                "Setiap kali kamu berhasil menangkap buah dan sayur berutur-turut, akan muncul combo.",
                "Semakin banyak combo, semakin besar point bonus yang didapat.",
                'tutorial4',
                'btn_play_pressed',
                'icon_play',
                "PLAY"
            );
            
            this.TutorialView.OnClickNext(this.clickPlay);
        }

        this.counterNext ++;
    }

    clickCloseTutorial = ()=>{
        this.counterNext = 0;
        this.TutorialView.OnClickNext(this.clickNext);
        this.audioClose.play();
        this.TutorialView.Close();
    }

    clickCloseSetting = ()=>{
        this.audioClose.play();
        this.SettingView.Close();
    }

    clickCloseLeaderboard = ()=>{
        this.audioClose.play();
        this.LeaderView.Close();
    }
}