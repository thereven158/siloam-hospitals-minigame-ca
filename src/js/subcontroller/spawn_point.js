import ScreenUtility from "../module/screen/screen_utility";

export default class SpawnPoint {

    /** @param {Phaser.Scene} scene */
    constructor(scene){
        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

    }

    create(){
        this.pointLeftX = this.ScreenUtility.GameWidth * 0.5 * 0.5;

        this.pointY = 0;
        
        this.pointMidX = this.ScreenUtility.CenterX;

        this.pointRightX = this.ScreenUtility.CenterX + this.pointLeftX;
    }

}
