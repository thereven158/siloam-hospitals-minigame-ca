import ScreenUtility from "../module/screen/screen_utility";
import Sprite from '../module/objects/sprite';

export default class Apple extends Sprite{
        /** @param {Phaser.Scene} scene */
    constructor(scene, x, y, texture, depth){

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

        this.x = x;
        this.y = y;
        this.Depth = depth;
        this.Texture = texture;
    }
}
