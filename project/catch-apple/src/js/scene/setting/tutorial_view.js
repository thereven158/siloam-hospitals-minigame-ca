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

        this.InitView();
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

        this.bgTree = new Image (this.scene, 
            this.ScreenUtility.CenterX, 
            this.ScreenUtility.GameHeight, 
            'background_tree');
        this.add(this.bgTree);

        this.Blackground = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'bg_black').setInteractive();
		this.Blackground.setDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
        this.Blackground.setAlpha(0.5);
        this.add(this.Blackground);

        this.MainGroup = this.scene.add.container(0,0);
        this.add(this.MainGroup);

        this.ContentContainer = new Image(this.scene, this.ScreenUtility.CenterX , this.ScreenUtility.CenterY, 'bg_white');

        let contentWidth = (this.ScreenUtility.GameWidth * 0.7);
        let maxHeight = contentWidth * (this.ContentContainer.height / this.ContentContainer.width);
        let contentHeight = (this.ScreenUtility.GameHeight < (maxHeight * 1.1) ) ? this.ScreenUtility.GameHeight * 0.7 : maxHeight;

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
        this.MainGroup.add(this.BtnClose);

        this.ImageContent = new Image(this.scene, this.ContentContainer.x, this.ContentContainer.y, 'tutorial');
        this.ImageContent.setDisplayWidth(this.ContentContainer.displayWidth);
        this.ImageContent.setPosition(this.ContentContainer.x, this.ContentContainer.y * 0.65);
        this.MainGroup.add(this.ImageContent);

        this.TitleText = new Text(this.scene, 0, 0, 
            "DEBBY CONTROL", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(60);
        this.TitleText.setPosition(this.ContentContainer.x, this.ImageContent.y * 1.45);
        this.MainGroup.add(this.TitleText);

        this.ContentText = new Text(this.scene, 0, 0, 
            "Swipe layar ke kiri atau kanan untuk mengendalikan Debby ke kiri atau kanan", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.ContentText.setPosition(this.ContentContainer.x, this.TitleText.y * 1.15);
        this.ContentText.setWordWrapWidth(this.ContentContainer.displayWidth);
        this.MainGroup.add(this.ContentText);

        this.ContentText2 = new Text(this.scene, 0, 0, 
            "", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.ContentText2.setPosition(this.ContentContainer.x, this.ContentText.y * 1.2);
        this.ContentText2.setWordWrapWidth(this.ContentContainer.displayWidth);
        this.MainGroup.add(this.ContentText2);

        this.BtnNext = new Button (this.scene, 0, 0, 'btn_normal');
        this.BtnNext.setPosition(this.ContentContainer.x, this.ContentContainer.y * 1.5);
        this.BtnNext.setPressedTexture('btn_pressed');
        this.BtnNext.Image.setScale(this.ScreenUtility.ScalePercentage, this.ScreenUtility.ScalePercentage);
        this.MainGroup.add(this.BtnNext);

        this.IconNext = new Image (this.scene, 0, 0, 'icon_next');
        this.IconNext.setPosition(this.BtnNext.x * 0.65, this.BtnNext.y);
        this.MainGroup.add(this.IconNext);

        this.BtnTxt = new Text(this.scene, 0, 0, 
            "NEXT", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(70);
        this.BtnTxt.setPosition(this.BtnNext.x * 1.05, this.BtnNext.y);
        this.MainGroup.add(this.BtnTxt);
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

    OnClickNext(event){
        this.BtnNext.onClick(event);
    }

    OnClickClose(event){
        this.BtnClose.onClick(event);
    }
    
}