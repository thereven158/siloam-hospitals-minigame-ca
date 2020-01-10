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

        this.buttonPlay = new Button(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY * 1.3, 'btn_play');
        this.buttonPlay.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8);
        this.MainGroup.add(this.buttonPlay);

        this.buttonTutorial = new Button(this.scene, this.ScreenUtility.CenterX,  this.buttonPlay.y * 1.165, 'btn_tutorial');
        this.buttonTutorial.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8);
        this.MainGroup.add(this.buttonTutorial);

        this.buttonLeaderboard = new Button(this.scene, this.ScreenUtility.CenterX,  this.buttonTutorial.y * 1.145, 'btn_leaderboard');
        this.buttonLeaderboard.Image.setScale(this.ScreenUtility.ScalePercentage * 0.8);
        this.MainGroup.add(this.buttonLeaderboard);
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

    OnClickClose(event){
        this.BtnClose.onClick(event);
    }

    OnClickMusic(event){
        this.BtnMusic.onClick(event);
    }
}