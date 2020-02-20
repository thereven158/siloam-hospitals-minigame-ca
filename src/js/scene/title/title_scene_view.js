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
        this.Background = new Image (this.scene, 
            this.ScreenUtility.CenterX, 
            this.ScreenUtility.CenterY, 
            'background_menu');
          this.Background.setDisplaySize(this.ScreenUtility.GameWidth, 
            this.ScreenUtility.GameHeight);

        this.BgTree = new Image (this.scene, 
            this.ScreenUtility.CenterX, 
            this.ScreenUtility.GameHeight, 
            'background_tree');
        this.BgTree.setDepth(0);

        this.BgCloud = new Image (this.scene, 
            this.ScreenUtility.GameWidth, 
            this.ScreenUtility.CenterY * 0.7, 
            'background_cloud');
        this.BgCloud.setScale(this.ScreenUtility.ScalePercentage * 1.25);

        this.BgCloud2 = new Image (this.scene, 
            0, 
            this.ScreenUtility.CenterY * 0.5, 
            'background_cloud');
        this.BgCloud2.setScale(this.ScreenUtility.ScalePercentage * 1.25);
        this.BgCloud2.setFlipX(true);

        this.MainPicture = new Image (this.scene, 
            this.ScreenUtility.CenterX, 
            this.ScreenUtility.CenterY - this.ScreenUtility.CenterY * 0.5, 
            'main_picture');
        this.MainPicture.setDisplayWidth(this.ScreenUtility.GameWidth * 0.6, true);

        this.BtnPlay = new Button(
            this.scene, this.ScreenUtility.CenterX,  
            this.MainPicture.y  + (this.ScreenUtility.CenterY + this.MainPicture.displayHeight * 0.5) * 0.5, 'btn_play_pressed');
        this.BtnPlay.setPressedTexture('btn_pressed');

        this.IconPlay = new Image (this.scene, 0, 0, 'icon_play');
        this.IconPlay.setPosition(this.BtnPlay.x * 0.65, this.BtnPlay.y);
        this.IconPlay.setDisplayWidth(this.IconPlay.displayWidth, true);

        this.PlayTxt = new Text(this.scene, 0, 0, 
            "PLAY", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.PlayTxt.setPosition(this.BtnPlay.x * 1.1, this.BtnPlay.y);

        this.BtnTutorial = new Button(
            this.scene, this.ScreenUtility.CenterX,  
            this.BtnPlay.y  + (this.ScreenUtility.CenterY + this.BtnPlay.displayHeight * 0.5) * 0.275, 'btn_normal');
        this.BtnTutorial.setPressedTexture('btn_pressed');

        this.IconTutorial = new Image (this.scene, 0, 0, 'icon_tutorial');
        this.IconTutorial.setPosition(this.BtnTutorial.x * 0.65, this.BtnTutorial.y);
        this.IconTutorial.setDisplayWidth(this.IconTutorial.displayWidth, true);

        this.TxtTutorial = new Text(this.scene, 0, 0, 
            "TUTORIAL", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.TxtTutorial.setPosition(this.BtnTutorial.x * 1.1, this.BtnTutorial.y);

        this.BtnLeaderboard = new Button(
            this.scene, this.ScreenUtility.CenterX,  
            this.BtnTutorial.y  + (this.ScreenUtility.CenterY + this.BtnTutorial.displayHeight * 0.5) * 0.275, 'btn_normal');
        this.BtnLeaderboard.setPressedTexture('btn_pressed');

        this.IconLeaderboard = new Image (this.scene, 0, 0, 'icon_leaderboard');
        this.IconLeaderboard.setPosition(this.BtnLeaderboard.x * 0.65, this.BtnLeaderboard.y);
        this.IconLeaderboard.setDisplayWidth(this.IconLeaderboard.displayWidth, true);

        this.TxtLeaderboard = new Text(this.scene, 0, 0, 
            "LEADERBOARD", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.TxtLeaderboard.setPosition(this.BtnLeaderboard.x * 1.1, this.BtnLeaderboard.y);

        this.BtnSetting = new Button(this.scene, this.ScreenUtility.GameWidth * 0.1, this.ScreenUtility.GameHeight * 0.05, 'btn_setting');
        this.BtnSetting.setPressedTexture('btn_setting_pressed');

    }

    OnClickPlay = (event) =>{
        this.BtnPlay.onClick(event);
    }

    OnCLickTutorial = (event) =>{
        this.BtnTutorial.onClick(event);
    }

    OnCLickSetting = (event) =>{
        this.BtnSetting.onClick(event);
    }

    OnClickLeaderboard = (event) =>{
        this.BtnLeaderboard.onClick(event);
    }
};
