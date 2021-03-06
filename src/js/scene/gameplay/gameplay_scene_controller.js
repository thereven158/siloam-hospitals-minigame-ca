import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import SpawnerController from '../../subcontroller/spawner_controller';
import SpawnPoint from '../../subcontroller/spawn_point';
import ResultView from '../setting/result_view';
import AdsView from '../setting/ads_view';
import LeaderView from '../setting/leaderboard_view';
import GoodFood from '../../subcontroller/good_food';
import BadFood from '../../subcontroller/bad_food';
import OrientationHTMLWarningController from "../../module/flip_screen/orientation_html_warning_controller";
import LeaderboardController from '../leaderboard/leaderboard_controller';

import ApiController from '../../module/api/api_controller';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        this.Bgm = null;
        this.gameoverBgm = null;
    }

    init = (data)=>{
        console.log('game screen', data);

        this.initGame();
        this.initGameData();
        this.initAudio();
        this.initEventFlipScreen();
        this.music = data.music;
        this.sfx = data.sfx;
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
        this.spawnTimer = 0;
        this.counter = 0;
        this.phaseOneActive = true;
        this.phaseTwoActive = false;
        this.phaseThreeActive = false;
    }

    initAudio = ()=>{
        this.audioClick = this.sound.add('audio_btn_click');
        this.audioClose = this.sound.add('audio_btn_close');
        this.audioSwipe = this.sound.add('swipe_sfx');
        this.audioGoodCatch = this.sound.add('catch_good');
        this.audioBadCatch = this.sound.add('catch_bad');
    }

    initEventFlipScreen(){
        OrientationHTMLWarningController.getInstance().setOnOrientationChangeEvent((isLandscape) => 
        {
            if (isLandscape) 
            {
                if(this.IsGameStarted == true) this.clickPause();
            } 
        });

    }

    create = ()=>{        
        this.api = ApiController.getInstance();
        this.view = new GameplaySceneView(this).create();
        this.view.onClickPause(this.clickPause);
        this.spawner = new SpawnerController(this);
        this.spawner.create();
        this.spawnPoint = new SpawnPoint(this.scene);
        this.spawnPoint.create();
        this.good = new GoodFood(this);
        this.bad = new BadFood(this);

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

        this.physics.world.setBoundsCollision(true, true, true, true);

        var downX, upX, downY, upY, threshold = 50;

        this.input.on('pointerdown', function (pointer){
            downX = pointer.x;
            downY = pointer.y;

        }, this);
        
        this.input.on('pointerup', function (pointer) {
            upX = pointer.x;
            upY = pointer.y;
            
            if (upX < downX - threshold){
                this.audioSwipe.play();
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
                this.audioSwipe.play();
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

        if(this.music == true){
            this.Bgm.play();
            this.Bgm.mute = false;
        }else{
            this.Bgm.mute = true;
            this.gameoverBgm.mute = true;
        }

        if(this.sfx == true){
            this.unMuteAllSfx();
        }else{
            this.muteAllSfx();
        }

        this.startGame();
    }

    clickPause = ()=>{
        this.audioClick.play();
        this.Bgm.pause();
        
        this.scene.launch('PauseScene', { music: this.music, sfx: this.sfx });
        this.scene.pause();
    }

    startGame = ()=>{
        this.IsGameStarted = true;
    }

    update(timestep, delta){
        if(this.IsGameStarted){
            this.gameUpdate(timestep, delta);
        }

        if(this.adsShowed == true){
            this.AdsView.TxtSkip.setText(5 - this.timerEvent.getElapsedSeconds().toString().substr(0, 1));
        }

        if(this.scene.isPaused() == false){
            this.Bgm.resume();
        }
    }

    gameUpdate(timestep, delta){
        this.view.debby.x = this.view.basket.x + this.view.basket.displayWidth * 0.5;
        
        this.spawnTimer += (1 * delta) / 1000;
        if(this.spawnTimer > this.spawner.rateSpawn){
            this.spawnTimer = 0;
            
            this.FirstPhase();
        }
    }

    FirstPhase(){
        if(this.spawner.phaseOneL[this.counter] == 2){
            this.good.SpawnFood(this.spawnPoint.pointLeftX, this.spawnPoint.pointY);
            this.AddColliderGoodFood();
        }else if(this.spawner.phaseOneL[this.counter] == 1){
            this.bad.SpawnFood(this.spawnPoint.pointLeftX, this.spawnPoint.pointY);
            this.AddColliderBadFood();
        }else{

        }

        if(this.spawner.phaseOneM[this.counter] == 2){
            this.good.SpawnFood(this.spawnPoint.pointMidX, this.spawnPoint.pointY);
            this.AddColliderGoodFood();
        }else if(this.spawner.phaseOneM[this.counter] == 1){
            this.bad.SpawnFood(this.spawnPoint.pointMidX, this.spawnPoint.pointY);
            this.AddColliderBadFood();
        }else{

        }

        if(this.spawner.phaseOneR[this.counter] == 2){
            this.good.SpawnFood(this.spawnPoint.pointRightX, this.spawnPoint.pointY);
            this.AddColliderGoodFood();
        }else if(this.spawner.phaseOneR[this.counter] == 1){
            this.bad.SpawnFood(this.spawnPoint.pointRightX, this.spawnPoint.pointY);
            this.AddColliderBadFood();
        }else{

        }
        
        this.counter++;

        if(this.counter == 9){
            this.ReduceRateSpawn();
            this.counter = 0;
            this.phaseOneActive = false;
            this.phaseTwoActive = true;
            this.spawner.GenerateRandomPattern();
        }
    }

    AddColliderGoodFood(){
        this.physics.add.collider(this.view.basket, this.good.fruit, this.onHitGoodFood);
        this.physics.add.collider(this.view.bottomBound, this.good.fruit, this.onGoodOutOffBound);
    }

    AddColliderBadFood(){
        this.physics.add.collider(this.view.basket, this.bad.food, this.onHitBadFood);
        this.physics.add.collider(this.view.bottomBound, this.bad.food, this.onBadOutOffBound);
    }

    ReduceRateSpawn(){
        this.good.fallSpeed += 50;
        this.bad.fallSpeed += 50;
        this.spawner.rateSpawn -= 0.2;

        console.log("ratespawn: "+ this.spawner.rateSpawn);
        console.log("speed fall:" + this.good.fallSpeed);

        if(this.spawner.rateSpawn <= 1){
            this.spawner.rateSpawn = 1;
            this.good.fallSpeed = 750;
            this.bad.fallSpeed = 750;
        }
    }

    onHitGoodFood = (basket, food) =>{
        if(food.body.touching.down == true){
            food.destroy();
            this.addScore();
        }
    }

    onHitBadFood = (basket, food) =>{
        if(food.body.touching.down == true){
            food.destroy();
            this.hpDown();  
        }
    }

    onGoodOutOffBound = (worldBound, food) =>{
        food.destroy();
        this.hpDown();
    }

    onBadOutOffBound = (worldBound, food) =>{
        food.destroy();
    }

    muteAllSfx(){
        this.audioClick.mute = true;
        this.audioClose.mute = true;
        this.audioSwipe.mute = true;
        this.audioGoodCatch.mute = true;
        this.audioBadCatch.mute = true;
    }

    unMuteAllSfx(){
        this.audioClick.mute = false;
        this.audioClose.mute = false;
        this.audioSwipe.mute = false;
        this.audioBadCatch.mute = false;
    }

    hpDown(){
        this.audioBadCatch.play();
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
        this.audioGoodCatch.play();
        this.score++;
        this.comboCounter++;
        this.view.score.setText('' + this.score);
        this.view.ComboTxt.setText('x' + this.comboCounter);
        this.view.comboTextTween();

        this.view.debby.setTexture('debby_happy');
        
        this.time.addEvent({ 
            delay: 1000, 
            callback: this.setTextureDebby, 
            callbackScope: this, 
            loop: false 
        });
    }

    comboBreak(){
        if(this.comboCounter > this.comboScore){
            this.comboScore = this.comboCounter;
        }
        this.comboCounter = 0;
        // this.comboScore = Math.trunc(this.comboScore);
        this.view.ComboTxt.setText('');
    }

    gameOver = ()=>{
        OrientationHTMLWarningController.getInstance().setOnOrientationChangeEvent(null);

        this.calculatingScore = Math.floor(this.score + (this.comboScore / 3));
        this.api.Score(this.calculatingScore).then(() => {
            console.log('send score');
        })
        .catch(() => {
            this.scene.start('WarningScene');
        });

        this.IsGameStarted = false;
        this.physics.world.pause();

        this.input.removeAllListeners();
        this.Bgm.stop();
        this.gameoverBgm.play();

        this.showResult();
    }

    backToTitle = ()=>{
        this.gameoverBgm.stop();
        this.scene.launch('TitleScene');
        this.scene.stop();
    }

    showResult = ()=>{
        this.ResultView = new ResultView(this);
        this.ResultView.Open();
        this.ResultView.OnClickRetry(this.Restart);
        this.ResultView.OnClickExit(this.ExitGame);
        this.ResultView.OnClickLeaderboard(this.clickLeaderboard);

        this.ResultView.Score.setText(this.score);
        this.ResultView.ComboScore.setText(this.comboScore);
        this.ResultView.BonusScore.setText(Math.floor(this.comboScore / 3));
        this.ResultView.TotalScore.setText(Math.floor(this.score + (this.comboScore / 3)));
    }

    showLeaderboard = ()=>{
        this.leaderboardScreen.show();

        // this.LeaderView = new LeaderView(this);
        // this.LeaderView.OnClickClose(this.clickCloseLeaderboard);
        
        // this.LeaderView.Open();

        // this.api.Leaderboard()
        // .then(data => {
        //     console.log("check1");
        //     console.log(data.data.data);
        //     this.LeaderView.Fill(data.data.data, data.myRank, data.myRank);
        // }).catch(() => {
        //     this.LeaderView.Fill(null, null, null);
        //     this.scene.start('WarningScene');
        // });
    }

    Restart = ()=>{
        this.audioClick.play();
        this.AdsView = new AdsView(this);
        this.AdsView.Open();
        this.adsShowed = true;

        this.api.Ads()
        .then(data => {
            console.log(data);
            this.AdsView.CreateContentAds(data.data.description, data.data.type, data.data.file);
        }).catch(() => {
            this.AdsView.CreateContentAds(null, null, null);
        });
        
        this.gameoverBgm.stop();

        this.timerEvent = this.time.delayedCall(5000, this.eventCanClickOnRetryAds, [], this);
    }

    ExitGame = ()=>{
        this.audioClick.play();
        this.AdsView = new AdsView(this);
        this.AdsView.Open();
        this.adsShowed = true;

        this.api.Ads()
        .then(data => {
            console.log(data);
            this.AdsView.CreateContentAds(data.data.description, data.data.type, data.data.file);
        }).catch(() => {
            this.AdsView.CreateContentAds(null, null, null);
        });

        this.gameoverBgm.stop();

        this.timerEvent = this.time.delayedCall(5000, this.eventCanClickOnExitAds, [], this);
    }

    eventCanClickOnRetryAds = ()=>{
        this.AdsView.OnClickSkip(this.clickSkipRestart);
        this.adsShowed = false;
        this.timerEvent.remove();
    }

    eventCanClickOnExitAds = ()=>{
        this.AdsView.OnClickSkip(this.clickSkipExit);
        this.adsShowed = false;
        this.timerEvent.remove();
    }

    clickSkipRestart = ()=>{
        this.audioClose.play();
        
        this.AdsView.Close();
        OrientationHTMLWarningController.getInstance().setOnOrientationChangeEvent(null);
        this.scene.restart();
    }

    clickSkipExit = ()=>{
        this.audioClose.play();
        this.adsShowed = false;
        this.AdsView.Close();

        OrientationHTMLWarningController.getInstance().setOnOrientationChangeEvent(null);
        this.scene.stop();
        this.scene.start('TitleScene', { music: this.music, sfx: this.sfx });
    }

    clickLeaderboard = ()=>{
        this.audioClick.play();
        this.showLeaderboard();
    }

    clickCloseLeaderboard = ()=>{
        this.audioClose.play();
        this.LeaderView.Close();
    }
}