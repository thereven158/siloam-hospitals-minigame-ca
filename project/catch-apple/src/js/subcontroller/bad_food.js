import ScreenUtility from "../module/screen/screen_utility";

export default class BadFood{
        /** @param {Phaser.Scene} scene */
    constructor(scene){
        // super(scene, x, y, 'good');

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.InitData();
    }

    InitData(){
        this.badStuff = [ 'bad', 'bad2', 'bad3', 'bad4', 'bad5'];
    }

    SpawnFood(x, y){
        this.RandomTexture();
        this.food = this.scene.physics.add.image(x, y, this.badStuff[this.rand]);
        this.food.displayWidth = this.ScreenUtility.GameWidth * 0.15;
        this.food.displayHeight = this.food.displayWidth;
        this.SetFallingSpeed(500);
    }

    RandomTexture(){
        this.rand = Phaser.Math.Between(0, 4);
    }

    SetFallingSpeed(speed){
        this.food.setVelocityY(speed);
    }

    Destroy(){
        this.food.destroy();
    }
}
