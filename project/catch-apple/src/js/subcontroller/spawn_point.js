import ScreenUtility from "../module/screen/screen_utility";

export default class SpawnPoint {

    /** @param {Phaser.Scene} scene */
    constructor(scene){
        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

    }

    create(){
        this.point1X = this.ScreenUtility.GameWidth * 0.5 * 0.5;

        this.point1Y = 0;
        
        this.point2X = this.ScreenUtility.CenterX;

        this.point3X = this.ScreenUtility.CenterX + this.point1X;
    }

}
