import ScreenUtility from "../screen/screen_utility";

export default class Sprite extends Phaser.GameObjects.Sprite{
/** 
    * @param {Phaser.Scene} scene 
    * @param {Number} x
    * @param {Number} y
    * @param {String} texture
    * @param {Number} frame
    */
    constructor(scene, x, y, texture, frame = 0){
        super(scene, x, y, texture, frame);

        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();
        this.ScalePercentage = this.ScreenUtility.ScalePercentage;

        /** @type {Number} */
        this.WidthAspectRatio = this.width / this.height;
        /** @type {Number} */
        this.HeightAspectRatio = this.height / this.width;

        this.scene.add.existing(this);
        this.setToResponsiveScale();
    }

    /** 
    * @param {Number} size
    */
    matchHeightToAspectRatio(size){
        this.displayHeight = size * this.HeightAspectRatio;
    }

    /** 
    * @param {Number} size
    */
    matchWidthToAspectRatio(size){
        this.displayWidth = size * this.WidthAspectRatio;
    }

    /** 
    * @param {Number} width
    * @param {Boolean} matchHeightToAspectRatio 
    */
    setDisplayWidth(width, matchHeightToAspectRatio = false){
        this.displayWidth = width;

        if(matchHeightToAspectRatio){
            this.matchHeightToAspectRatio(width);
        }
    }

    /** 
    * @param {Number} height
    * @param {Boolean} matchWidthToAspectRatio 
    */
    setDisplayHeight(height, matchWidthToAspectRatio = false){
        this.displayHeight = height;

        if(matchWidthToAspectRatio){
            this.matchWidthToAspectRatio(height);
        }
    }

    /** 
    * @param {Number} height
    * @param {Number} width 
    */
    setDisplaySize(width, height){
        this.displayWidth = width;
        this.displayHeight = height;
    }

    setToOriginalDisplaySize(){
        this.setDisplaySize(this.width, this.height);
    }

    /** @return {Phaser.GameObjects.Sprite} */
    setToResponsiveScale(percent = 1){
        this.setScale(this.ScalePercentage * percent);
        return this;
    }

    /** 
    * @param {Number} maxWidth
    * @param {Number} maxHeight 
    */
    setMaxPreferredDisplaySize = (maxWidth, maxHeight) =>{
        if(maxWidth * this.HeightAspectRatio > maxHeight){
            this.setDisplayHeight(maxHeight, true);
        }else{
            this.setDisplayWidth(maxWidth, true);
        }
    }
    
    /** 
    * @param {Number} minWidth
    * @param {Number} minHeight 
    */
    setMinPreferredDisplaySize = (minWidth, minHeight) =>{
        if(minWidth * this.HeightAspectRatio < minHeight){
            this.setDisplayHeight(minHeight, true);
        }else{
            this.setDisplayWidth(minWidth, true);
        }
    }

    resetScale(){
        this.setScale(1);
    }
}