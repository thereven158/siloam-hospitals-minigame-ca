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

        this.MainCloud = this.scene.add.container(0,0);
        this.add(this.MainCloud);

        this.topCloudTrans = new Image(this.scene, 0, 0, 'window-top');
        this.topCloudTrans.setPosition(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY * 0.1);
        this.topCloudTrans.setAlpha(0.5);
        this.MainCloud.add(this.topCloudTrans);

        this.ContentContainer = new Image(this.scene, this.ScreenUtility.CenterX , 0 - this.ScreenUtility.CenterX, 'bg_white');

        let contentWidth = (this.ScreenUtility.GameWidth);
        let maxHeight = contentWidth * (this.ContentContainer.height / this.ContentContainer.width);
        let contentHeight = (this.ScreenUtility.GameHeight < (maxHeight * 1.1) ) ? this.ScreenUtility.GameHeight * 0.5 : maxHeight * 0.5;

        this.ContentContainer.displayWidth = contentWidth;
        this.ContentContainer.displayHeight = contentHeight;
        this.MainCloud.add(this.ContentContainer);

        this.topCloud = new Image(this.scene, 0, 0, 'window-top');
        this.topCloud.setPosition(this.ScreenUtility.CenterX, 0);
        this.MainCloud.add(this.topCloud);

        this.MainGroup = this.scene.add.container(0,0);
        this.add(this.MainGroup);

        this.TopText = new Text(this.scene, 0, 0, 
            "GAME OVER", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(120);
        this.TopText.setPosition(this.ScreenUtility.CenterX, 0 - this.ScreenUtility.CenterX * 1.3);
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

        this.buttonRetry = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY * 1.3, 'btn_normal');
        this.buttonRetry.setPressedTexture('btn_pressed');
        this.MainGroup.add(this.buttonRetry);

        this.IconRetry = new Image (this.scene, 0, 0, 'icon_retry');
        this.IconRetry.setPosition(this.buttonRetry.x * 0.65, this.buttonRetry.y);
        this.IconRetry.setDisplayWidth(this.IconRetry.displayWidth * 0.6, true);
        this.MainGroup.add(this.IconRetry);

        this.RetryTxt = new Text(this.scene, 0, 0, 
            "RETRY", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.RetryTxt.setPosition(this.buttonRetry.x * 1.1, this.buttonRetry.y);
        this.MainGroup.add(this.RetryTxt);

        this.buttonExit = new Button(this.scene, this.ScreenUtility.CenterX,  this.buttonRetry.y * 1.165, 'btn_normal');
        this.buttonExit.setPressedTexture('btn_pressed');
        this.MainGroup.add(this.buttonExit);

        this.IconExit = new Image (this.scene, 0, 0, 'icon_exit');
        this.IconExit.setPosition(this.buttonExit.x * 0.65, this.buttonExit.y);
        this.IconExit.setDisplayWidth(this.IconExit.displayWidth * 0.6, true);
        this.MainGroup.add(this.IconExit);

        this.ExitTxt = new Text(this.scene, 0, 0, 
            "EXIT", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.ExitTxt.setPosition(this.buttonExit.x * 1.1, this.buttonExit.y);
        this.MainGroup.add(this.ExitTxt);

        this.buttonLeaderboard = new Button(this.scene, this.ScreenUtility.CenterX,  this.buttonExit.y * 1.145, 'btn_normal');
        this.buttonLeaderboard.setPressedTexture('btn_pressed');
        this.MainGroup.add(this.buttonLeaderboard);

        this.IconLeaderboard = new Image (this.scene, 0, 0, 'icon_leaderboard');
        this.IconLeaderboard.setPosition(this.buttonLeaderboard.x * 0.65, this.buttonLeaderboard.y);
        this.IconLeaderboard.setDisplayWidth(this.IconLeaderboard.displayWidth, true);
        this.MainGroup.add(this.IconLeaderboard);

        this.LeaderboardTxt = new Text(this.scene, 0, 0, 
            "LEADERBOARD", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.LeaderboardTxt.setPosition(this.buttonLeaderboard.x * 1.1, this.buttonLeaderboard.y);
        this.MainGroup.add(this.LeaderboardTxt);
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
        this.buttonRetry.onClick(event);
    }

    OnClickClose(event){
        this.BtnClose.onClick(event);
    }

    OnClickLeaderboard(event){
        this.buttonLeaderboard.onClick(event);
    }

    OnClickExit(event){
        this.buttonExit.onClick(event);
    }
}