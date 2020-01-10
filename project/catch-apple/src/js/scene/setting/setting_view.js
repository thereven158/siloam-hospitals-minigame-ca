import Phaser from 'phaser'
import Button from '../../module/objects/button';
import Image from '../../module/objects/image';
import Text from '../../module/objects/text';
import ScreenUtility from '../../module/screen/screen_utility';

export default class SettingView extends Phaser.GameObjects.Container{
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

        // this.topCloud = new Image(this.scene, 0, 0, 'window-top');
        // this.topCloud.setPosition(this.ScreenUtility.CenterX, 0);
        // this.topCloud.setDisplaySize(this.topCloud.displayWidth, this.topCloud.displayHeight * 4);
        // this.add(this.topCloud);

        this.MainGroup = this.scene.add.container(0,0);
        this.add(this.MainGroup);

        this.ContentContainer = new Image(this.scene, this.ScreenUtility.CenterX , this.ScreenUtility.CenterY, 'small_container');

        let contentWidth = (this.ScreenUtility.GameWidth * 0.6);
        let maxHeight = contentWidth * (this.ContentContainer.height / this.ContentContainer.width);
        let contentHeight = (this.ScreenUtility.GameHeight < (maxHeight * 1.1) ) ? this.ScreenUtility.GameHeight * 0.8 : maxHeight;

        this.ContentContainer.displayWidth = contentWidth;
        this.ContentContainer.displayHeight = contentHeight;
        this.MainGroup.add(this.ContentContainer);

        this.TopText = new Text(this.scene, 0, 0, 
            "SETTINGS", 
            { align:'center', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(90);
        this.TopText.setPosition(this.ContentContainer.x - this.ContentContainer.displayWidth * 0.17, this.ContentContainer.y - this.ContentContainer.displayHeight * 0.45 - this.TopText.displayHeight);
        this.MainGroup.add(this.TopText);

        this.BtnClose = new Button (this.scene, 0, 0, 'btn_close');
        this.BtnClose.setPosition(this.ContentContainer.displayWidth * 1.235, this.TopText.y);
        this.MainGroup.add(this.BtnClose);

        this.BtnMusic = new Button (this.scene, 0, 0, 'sound_on');
        this.BtnMusic.setPosition(this.ContentContainer.x * 1.3, this.ContentContainer.y * 0.9);
        this.BtnMusic.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8);
        this.MainGroup.add(this.BtnMusic);

        this.TxtMusic = new Text(this.scene, 0, 0, 
            "MUSIC", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(70);
        this.TxtMusic.setPosition(this.ContentContainer.x * 0.7, this.ContentContainer.y * 0.9);
        this.MainGroup.add(this.TxtMusic);

        this.BtnSfx = new Button (this.scene, 0, 0, 'sound_on');
        this.BtnSfx.setPosition(this.ContentContainer.x * 1.3, this.ContentContainer.y * 1.1);
        this.BtnSfx.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8);
        this.MainGroup.add(this.BtnSfx);

        this.TxtSfx = new Text(this.scene, 0, 0, 
            "SFX", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(70);
        this.TxtSfx.setPosition(this.ContentContainer.x * 0.625, this.ContentContainer.y * 1.1);
        this.MainGroup.add(this.TxtSfx);
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

        // this.scene.tweens.add({
        //     targets:  this.topCloud,
        //     y: this.ScreenUtility.CenterY * 0.5,
        //     alpha: 1,
        //     duration: 1000,
        //     ease: Phaser.Math.Easing.Back.Out,
        // });	
    }

    Close(){
        this.MainGroup.alpha = 1;
        this.scene.tweens.add({
            targets:  this.MainGroup,
            y: 0,
            alpha: 0,
            duration: 500,
            ease: Phaser.Math.Easing.Back.Out,
        });
        this.Blackground.alpha = 0;
        this.Background.alpha = 0;
    }

    OnClickClose(event){
        this.BtnClose.onClick(event);
    }

    OnClickMusic(event){
        this.BtnMusic.onClick(event);
    }
}