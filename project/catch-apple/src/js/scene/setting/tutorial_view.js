import Phaser from 'phaser'
import Button from '../../module/objects/button';
import Image from '../../module/objects/image';
import Text from '../../module/objects/text';
import ScreenUtility from '../../module/screen/screen_utility';

export default class TutorialView extends Phaser.GameObjects.Container{
/** @param {Phaser.scene} scene */
	constructor(scene) {
        super(scene);

        this.scene = scene;
        /** @type {ScreenUtility}  */
        this.ScreenUtility = scene.ScreenUtility;

        scene.add.existing(this);  
        
        this.width = this.ScreenUtility.GameWidth;
        this.height = this.ScreenUtility.GameHeight;
        this.dwidth = this.ScreenUtility.DefaultWidth;
        this.dheight = this.ScreenUtility.DefaultHeight;
        // this.scale = this.ScreenUtility.ScalePercentage;

        this.GetResolution();
        this.InitView();
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

    InitView(){
        this.setDepth(10);

        this.Background = new Image (this.scene, 
            this.ScreenUtility.CenterX, 
            this.ScreenUtility.CenterY, 
            'background_menu');
          this.Background.setDisplaySize(this.ScreenUtility.GameWidth, 
            this.ScreenUtility.GameHeight);
        this.add(this.Background);

        this.BgTree = new Image (this.scene, 
            this.ScreenUtility.CenterX, 
            this.ScreenUtility.GameHeight, 
            'background_tree');
        this.add(this.BgTree);

        this.Blackground = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'bg_black').setInteractive();
		this.Blackground.setDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
        this.Blackground.setAlpha(0.5);
        this.add(this.Blackground);

        this.MainGroup = this.scene.add.container(0,0);
        this.add(this.MainGroup);

        this.ContentContainer = new Image(this.scene, this.ScreenUtility.CenterX , this.ScreenUtility.CenterY, 'bg_white');

        let contentWidth = (this.ScreenUtility.GameWidth * 0.7);
        let maxHeight = contentWidth * (this.ContentContainer.height / this.ContentContainer.width);
        let contentHeight = (this.ScreenUtility.GameHeight < (maxHeight) ) ? this.ScreenUtility.GameHeight * 0.8 : maxHeight;
        
        this.ContentContainer.displayWidth = contentWidth;
        this.ContentContainer.displayHeight = contentHeight;
        this.MainGroup.add(this.ContentContainer);

        this.TopText = new Text(this.scene, 0, 0, 
            "TUTORIAL", 
            { align:'center', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(90);
        this.TopText.setPosition(this.ContentContainer.x - this.ContentContainer.displayWidth * 0.2, this.ContentContainer.y - this.ContentContainer.displayHeight * 0.5 - this.TopText.displayHeight);
        this.MainGroup.add(this.TopText);

        this.BtnClose = new Button (this.scene, 0, 0, 'btn_close');
        this.BtnClose.setPosition(this.ContentContainer.displayWidth * 1.15, this.TopText.y);
        this.BtnClose.setPressedTexture('btn_close_pressed');
        this.MainGroup.add(this.BtnClose);

        this.ImageContent = new Image(this.scene, this.ContentContainer.x, this.ContentContainer.y, 'tutorial');
        this.ImageContent.setDisplayWidth(this.ContentContainer.displayWidth);
        this.ImageContent.setPosition(this.ContentContainer.x, this.ContentContainer.y * 0.65);
        this.MainGroup.add(this.ImageContent);

        this.TxtTitle = new Text(this.scene, 0, 0, 
            "DEBBY CONTROL", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(60);
        this.TxtTitle.setPosition(this.ContentContainer.x, this.ContentContainer.y * 0.97);
        this.MainGroup.add(this.TxtTitle);

        this.TxtContent = new Text(this.scene, 0, 0, 
            "Swipe the screen to move Dabby to right or left.", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.TxtContent.setPosition(this.ContentContainer.x, this.TxtTitle.y * 1.1);
        this.TxtContent.setWordWrapWidth(contentWidth);
        this.MainGroup.add(this.TxtContent);

        this.TxtContent2 = new Text(this.scene, 0, 0, 
            "", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.TxtContent2.setPosition(this.ContentContainer.x, this.TxtContent.y * 1.15);
        this.TxtContent2.setWordWrapWidth(contentWidth);
        this.MainGroup.add(this.TxtContent2);

        this.BtnNext = new Button (this.scene, 0, 0, 'btn_normal');
        this.BtnNext.setPosition(this.ContentContainer.x, this.TxtContent2.y * 1.15);
        this.BtnNext.setPressedTexture('btn_pressed');
        this.BtnNext.Image.setScale(this.ScreenUtility.ScalePercentage, this.ScreenUtility.ScalePercentage);
        this.MainGroup.add(this.BtnNext);

        this.IconNext = new Image (this.scene, 0, 0, 'icon_next');
        this.IconNext.setPosition(this.BtnNext.x * 0.65, this.BtnNext.y);
        this.MainGroup.add(this.IconNext);

        this.TxtBtn = new Text(this.scene, 0, 0, 
            "NEXT", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(70);
        this.TxtBtn.setPosition(this.BtnNext.x * 1.05, this.BtnNext.y);
        this.MainGroup.add(this.TxtBtn);

        if(this.resolution >= 0.75){
            this.TopText.setPosition(
                this.ContentContainer.x - this.ContentContainer.displayWidth * 0.2, 
                this.ContentContainer.y - this.ContentContainer.displayHeight * 0.5
            );

            this.BtnClose.setPosition(this.ContentContainer.displayWidth * 1.15, this.TopText.y);
            this.ContentContainer.displayHeight = contentHeight * 0.8;

            this.ImageContent.setDisplayHeight(this.ImageContent.displayHeight * 0.8);

            this.TxtTitle.setPosition(this.ContentContainer.x, this.ImageContent.y * 1.425);
            this.TxtContent.setPosition(this.ContentContainer.x, this.TxtTitle.y * 1.1);

            this.TxtContent.setWordWrapWidth(contentWidth * 0.7);
            this.TxtContent2.setWordWrapWidth(contentWidth * 0.7);

            this.BtnNext.setPosition(this.ContentContainer.x, this.TxtContent2.y * 1.175);
            this.IconNext.setPosition(this.BtnNext.x * 0.65, this.BtnNext.y);
            this.TxtBtn.setPosition(this.BtnNext.x * 1.05, this.BtnNext.y);
            console.log("check 1");
        }

        if(this.iPhone == true){
            console.log("check 2");
            if(window.devicePixelRatio == 2){
                    this.TxtTitle.setPosition(this.ContentContainer.x, this.ImageContent.y * 1.425);
                    this.TxtContent.setPosition(this.ContentContainer.x, this.TxtTitle.y * 1.15);

                if(this.resolution == 2/3){
                    this.ImageContent.setPosition(this.ContentContainer.x, this.ContentContainer.y * 0.6);

                    this.BtnNext.setPosition(this.ContentContainer.x, this.TxtContent2.y * 1.175);
                    this.IconNext.setPosition(this.BtnNext.x * 0.65, this.BtnNext.y);
                    this.TxtBtn.setPosition(this.BtnNext.x * 1.05, this.BtnNext.y);
                }else if(this.resolution >= 3/4){
                    this.TxtTitle.setPosition(this.ContentContainer.x, this.ImageContent.y * 1.425);
                    this.TxtContent.setPosition(this.ContentContainer.x, this.TxtTitle.y * 1.15);

                    this.BtnNext.setPosition(this.ContentContainer.x, this.TxtContent2.y * 1.2);
                    this.IconNext.setPosition(this.BtnNext.x * 0.65, this.BtnNext.y);
                    this.TxtBtn.setPosition(this.BtnNext.x * 1.05, this.BtnNext.y);
                }
                this.TxtContent.setWordWrapWidth(contentWidth * 1.3);
                this.TxtContent2.setWordWrapWidth(contentWidth * 1.3);
            }else if(window.devicePixelRatio == 3){
                this.TxtTitle.setPosition(this.ContentContainer.x, this.ImageContent.y * 1.4);

                if(this.resolution < 9/16){
                    this.ImageContent.setPosition(this.ContentContainer.x, this.ContentContainer.y * 0.7);
                    this.TxtTitle.setPosition(this.ContentContainer.x, this.ImageContent.y * 1.325);
                    
                    this.BtnNext.setPosition(this.ContentContainer.x, this.TxtContent2.y * 1.15);
                    this.IconNext.setPosition(this.BtnNext.x * 0.65, this.BtnNext.y);
                    this.TxtBtn.setPosition(this.BtnNext.x * 1.05, this.BtnNext.y);
                }
                this.TxtContent.setWordWrapWidth(contentWidth * 0.8);
                this.TxtContent2.setWordWrapWidth(contentWidth * 0.8);
            }
        }
    }

    Open(){
        this.setVisible(true);
        this.MainGroup.y = this.ScreenUtility.GameHeight
        this.MainGroup.alpha = 0;
        this.scene.tweens.add({
            targets:  this.MainGroup,
            y: 0,
            alpha: 1,
            duration: 600,
            ease: Phaser.Math.Easing.Back.Out,
        });	
    }

    Close(){
        this.MainGroup.alpha = 1;
        this.scene.tweens.add({
            targets:  this.MainGroup,
            y: 0,
            alpha: 0,
            duration: 600,
            ease: Phaser.Math.Easing.Back.Out,
        });
        this.Blackground.alpha = 0;
        this.Background.alpha = 0;
    }

    SetDescription(txtTitle, txtContent, txtContent2, textureImgContent, textureBtn, textureIconBtn, txtBtn){
        this.TxtTitle.setText(txtTitle);
        this.TxtContent.setText(txtContent);
        this.TxtContent2.setText(txtContent2);
        this.ImageContent.setTexture(textureImgContent);
        this.BtnNext.Image.setTexture(textureBtn);
        this.IconNext.setTexture(textureIconBtn);
        this.TxtBtn.setText(txtBtn);
    }

    OnClickNext(event){
        this.BtnNext.onClick(event);
    }

    OnClickClose(event){
        this.BtnClose.onClick(event);
    }
    
}