import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';
import SpawnerController from '../../subcontroller/spawner_controller';
import Apple from '../../subcontroller/apple';

export default class GameplaySceneController extends Phaser.Scene {
	constructor() {
        super({key: 'GameScene'});
        
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
        this.spawner = new SpawnerController(this);
        this.spawner.create();

        this.physics.world.setBoundsCollision(true, true, true, false);
        this.view.basket.setCollideWorldBounds(true);

        this.input.setDraggable(this.view.basket);

        this.input.on('drag', function (pointer, gameObject, dragX) {

            this.view.basket.x = Phaser.Math.Clamp(pointer.x, 
                0 + this.view.basket.displayWidth / 2, 
                this.ScreenUtility.GameWidth - this.view.basket.displayWidth / 2);

        }, this);

        var downX, upX, downY, upY, threshold = 50;

        // this.input.on('pointerdown', function (pointer){
        //     downX = pointer.x;
        //     downY = pointer.y;

        // }, this);
        
        // this.input.on('pointerup', function (pointer) {
        //     upX = pointer.x;
        //     upY = pointer.y;
        //     if (upX < downX - threshold){
        //         if(this.atMiddle){
        //             this.view.basket.setVelocityX(-800);
        //             this.atMiddle = false;
        //             this.atLeft = true;
        //         }else if(this.atRight){
        //             this.view.basket.setVelocityX(-800);
        //             this.atMiddle = true;
        //             this.atRight = false;
        //         }else{
        //             this.view.basket.setVelocityX(0);
        //         }
                
        //     } else if (upX > downX + threshold) {
        //         if(this.atMiddle){
        //             this.view.basket.setVelocityX(800);
        //             this.atMiddle = false;
        //             this.atRight = true;
        //         }else if(this.atLeft){
        //             this.view.basket.setVelocityX(800);
        //             this.atMiddle = true;
        //             this.atLeft = false;
        //         }else{
        //             this.view.basket.setVelocityX(0);
        //         }
        //     }
            
        // }, this);  

        this.startGame();
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
    }

    addScore(){
        this.score++;
        this.combo++;
        this.view.score.setText('' + this.score);
    }

    comboBreak(){
        this.combo = this.combo / 3;
        this.score += this.combo;
        this.combo = 0;
        this.score = Math.trunc(this.score);
        this.view.score.setText('' + this.score);
    }

    gameOver = ()=>{
        this.IsGameStarted = false;

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
        
    }
}