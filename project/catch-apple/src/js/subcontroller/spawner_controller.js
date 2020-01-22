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

        this.InitPhaseOne();
        this.InitPhaseTwo();
        this.InitPhaseThree();
    }

    InitPhaseOne(){
        this.phaseOneL = [2, 1, 0, 0, 2, 1, 2, 0, 0, 2];
        this.phaseOneM = [0, 2, 0, 2, 0, 0, 0, 1, 0, 1];
        this.phaseOneR = [0, 0, 1, 0, 1, 2, 0, 0, 2, 0];
    }

    InitPhaseTwo(){
        this.phaseTwoL = [0, 1, 0, 0, 2, 0, 0, 2, 1, 2];
        this.phaseTwoM = [2, 0, 0, 2, 1, 1, 0, 0, 0, 0];
        this.phaseTwoR = [0, 0, 2, 1, 0, 0, 2, 1, 2, 0];
    }

    InitPhaseThree(){
        this.phaseThreeL = [2, 0, 2, 0, 1, 0, 2, 0, 2, 0];
        this.phaseThreeM = [0, 2, 1, 0, 0, 0, 0, 2, 1, 0];
        this.phaseThreeR = [1, 0, 0, 1, 2, 2, 0, 0, 0, 1];
    }

}
