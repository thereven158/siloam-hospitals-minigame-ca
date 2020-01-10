import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import SpawnerController from '../../subcontroller/spawner_controller';
import Apple from '../../subcontroller/apple';
import ResultView from '../setting/result_view';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        this.Bgm = null;
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
        this.combo = 0;
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

            this.game.sound.play('swipe_sfx');
            
        }, this); 

        if(this.Bgm == null){
            this.Bgm = this.sound.add('ingame_music',{
                loop:-1,
                volume: 1
            });
            
        }
        this.Bgm.play();

        this.startGame();
    }

    clickPause = ()=>{

        this.game.sound.play('audio_btn_click');
        // this.scene.pause();
        // this.scene.start('PauseScene');
        
        
        // this.scene.pause();
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

        // if(this.view.basket.x <= this.spawner.point1X){
        //     this.view.basket.setVelocityX(0);
        //     this.view.basket.x = this.spawner.point1X + 1;
        // }else if(this.view.basket.x >= this.spawner.point2X - 2 && this.view.basket.x <= this.spawner.point2X + 2){
        //     this.view.basket.setVelocityX(0);
        //     this.view.basket.x = this.spawner.point2X + 1;
        // }else if(this.view.basket.x >= this.spawner.point3X){
        //     this.view.basket.setVelocityX(0);
        //     this.view.basket.x = this.spawner.point3X - 1;
        // }

        
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
        if(this.spawner.spawn1.texture.key == "good"){
            this.addScore();
            
        }else if(this.spawner.spawn1.texture.key == "bad"){
            this.hpDown();
        }

        food.destroy();
    }

    onHitFood2 = (basket, food) =>{
        if(this.spawner.spawn2.texture.key == "good"){
            this.addScore();
            
        }else if(this.spawner.spawn2.texture.key == "bad"){
            this.hpDown();
        }

        food.destroy();
    }

    onHitFood3 = (basket, food) =>{
        if(this.spawner.spawn3.texture.key == "good"){
            this.addScore();
            
        }else if(this.spawner.spawn3.texture.key == "bad"){
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
        this.combo++;
        this.view.score.setText('' + this.score);
        this.view.ComboTxt.setText('x' + this.combo);
        this.view.comboTextTween();
    }

    comboBreak(){
        this.combo = this.combo / 3;
        this.score += this.combo;
        this.combo = 0;
        this.score = Math.trunc(this.score);
        this.view.score.setText('' + this.score);
        this.view.ComboTxt.setText('');
    }

    gameOver = ()=>{
        this.IsGameStarted = false;
        this.game.sound.play('game_over');
        this.Bgm.stop();

        this.showResult();
    }

    restart = ()=>{
        this.scene.restart();
    }

    backToTitle = ()=>{
        this.scene.launch('TitleScene');
        this.scene.stop();
    }

    showResult = ()=>{
        this.ResultView = new ResultView(this);
        this.ResultView.Open();
    }
}