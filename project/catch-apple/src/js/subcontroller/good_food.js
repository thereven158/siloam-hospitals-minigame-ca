import ScreenUtility from "../module/screen/screen_utility";

export default class GoodFood {
        /** @param {Phaser.Scene} scene */
    constructor(scene){
        // super(scene, x, y, 'good');

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.InitData();
    }

    InitData(){
        this.goodStuff = [ 'good', 'good2', 'good3', 'good4', 'good5'];
    }

    SpawnFood(x, y){
        this.RandomTexture();
        this.fruit = this.scene.physics.add.image(x, y, this.goodStuff[this.rand]);
        this.fruit.displayWidth = this.ScreenUtility.GameWidth * 0.15;
        this.fruit.displayHeight = this.fruit.displayWidth;
        this.SetFallingSpeed(500);
    }

    RandomTexture(){
        this.rand = Phaser.Math.Between(0, 4);
    }

    SetFallingSpeed(speed){
        this.fruit.setVelocityY(speed);
    }

    Destroy(){
        this.fruit.destroy();
    }
}
