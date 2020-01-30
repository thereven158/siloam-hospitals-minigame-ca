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
        
        this.width = this.ScreenUtility.GameWidth;
        this.height = this.ScreenUtility.GameHeight;
        this.dwidth = this.ScreenUtility.DefaultWidth;
        this.dheight = this.ScreenUtility.DefaultHeight;
        
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

        let contentWidth = (this.ScreenUtility.GameWidth * 0.9);
        let maxHeight = contentWidth * (this.ContentContainer.height / this.ContentContainer.width);
        let contentHeight = (this.ScreenUtility.GameHeight < (maxHeight * 1.1) ) ? this.ScreenUtility.GameHeight * 0.7 : maxHeight * 0.6;

        this.ContentContainer.displayWidth = contentWidth;
        this.ContentContainer.displayHeight = contentHeight;
        this.MainGroup.add(this.ContentContainer);

        this.TxtTop = new Text(this.scene, 0, 0, 
            "ADS", 
            { align:'center', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(90);
        this.TxtTop.setPosition(this.ContentContainer.x - this.ContentContainer.displayWidth * 0.4, this.ContentContainer.y - this.ContentContainer.displayHeight * 0.5 - this.TxtTop.displayHeight);
        this.MainGroup.add(this.TxtTop);

        this.BtnSkip = new Button (this.scene, 0, 0, 'btn_skip');
        this.BtnSkip.setPosition(this.ContentContainer.x + this.ContentContainer.displayWidth * 0.35, this.TxtTop.y);
        this.BtnSkip.IsEnabled = false;
        this.MainGroup.add(this.BtnSkip);

        this.TxtSkip = new Text(this.scene, 0, 0, 
            "Skip", 
            { align:'center', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(50);
        this.TxtSkip.setPosition(this.BtnSkip.x * 0.95, this.BtnSkip.y);
        this.MainGroup.add(this.TxtSkip);

        this.VideoAds = this.scene.add.video(this.ContentContainer.x, this.ContentContainer.y - this.ContentContainer.displayHeight * 0.2, 'cusotm');
        this.VideoAds.setDisplaySize(this.ContentContainer.displayWidth * 0.925, this.ContentContainer.displayHeight * 0.5);
        this.VideoAds.play(true);
        this.MainGroup.add(this.VideoAds);

        this.ContentTxt = new Text(this.scene, 0, 0, 
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.ContentTxt.setPosition(this.VideoAds.x, this.ContentContainer.y + this.ContentContainer.displayHeight * 0.25);
        this.ContentTxt.setWordWrapWidth(this.ContentContainer.displayWidth);
        this.MainGroup.add(this.ContentTxt);

        if(this.resolution >= 3/4){
            this.ContentTxt.setWordWrapWidth(this.ContentContainer.displayWidth * 0.65);
        }

        if(this.iPhone == true){
            if(window.devicePixelRatio == 2){
                this.ContentTxt.setWordWrapWidth(this.ContentContainer.displayWidth * 1.4);

                if(this.resolution == 2/3){
                    
                }else if(this.resolution >= 3/4){

                }
                
            }else if(window.devicePixelRatio == 3){
                this.ContentTxt.setWordWrapWidth(this.ContentContainer.displayWidth * 0.8);

                if(this.resolution < 9/16){
                    
                }
                
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
        this.BtnSkip.IsEnabled = true;
        this.BtnSkip.setPressedTexture('btn_skip_pressed');
        this.TxtSkip.setText("SKIP");
    }
    
}