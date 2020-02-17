import ScreenUtility from '../../module/screen/screen_utility';

import TitleSceneView from './title_scene_view';
import TutorialView from '../setting/tutorial_view';
import SettingView from '../setting/setting_view';
import LeaderView from '../setting/leaderboard_view';
import ApiController from '../../module/api/api_controller';
import OrientationHTMLWarningController from '../../module/flip_screen/orientation_html_warning_controller';

import LeaderboardController from '../leaderboard/leaderboard_controller';


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

    initEventFlipScreen(){
        OrientationHTMLWarningController.getInstance().setOnOrientationChangeEvent((isLandscape) => 
        {
            if (!isLandscape) 
            {
                console.log("scene restart");
                this.scene.restart();
            } 
        });
    }
    
    create = ()=>{
        OrientationHTMLWarningController.getInstance().setOnOrientationChangeEvent(null);
        // this.initEventFlipScreen();
        this.api = ApiController.getInstance();
        this.view = new TitleSceneView(this).create();
        this.view.OnClickPlay(this.clickPlay);
        this.view.OnCLickTutorial(this.clickTutorial);
        this.view.OnCLickSetting(this.clickSetting);
        this.view.OnClickLeaderboard(this.clickLeaderboard);

        var assets = {
            outerboard: 'lb_outer_board',
            innerboard: 'lb_inner_board',
            closeButton: 'btn_close',
            closeButtonPress: 'btn_close_pressed',
            banner: 'banner_leaderboard',
            playerBox: 'bg_current_rank',
            topBox: 'bg_top3',
            box: 'bg_non_top3',
            playerBoxMain: 'bg_current__rank_big'
        };
        var title = "DEBBY'S GROCERIES";
        this.leaderboardScreen = new LeaderboardController(this, assets, title);
        this.leaderboardScreen.create();


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

        if(this.api.isLogin == false){
            this.api.AuthLogin()
            .then(() => {
                return console.log("loged in");
            })
            .catch(() => {
                this.scene.start('WarningScene');
            })
        }else{
            return console.log("has loged in");
        }
        

    }

    update = ()=>{
        
    }

    showTutorial = ()=>{
        this.TutorialView = new TutorialView(this);
        this.TutorialView.OnClickClose(this.clickCloseTutorial);
        this.TutorialView.OnClickNext(this.clickNext);

        this.TutorialView.Open();
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
        // this.LeaderView = new LeaderView(this);
        // this.LeaderView.OnClickClose(this.clickCloseLeaderboard);
        
        // this.LeaderView.Open();

        // this.api.Leaderboard()
        // .then(data => {
        //     console.log(data.data.data);
        //     this.LeaderView.Fill(data.data.data, data.myRank, data.myRank);
        // }).catch(() => {
        //     this.LeaderView.Fill(null, null, null);
        //     this.scene.start('WarningScene');
        // });

        this.leaderboardScreen.show();

    }

    clickPlay = ()=>{
        this.counterNext = 0;
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
        this.counterNext ++;
        if(this.counterNext == 0){
            console.log(this.counterNext);
            this.TutorialView.SetDescription(
                "DEBBY CONTROL",
                "Swipe the screen to move Dabby to right or left.",
                "",
                'tutorial2',
                'btn_normal',
                'icon_next',
                "NEXT"
            );
        }
        else if(this.counterNext == 1){
            console.log(this.counterNext);
            this.TutorialView.SetDescription(
                "SCORE & HEALTH POINT",
                "To get a point, catch the fruits, and veggies.",
                "",
                'tutorial2',
                'btn_normal',
                'icon_next',
                "NEXT"
            );
        }else if(this.counterNext == 2){
            console.log(this.counterNext);
            this.TutorialView.SetDescription(
                "SCORE & HEALTH POINT",
                "Catching the junk food or fail to catch fruits or veggies will make you lose a health point.",
                "The game end when you lose all health point.",
                'tutorial3',
                'btn_normal',
                'icon_next',
                "NEXT"
            );
        }else{
            console.log(this.counterNext);
            this.TutorialView.SetDescription(
                "BONUS SCORE",
                "Every time you catch fruit and veggies, in a row, you will trigger combo.",
                "The highest combo will determine how much you get bonus score.",
                'tutorial4',
                'btn_play_pressed',
                'icon_play',
                "PLAY"
            );
            this.TutorialView.OnClickNext(this.clickPlay);
        }
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