import Phaser from 'phaser'
import Button from '../../module/objects/button';
import Image from '../../module/objects/image';
import Text from '../../module/objects/text';
import ScreenUtility from '../../module/screen/screen_utility';

export default class AdsView extends Phaser.GameObjects.Container{
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
            "ADS", 
            { align:'center', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(90);
        this.TopText.setPosition(this.ContentContainer.x - this.ContentContainer.displayWidth * 0.4, this.ContentContainer.y - this.ContentContainer.displayHeight * 0.5 - this.TopText.displayHeight);
        this.MainGroup.add(this.TopText);

        this.BtnSkip = new Button (this.scene, 0, 0, 'btn_skip');
        this.BtnSkip.setPosition(this.ContentContainer.displayWidth * 1.025, this.TopText.y);
        this.MainGroup.add(this.BtnSkip);

        this.SkipTxt = new Text(this.scene, 0, 0, 
            "Skip", 
            { align:'center', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(50);
        this.SkipTxt.setPosition(this.BtnSkip.x * 0.95, this.BtnSkip.y);
        this.MainGroup.add(this.SkipTxt);

        // this.ContentText = new Text(this.scene, 0, 0, 
        //     "Swipe layar ke kiri atau kanan untuk mengendalikan Debby ke kiri atau kanan", 
        //     { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
        //     .setFontSizeRS(40);
        // this.ContentText.setPosition(this.ContentContainer.x, this.TitleText.y * 1.15);
        // this.ContentText.setWordWrapWidth(this.ContentContainer.displayWidth);
        // this.MainGroup.add(this.ContentText);

        this.videoAds = this.scene.add.video(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'cusotm');
        this.videoAds.setDisplaySize(this.ContentContainer.displayWidth, this.ContentContainer.displayHeight * 0.7);
        this.videoAds.play(true);
        this.MainGroup.add(this.videoAds);
        
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

    OnClickSkip(event){
        this.BtnSkip.onClick(event);
    }
    
}