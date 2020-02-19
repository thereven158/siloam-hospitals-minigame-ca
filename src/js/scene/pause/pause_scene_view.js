import PauseSceneController from "./pause_scene_controller";

import Button from '../../module/objects/button';
import Image from '../../module/objects/image';
import Text from '../../module/objects/text';

export default class PauseSceneView {
    /** @param {PauseSceneController} scene */
    constructor(scene){
        this.scene = scene;
        this.ScreenUtility = scene.ScreenUtility;

        this.width = this.ScreenUtility.GameWidth;
        this.height = this.ScreenUtility.GameHeight;
        this.dwidth = this.ScreenUtility.DefaultWidth;
        this.dheight = this.ScreenUtility.DefaultHeight;
        
        this.GetResolution();
    }

    GetResolution(){
        this.resolution = this.width/this.height;
        if(navigator.userAgent.match(/iPhone|iPad|iPod/i)){
            this.iPhone = true;
        }
        console.log(this.width);
        console.log(this.height);
        console.log(this.resolution);
    }

    /** @return {PauseSceneView} */
    create = ()=>{

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

        this.Blackground = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'bg_black').setInteractive();
		this.Blackground.setDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
        this.Blackground.setAlpha(0.5);

        this.ContentContainer = new Image(this.scene, this.ScreenUtility.CenterX , this.ScreenUtility.CenterY, 'small_container');

        let contentWidth = (this.ScreenUtility.GameWidth * 0.6);
        let maxHeight = contentWidth * (this.ContentContainer.height / this.ContentContainer.width);
        let contentHeight = (this.ScreenUtility.GameHeight < (maxHeight * 1.1) ) ? this.ScreenUtility.GameHeight * 0.8 : maxHeight;

        this.ContentContainer.displayWidth = contentWidth;
        this.ContentContainer.displayHeight = contentHeight;

        this.TopText = new Text(this.scene, 0, 0, 
            "PAUSED", 
            { align:'center', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(90);
        this.TopText.setPosition(this.ContentContainer.x - this.ContentContainer.displayWidth * 0.22, this.ContentContainer.y - this.ContentContainer.displayHeight * 0.45 - this.TopText.displayHeight);
        
        this.BtnClose = new Button (this.scene, 0, 0, 'btn_close');
        this.BtnClose.setPosition(this.ContentContainer.displayWidth * 1.235, this.TopText.y);
        this.BtnClose.setPressedTexture('btn_close_pressed');
        
        this.BtnResume = new Button (this.scene, 0, 0, 'btn_normal');
        this.BtnResume.setPosition(this.ContentContainer.x, this.ContentContainer.y * 0.9);
        this.BtnResume.setPressedTexture('btn_pressed');

        this.IconResume = new Image (this.scene, 0, 0, 'icon_play_pressed');
        this.IconResume.setPosition(this.BtnResume.x * 0.65, this.BtnResume.y);
        this.IconResume.setDisplayWidth(this.IconResume.displayWidth, true);
        
        this.TxtResume = new Text(this.scene, 0, 0, 
            "RESUME", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(60);
        this.TxtResume.setPosition(this.BtnResume.x * 1.1, this.BtnResume.y);
        
        this.BtnMainmenu = new Button (this.scene, 0, 0, 'btn_normal');
        this.BtnMainmenu.setPressedTexture('btn_pressed');
        this.BtnMainmenu.setPosition(this.ContentContainer.x, this.ContentContainer.y * 1.1);

        this.IconMainmenu = new Image (this.scene, 0, 0, 'icon_mainmenu');
        this.IconMainmenu.setPosition(this.BtnMainmenu.x * 0.65, this.BtnMainmenu.y);
        this.IconMainmenu.setDisplayWidth(this.IconMainmenu.displayWidth, true);
       
        this.TxtMenu = new Text(this.scene, 0, 0, 
            "MAIN MENU", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(60);
        this.TxtMenu.setPosition(this.BtnMainmenu.x * 1.1, this.BtnMainmenu.y);
        
        if(this.resolution >= 2/3){
            this.BtnResume.setPosition(this.ContentContainer.x, this.ContentContainer.y * 0.85);
            this.BtnResume.setPosition(this.ContentContainer.x, this.ContentContainer.y * 0.9);
            this.IconResume.setPosition(this.BtnResume.x * 0.65, this.BtnResume.y);

            this.BtnMainmenu.setPosition(this.ContentContainer.x, this.ContentContainer.y * 1.15);
            this.IconMainmenu.setPosition(this.BtnMainmenu.x * 0.65, this.BtnMainmenu.y);
            this.TxtMenu.setPosition(this.BtnMainmenu.x * 1.1, this.BtnMainmenu.y);
        }

        return this;
    }

    OnClickResume = (event) =>{
        this.BtnResume.onClick(event);
    }

    OnClickMainmenu = (event) =>{
        this.BtnMainmenu.onClick(event);
    }

    OnClickClose = (event) =>{
        this.BtnClose.onClick(event);
    }
};
