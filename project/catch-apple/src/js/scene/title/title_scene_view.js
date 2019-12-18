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

        this.mainPicture = new Image (this.scene, 
            this.ScreenUtility.CenterX, 
            this.ScreenUtility.CenterY, 
            'main_picture');
        this.mainPicture.setDisplayWidth(this.ScreenUtility.GameWidth * 0.6, true);

        this.ButtonPlay = new Button(this.scene, this.ScreenUtility.CenterX,  this.mainPicture.y  + (this.ScreenUtility.CenterY + this.mainPicture.displayHeight * 0.5) * 0.5, 'btn_play');
        this.ButtonPlay.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8)

        this.textPlay = new Text(this.scene, this.ButtonPlay.x, this.ButtonPlay.y, "Play",
            { color: '#000000' })
            .setFontSizeRS(75);
        this.textPlay.setDepth(1);
    }

    OnClickPlay = (event) =>{
        this.ButtonPlay.onClick(event);
    }
};
