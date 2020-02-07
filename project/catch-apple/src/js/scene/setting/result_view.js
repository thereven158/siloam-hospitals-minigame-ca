import Phaser from 'phaser'
import Button from '../../module/objects/button';
import Image from '../../module/objects/image';
import Text from '../../module/objects/text';
import ScreenUtility from '../../module/screen/screen_utility';

export default class ResultView extends Phaser.GameObjects.Container{
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

        this.MainCloud = this.scene.add.container(0,0);
        this.add(this.MainCloud);
        this.ContentContainer = new Image(this.scene, this.ScreenUtility.CenterX , 0 - this.ScreenUtility.CenterY * 0.5, 'bg_white');

        let contentWidth = (this.ScreenUtility.GameWidth);
        let maxHeight = contentWidth * (this.ContentContainer.height / this.ContentContainer.width);
        let contentHeight = (this.ScreenUtility.GameHeight < (maxHeight * 1.1) ) ? this.ScreenUtility.GameHeight * 0.5 : maxHeight * 0.6;

        console.log(this.ScreenUtility.GameHeight);
        console.log(maxHeight);
        console.log(contentHeight);

        this.ContentContainer.displayWidth = contentWidth;
        this.ContentContainer.displayHeight = contentHeight;
        this.MainCloud.add(this.ContentContainer);

        this.topCloud = new Image(this.scene, 0, 0, 'window-top');
        this.topCloud.setPosition(this.ScreenUtility.CenterX, this.ContentContainer.y + this.ContentContainer.displayHeight * 0.55);
        this.MainCloud.add(this.topCloud);

        this.topCloudTrans = new Image(this.scene, 0, 0, 'window-top');
        this.topCloudTrans.setPosition(this.ScreenUtility.CenterX, this.topCloud.y + this.topCloud.displayHeight * 0.35);
        this.topCloudTrans.setAlpha(0.5);
        this.MainCloud.add(this.topCloudTrans);

        this.MainGroup = this.scene.add.container(0,0);
        this.add(this.MainGroup);

        this.TopText = new Text(this.scene, 0, 0, 
            "GAME OVER", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(120);
        this.TopText.setPosition(this.ScreenUtility.CenterX, 0 - this.ScreenUtility.CenterY * 0.7);
        this.MainCloud.add(this.TopText);

        this.ScoreTxt = new Text(this.scene, 0, 0, 
            "SCORE", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(60);
        this.ScoreTxt.setPosition(this.TopText.x * 0.45, this.TopText.y * 0.75);
        this.MainCloud.add(this.ScoreTxt);

        this.Score = new Text(this.scene, 0, 0, 
            "300", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(60);
        this.Score.setPosition(this.ScreenUtility.GameWidth * 0.8, this.TopText.y * 0.75);
        this.MainCloud.add(this.Score);
        
        this.ComboTxt = new Text(this.scene, 0, 0, 
            "COMBO", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(60);
        this.ComboTxt.setPosition(this.TopText.x * 0.45, this.ScoreTxt.y * 0.75);
        this.MainCloud.add(this.ComboTxt);

        this.ComboScore = new Text(this.scene, 0, 0, 
            "50", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(60);
        this.ComboScore.setPosition(this.ScreenUtility.GameWidth * 0.8, this.ScoreTxt.y * 0.75);
        this.MainCloud.add(this.ComboScore);

        this.BonusTxt = new Text(this.scene, 0, 0, 
            "BONUS POINT", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(60);
        this.BonusTxt.setPosition(this.TopText.x * 0.625, this.ComboTxt.y * 0.65);
        this.MainCloud.add(this.BonusTxt);

        this.BonusScore = new Text(this.scene, 0, 0, 
            "120", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(60);
        this.BonusScore.setPosition(this.ScreenUtility.GameWidth * 0.8, this.ComboTxt.y * 0.65);
        this.MainCloud.add(this.BonusScore);

        this.TotalTxt = new Text(this.scene, 0, 0, 
            "TOTAL SCORE", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(75);
        this.TotalTxt.setPosition(this.TopText.x, this.BonusTxt.y * 0.55);
        this.MainCloud.add(this.TotalTxt);

        this.TotalScore = new Text(this.scene, 0, 0, 
            "470", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(180);
        this.TotalScore.setPosition(this.TopText.x, this.TotalTxt.y * 0.15);
        this.MainCloud.add(this.TotalScore);

        this.BtnRetry = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY * 1.3, 'btn_normal');
        this.BtnRetry.setPressedTexture('btn_pressed');
        this.MainGroup.add(this.BtnRetry);

        this.IconRetry = new Image (this.scene, 0, 0, 'icon_retry');
        this.IconRetry.setPosition(this.BtnRetry.x * 0.65, this.BtnRetry.y);
        this.IconRetry.setDisplayWidth(this.IconRetry.displayWidth * 0.6, true);
        this.MainGroup.add(this.IconRetry);

        this.TxtRetry = new Text(this.scene, 0, 0, 
            "RETRY", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.TxtRetry.setPosition(this.BtnRetry.x * 1.1, this.BtnRetry.y);
        this.MainGroup.add(this.TxtRetry);

        this.BtnExit = new Button(this.scene, this.ScreenUtility.CenterX,  this.BtnRetry.y * 1.165, 'btn_normal');
        this.BtnExit.setPressedTexture('btn_pressed');
        this.MainGroup.add(this.BtnExit);

        this.IconExit = new Image (this.scene, 0, 0, 'icon_exit');
        this.IconExit.setPosition(this.BtnExit.x * 0.65, this.BtnExit.y);
        this.IconExit.setDisplayWidth(this.IconExit.displayWidth * 0.6, true);
        this.MainGroup.add(this.IconExit);

        this.TxtExit = new Text(this.scene, 0, 0, 
            "EXIT", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.TxtExit.setPosition(this.BtnExit.x * 1.1, this.BtnExit.y);
        this.MainGroup.add(this.TxtExit);

        this.BtnLeaderboard = new Button(this.scene, this.ScreenUtility.CenterX,  this.BtnExit.y * 1.145, 'btn_normal');
        this.BtnLeaderboard.setPressedTexture('btn_pressed');
        this.MainGroup.add(this.BtnLeaderboard);

        this.IconLeaderboard = new Image (this.scene, 0, 0, 'icon_leaderboard');
        this.IconLeaderboard.setPosition(this.BtnLeaderboard.x * 0.65, this.BtnLeaderboard.y);
        this.IconLeaderboard.setDisplayWidth(this.IconLeaderboard.displayWidth, true);
        this.MainGroup.add(this.IconLeaderboard);

        this.LeaderboardTxt = new Text(this.scene, 0, 0, 
            "LEADERBOARD", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.LeaderboardTxt.setPosition(this.BtnLeaderboard.x * 1.1, this.BtnLeaderboard.y);
        this.MainGroup.add(this.LeaderboardTxt);


        if(this.resolution >= 3/4){
            this.topCloud.setPosition(this.ScreenUtility.CenterX, this.ContentContainer.y + this.ContentContainer.displayHeight * 0.495);
            this.topCloudTrans.setPosition(this.ScreenUtility.CenterX, this.topCloud.y + this.topCloud.displayHeight * 0.35);

            this.TopText.setPosition(this.ScreenUtility.CenterX, 0 - this.ScreenUtility.CenterX);
            this.ContentContainer.setPosition(this.ScreenUtility.CenterX , 0 - this.ScreenUtility.CenterX * 0.9);
            this.TopText.setFontSizeRS(90);

            this.ScoreTxt.setPosition(this.TopText.x * 0.45, this.TopText.y * 0.75);
            this.Score.setPosition(this.ScreenUtility.GameWidth * 0.8, this.TopText.y * 0.75);

            this.ComboTxt.setPosition(this.TopText.x * 0.45, this.ScoreTxt.y * 0.75);
            this.ComboScore.setPosition(this.ScreenUtility.GameWidth * 0.8, this.ScoreTxt.y * 0.75);

            this.BonusTxt.setPosition(this.TopText.x * 0.625, this.ComboTxt.y * 0.65);
            this.BonusScore.setPosition(this.ScreenUtility.GameWidth * 0.8, this.ComboTxt.y * 0.65);

            this.TotalTxt.setPosition(this.TopText.x, this.BonusTxt.y * 0.55);
            this.TotalTxt.setFontSizeRS(60);
            this.TotalScore.setPosition(this.TopText.x, this.TotalTxt.y * 0.15);
            this.TotalScore.setFontSizeRS(150);

            this.BtnRetry.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8);
            this.BtnLeaderboard.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8);
            this.BtnExit.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8);
            
            this.IconRetry.setPosition(this.BtnRetry.x * 0.75, this.BtnRetry.y);
            this.IconRetry.setDisplayWidth(this.IconRetry.displayWidth * 0.6, true);

            this.IconExit.setPosition(this.BtnExit.x * 0.75, this.BtnExit.y);
            this.IconExit.setDisplayWidth(this.IconExit.displayWidth * 0.6, true);

            this.IconLeaderboard.setPosition(this.BtnLeaderboard.x * 0.75, this.BtnLeaderboard.y);
            this.IconLeaderboard.setDisplayWidth(this.IconLeaderboard.displayWidth, true);
            this.LeaderboardTxt.setFontSizeRS(35);
            console.log("check 1");
        }

        if(this.iPhone == true){
            console.log("check 2");
            if(window.devicePixelRatio == 2){
                   
                if(this.resolution == 2/3){
                    this.TopText.setPosition(this.ScreenUtility.CenterX, 0 - this.ScreenUtility.CenterX * 1.2);
                }else if(this.resolution >= 3/4){
                    
                }
                
            }else if(window.devicePixelRatio == 3){
                

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

        this.scene.tweens.add({
            targets:  this.MainCloud,
            y: this.ScreenUtility.CenterY * 0.9,
            alpha: 1,
            duration: 1000,
            ease: Phaser.Math.Easing.Back.Out,
        });	
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

    OnClickRetry(event){
        this.BtnRetry.onClick(event);
    }

    OnClickClose(event){
        this.BtnClose.onClick(event);
    }

    OnClickLeaderboard(event){
        this.BtnLeaderboard.onClick(event);
    }

    OnClickExit(event){
        this.BtnExit.onClick(event);
    }
}