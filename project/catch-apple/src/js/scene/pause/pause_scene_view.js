import PauseSceneController from "./pause_scene_controller";

import Button from "../../module/objects/button";
import Image from '../../module/objects/image';
import Text from '../../module/objects/text';

export default class PauseSceneView {
    /** @param {PauseSceneController} scene */
    constructor(scene){
        this.scene = scene;
        this.ScreenUtility = scene.ScreenUtility;

    }

    /** @return {PauseSceneView} */
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

        this.buttonPlay = new Button(this.scene, this.ScreenUtility.CenterX,  this.mainPicture.y  + (this.ScreenUtility.CenterY + this.mainPicture.displayHeight * 0.5) * 0.5, 'btn_play_pressed');
        this.buttonPlay.setPressedTexture('btn_pressed');

        this.IconPlay = new Image (this.scene, 0, 0, 'icon_play');
        this.IconPlay.setPosition(this.buttonPlay.x * 0.65, this.buttonPlay.y);
        this.IconPlay.setDisplayWidth(this.IconPlay.displayWidth, true);

        this.PlayTxt = new Text(this.scene, 0, 0, 
            "PLAY", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.PlayTxt.setPosition(this.buttonPlay.x * 1.1, this.buttonPlay.y);

        this.buttonTutorial = new Button(this.scene, this.ScreenUtility.CenterX,  this.buttonPlay.y  + (this.ScreenUtility.CenterY + this.buttonPlay.displayHeight * 0.5) * 0.25, 'btn_normal');
        this.buttonTutorial.setPressedTexture('btn_pressed');

        this.IconTutorial = new Image (this.scene, 0, 0, 'icon_tutorial');
        this.IconTutorial.setPosition(this.buttonTutorial.x * 0.65, this.buttonTutorial.y);
        this.IconTutorial.setDisplayWidth(this.IconTutorial.displayWidth, true);

        this.TutorialTxt = new Text(this.scene, 0, 0, 
            "TUTORIAL", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.TutorialTxt.setPosition(this.buttonTutorial.x * 1.1, this.buttonTutorial.y);

        this.buttonLeaderboard = new Button(this.scene, this.ScreenUtility.CenterX,  this.buttonTutorial.y  + (this.ScreenUtility.CenterY + this.buttonTutorial.displayHeight * 0.5) * 0.25, 'btn_normal');
        this.buttonLeaderboard.setPressedTexture('btn_pressed');

        this.IconLeaderboard = new Image (this.scene, 0, 0, 'icon_leaderboard');
        this.IconLeaderboard.setPosition(this.buttonLeaderboard.x * 0.65, this.buttonLeaderboard.y);
        this.IconLeaderboard.setDisplayWidth(this.IconLeaderboard.displayWidth, true);

        this.LeaderboardTxt = new Text(this.scene, 0, 0, 
            "LEADERBOARD", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.LeaderboardTxt.setPosition(this.buttonLeaderboard.x * 1.1, this.buttonLeaderboard.y);

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

    OnClickLeaderboard = (event) =>{
        this.buttonLeaderboard.onClick(event);
    }
};
