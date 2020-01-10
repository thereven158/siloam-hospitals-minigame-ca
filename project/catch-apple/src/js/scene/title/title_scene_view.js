import TitleSceneController from "./title_scene_controller";

import Button from "../../module/objects/button";
import Image from '../../module/objects/image';
import Text from '../../module/objects/text';

export default class TitleSceneView {
    /** @param {TitleSceneController} scene */
    constructor(scene){
        this.scene = scene;
        this.ScreenUtility = scene.ScreenUtility;

    }

    /** @return {TitleSceneView} */
    create = ()=>{
        this.initScreen();
        
        return this;
    }

    initScreen = ()=>{
        // this.logo = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'logo');

        this.Background = new Image (this.scene, 
            this.ScreenUtility.CenterX, 
            this.ScreenUtility.CenterY, 
            'background_menu');
          this.Background.setDisplaySize(this.ScreenUtility.GameWidth, 
            this.ScreenUtility.GameHeight);

        this.bgTree = new Image (this.scene, 
            this.ScreenUtility.CenterX, 
            this.ScreenUtility.GameHeight, 
            'background_tree');

        this.bgCloud = new Image (this.scene, 
            this.ScreenUtility.GameWidth, 
            this.ScreenUtility.CenterY * 0.7, 
            'background_cloud');
        this.bgCloud.setScale(this.ScreenUtility.ScalePercentage * 1.25);

        this.bgCloud2 = new Image (this.scene, 
            0, 
            this.ScreenUtility.CenterY * 0.5, 
            'background_cloud');
        this.bgCloud2.setScale(this.ScreenUtility.ScalePercentage * 1.25);
        this.bgCloud2.setFlipX(true);

        this.mainPicture = new Image (this.scene, 
            this.ScreenUtility.CenterX, 
            this.ScreenUtility.CenterY - this.ScreenUtility.CenterY * 0.5, 
            'main_picture');
        this.mainPicture.setDisplayWidth(this.ScreenUtility.GameWidth * 0.6, true);

        this.buttonPlay = new Button(this.scene, this.ScreenUtility.CenterX,  this.mainPicture.y  + (this.ScreenUtility.CenterY + this.mainPicture.displayHeight * 0.5) * 0.5, 'btn_play');
        this.buttonPlay.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8);

        this.buttonTutorial = new Button(this.scene, this.ScreenUtility.CenterX,  this.buttonPlay.y  + (this.ScreenUtility.CenterY + this.buttonPlay.displayHeight * 0.5) * 0.25, 'btn_tutorial');
        this.buttonTutorial.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8);

        this.buttonLeaderboard = new Button(this.scene, this.ScreenUtility.CenterX,  this.buttonTutorial.y  + (this.ScreenUtility.CenterY + this.buttonTutorial.displayHeight * 0.5) * 0.25, 'btn_leaderboard');
        this.buttonLeaderboard.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8);

        this.buttonSetting = new Button(this.scene, this.ScreenUtility.GameWidth * 0.1, this.ScreenUtility.GameHeight * 0.1, 'btn_setting');

        // this.scene.tweens.add({
        //     targets:  this.mainPicture,
        //     y: 0,
        //     alpha: 1,
        //     duration: 600,
        //     ease: Phaser.Math.Easing.Back.Out,
		// });	
    }

    OnClickPlay = (event) =>{
        this.buttonPlay.onClick(event);
    }

    OnCLickTutorial = (event) =>{
        this.buttonTutorial.onClick(event);
    }

    OnCLickSetting = (event) =>{
        this.buttonSetting.onClick(event);
    }
};
