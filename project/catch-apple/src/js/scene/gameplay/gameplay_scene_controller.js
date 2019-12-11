import GameplaySceneView from './gameplay_scene_view';
import ScreenUtility from '../../module/screen/screen_utility';

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
    }

    initAudio = ()=>{

    }

    create = ()=>{
        this.view = new GameplaySceneView(this).create();

        this.startGame();
    }

    startGame = ()=>{
        this.IsGameStarted = true;

        this.gameOver();
    }

    update(timestep, delta){
        if(this.IsGameStarted){
            this.gameUpdate(timestep, delta);
        }

    }

    gameUpdate(timestep, delta){
        
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