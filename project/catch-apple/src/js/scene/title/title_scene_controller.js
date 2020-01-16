import ScreenUtility from '../../module/screen/screen_utility';

import TitleSceneView from './title_scene_view';
import TutorialView from '../setting/tutorial_view';
import SettingView from '../setting/setting_view';
import LeaderView from '../setting/leaderboard_view';

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
        this.view.OnClickLeaderboard(this.clickLeaderboard);

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
        this.SettingView.OnClickClose(this.clickCloseSetting);
        this.SettingView.OnClickMusic(this.clickMusicSetting);
        
        this.SettingView.Open();
    }

    showLeaderboard = ()=>{
        this.LeaderView = new LeaderView(this);
        this.LeaderView.OnClickClose(this.clickCloseLeaderboard);
        
        this.LeaderView.Open();
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

    clickLeaderboard = ()=>{
        this.game.sound.play('audio_btn_click');
        this.showLeaderboard();
    }

    clickMusicSetting = ()=>{
        
    }

    clickNext = ()=>{
        this.game.sound.play('audio_btn_click');
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
        this.TutorialView.TxtContent2.setText("");
        this.game.sound.play('audio_btn_close');
        this.TutorialView.Close();
    }

    clickCloseSetting = ()=>{
        this.game.sound.play('audio_btn_close');
        this.SettingView.Close();
    }

    clickCloseLeaderboard = ()=>{
        this.game.sound.play('audio_btn_close');
        this.LeaderView.Close();
    }
}