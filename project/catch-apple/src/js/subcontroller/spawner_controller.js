import ScreenUtility from "../module/screen/screen_utility";
// import GoodFood from '../subcontroller/good_food';

export default class SpawnerController {

    /** @param {Phaser.Scene} scene */
    constructor(scene){
        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        
    }

    create(){
        this.badStuff = [ 'bad', 'bad2', 'bad3', 'bad4', 'bad5'];
        this.rateSpawn = 2; // per second
        this.spawnTimer = 0;

        this.GenerateRandomPattern();
        // this.InitPhaseTwo();
        // this.InitPhaseThree();
    }

    InitPhaseOne(){
        console.log("phase1");
        this.phaseOneL = [2, 1, 0, 0, 2, 1, 2, 0, 0, 2];
        this.phaseOneM = [0, 2, 0, 2, 0, 0, 0, 1, 0, 1];
        this.phaseOneR = [0, 0, 1, 0, 1, 2, 0, 0, 2, 0];
    }

    InitPhaseTwo(){
        console.log("phase2");
        this.phaseOneL = [0, 1, 0, 0, 2, 0, 0, 2, 1, 2];
        this.phaseOneM = [2, 0, 0, 2, 1, 1, 0, 0, 0, 0];
        this.phaseOneR = [0, 0, 2, 1, 0, 0, 2, 1, 2, 0];
    }

    InitPhaseThree(){
        console.log("phase3");
        this.phaseOneL = [2, 0, 2, 0, 1, 0, 2, 0, 2, 0];
        this.phaseOneM = [0, 2, 1, 0, 0, 0, 0, 2, 1, 0];
        this.phaseOneR = [1, 0, 0, 1, 2, 2, 0, 0, 0, 1];
    }

    GenerateRandomPattern(){
        console.log("generating");
        this.randomNum = Phaser.Math.Between(0, 2);

        if(this.randomNum == 0){
            this.InitPhaseOne();
        }else if(this.randomNum == 1){
            this.InitPhaseTwo();
        }else{
            this.InitPhaseThree();
        }
    }

}
