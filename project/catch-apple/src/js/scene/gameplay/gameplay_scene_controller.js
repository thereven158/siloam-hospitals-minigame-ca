import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import SpawnerController from '../../subcontroller/spawner_controller';
import Apple from '../../subcontroller/apple';
import ResultView from '../setting/result_view';
import AdsView from '../setting/ads_view';
import LeaderView from '../setting/leaderboard_view';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        this.Bgm = null;
        this.gameoverBgm = null;
    }

    init = ()=>{
        console.log('game screen')

        this.initGame();
        this.initGameData();
        this.initAudio();
    }

    initGame = ()=>{
        ScreenUtility.ResetGameScreen();
        this.ScreenUtility = ScreenUtility.getInstance();
        
    }

    initGameData = ()=>{
        this.IsGameStarted = false;
        this.IsGameWin = true;
        this.atMiddle = true;
        this.atLeft = false;
        this.atRight = false;
        this.score = 0;
        this.life = 3;
        this.comboCounter = 0;
        this.comboScore = 0;
        this.adsShowed = false;
    }

    initAudio = ()=>{

    }

    create = ()=>{        

        this.view = new GameplaySceneView(this).create();
        this.view.onClickPause(this.clickPause);
        this.spawner = new SpawnerController(this);
        this.spawner.create();

        this.physics.world.setBoundsCollision(true, true, true, false);
        this.view.basket.setCollideWorldBounds(true);

        var downX, upX, downY, upY, threshold = 50;

        this.input.on('pointerdown', function (pointer){
            downX = pointer.x;
            downY = pointer.y;

        }, this);
        
        this.input.on('pointerup', function (pointer) {
            upX = pointer.x;
            upY = pointer.y;
            
            if (upX < downX - threshold){
                this.game.sound.play('swipe_sfx');
                if(this.atMiddle){
                    this.view.moveToLeft();
                    this.atMiddle = false;
                    this.atLeft = true;
                }else if(this.atRight){
                    this.view.moveToMid();
                    this.atMiddle = true;
                    this.atRight = false;
                }else{
                    console.log("Nothing");
                }
                
            } else if (upX > downX + threshold) {
                this.game.sound.play('swipe_sfx');
                if(this.atMiddle){
                    this.view.moveToRight();
                    this.atMiddle = false;
                    this.atRight = true;
                }else if(this.atLeft){
                    this.view.moveToMid();
                    this.atMiddle = true;
                    this.atLeft = false;
                }else{
                    console.log("Nothing");
                }
            }
            
        }, this); 

        if(this.Bgm == null){
            this.Bgm = this.sound.add('ingame_music',{
                loop:-1,
                volume: 1
            });
        }

        if(this.gameoverBgm == null){
            this.gameoverBgm = this.sound.add('game_over',{
                loop:-1,
                volume: 1
            });
        }

        this.Bgm.play();

        this.startGame();
    }

    clickPause = ()=>{
        this.game.sound.play('audio_btn_click');
        
        this.scene.switch('PauseScene');
    }

    startGame = ()=>{
        this.IsGameStarted = true;

        this.spawner.LevelOne();
        this.physics.add.collider(this.view.basket, this.spawner.lvlOneLeftGroup, this.onHitFood1);
        this.physics.add.collider(this.view.basket, this.spawner.lvlOneMidGroup, this.onHitFood2);
        this.physics.add.collider(this.view.basket, this.spawner.lvlOneRightGroup, this.onHitFood3);

        this.physics.add.collider(this.view.basket, this.spawner.lvlTwoLeftGroup, this.onHitFood1);
        this.physics.add.collider(this.view.basket, this.spawner.lvlTwoMidGroup, this.onHitFood2);
        this.physics.add.collider(this.view.basket, this.spawner.lvlTwoRightGroup, this.onHitFood3);

    }

    update(timestep, delta){
        if(this.IsGameStarted){
            this.gameUpdate(timestep, delta);
        }

        if(this.spawner.spawn1.y > this.ScreenUtility.GameHeight || this.spawner.spawn2.y > this.ScreenUtility.GameHeight){
            this.destroyObj();
        } 
        
        if(this.adsShowed == true){
            this.AdsView.TxtSkip.setText(5 - this.timerEvent.getElapsedSeconds().toString().substr(0, 1));
        }
    }

    gameUpdate(timestep, delta){
        this.view.debby.x = this.view.basket.x + this.view.basket.displayWidth * 0.5;
        
    }

    destroyObj(){
        this.spawner.spawn1.destroy();
        this.spawner.spawn2.destroy();
        this.spawner.spawn3.destroy();
    }

    onHitFood1 = (basket, food) =>{
        if(this.spawner.spawn1.texture.key == "good" || this.spawner.spawn1.texture.key == "good2" || this.spawner.spawn1.texture.key == "good3" || this.spawner.spawn1.texture.key == "good4" || this.spawner.spawn1.texture.key == "good5"){
            this.addScore();
            
        }else if(this.spawner.spawn1.texture.key == "bad" || this.spawner.spawn1.texture.key == "bad2" || this.spawner.spawn1.texture.key == "bad3" || this.spawner.spawn1.texture.key == "bad4" || this.spawner.spawn1.texture.key == "bad5"){
            this.hpDown();
        }

        food.destroy();
    }

    onHitFood2 = (basket, food) =>{
        if(this.spawner.spawn2.texture.key == "good" || this.spawner.spawn2.texture.key == "good2" || this.spawner.spawn2.texture.key == "good3" || this.spawner.spawn2.texture.key == "good4" || this.spawner.spawn2.texture.key == "good5"){
            this.addScore();
            
        }else if(this.spawner.spawn2.texture.key == "bad" || this.spawner.spawn2.texture.key == "bad2" || this.spawner.spawn2.texture.key == "bad3" || this.spawner.spawn2.texture.key == "bad4" || this.spawner.spawn2.texture.key == "bad5"){
            this.hpDown();
        }

        food.destroy();
    }

    onHitFood3 = (basket, food) =>{
        if(this.spawner.spawn3.texture.key == "good" || this.spawner.spawn3.texture.key == "good2" || this.spawner.spawn3.texture.key == "good3" || this.spawner.spawn3.texture.key == "good4" || this.spawner.spawn3.texture.key == "good5"){
            this.addScore();
            
        }else if(this.spawner.spawn3.texture.key == "bad" || this.spawner.spawn3.texture.key == "bad2" || this.spawner.spawn3.texture.key == "bad3" || this.spawner.spawn3.texture.key == "bad4" || this.spawner.spawn3.texture.key == "bad5"){
            this.hpDown();
        }

        food.destroy();
    }

    hpDown(){
        this.game.sound.play('catch_bad');
        this.view.debby.setTexture('debby_sad');
        this.comboBreak();
        this.life -= 1;

        if(this.life == 0 && this.IsGameStarted){
            this.view.life1.setTexture('unlife');
            this.gameOver();
        }
        else if(this.life == 1){
            this.view.life2.setTexture('unlife');
        }
        else if(this.life == 2){
            this.view.life3.setTexture('unlife');
        }

        this.time.addEvent({ 
            delay: 1000, 
            callback: this.setTextureDebby, 
            callbackScope: this, 
            loop: false 
        });
    }

    setTextureDebby(){
        this.view.debby.setTexture('debby');
    }


    addScore(){
        this.game.sound.play('catch_good');
        this.score++;
        this.comboCounter++;
        this.view.score.setText('' + this.score);
        this.view.ComboTxt.setText('x' + this.comboCounter);
        this.view.comboTextTween();
    }

    comboBreak(){
        this.comboCounter = this.comboCounter / 3;
        this.score += this.comboCounter;
        this.comboScore += this.comboCounter;
        this.comboCounter = 0;
        this.score = Math.trunc(this.score);
        this.comboScore = Math.trunc(this.comboScore);
        this.view.score.setText('' + this.score);
        this.view.ComboTxt.setText('');
    }

    gameOver = ()=>{
        this.IsGameStarted = false;

        this.Bgm.stop();
        this.gameoverBgm.play();

        this.showResult();
    }

    backToTitle = ()=>{
        this.scene.launch('TitleScene');
        this.scene.stop();
    }

    showResult = ()=>{
        this.ResultView = new ResultView(this);
        this.ResultView.Open();
        this.ResultView.OnClickRetry(this.Restart);
        this.ResultView.OnClickExit(this.ExitGame);
        this.ResultView.OnClickLeaderboard(this.clickLeaderboard);

        this.ResultView.Score.setText(this.score - this.comboScore);
        this.ResultView.ComboScore.setText(this.comboCounter * 3);
        this.ResultView.BonusScore.setText(this.comboScore);
        this.ResultView.TotalScore.setText(this.score);
    }

    showLeaderboard = ()=>{
        this.LeaderView = new LeaderView(this);
        this.LeaderView.OnClickClose(this.clickCloseLeaderboard);
        
        this.LeaderView.Open();
    }

    Restart = ()=>{
        this.game.sound.play('audio_btn_click');
        this.AdsView = new AdsView(this);
        this.AdsView.Open();
        this.adsShowed = true;
        
        this.gameoverBgm.stop();

        this.timerEvent = this.time.delayedCall(5000, this.eventCanClick, [], this);
    }

    eventCanClick = ()=>{
        this.AdsView.OnClickSkip(this.clickSkipRestart);
        this.adsShowed = false;
        this.timerEvent.remove();
    }

    clickSkipRestart = ()=>{
        this.game.sound.play('audio_btn_close');
        
        this.AdsView.Close();
        this.scene.restart();

        this.scene.stop();
        this.scene.start('TitleScene');
    }

    clickSkipExit = ()=>{
        this.game.sound.play('audio_btn_close');
        this.adsShowed = false;
        this.AdsView.Close();

        this.scene.stop();
        this.scene.start('TitleScene');
    }

    clickLeaderboard = ()=>{
        this.game.sound.play('audio_btn_click');
        this.showLeaderboard();
    }

    clickCloseLeaderboard = ()=>{
        this.game.sound.play('audio_btn_close');
        this.LeaderView.Close();
    }

    ExitGame = ()=>{
        this.game.sound.play('audio_btn_click');
        this.AdsView = new AdsView(this);
        this.AdsView.Open();
        this.AdsView.OnClickSkip(this.clickSkipExit);

        this.gameoverBgm.stop();
    }
}