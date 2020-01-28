import Phaser from 'phaser'
import Button from '../../module/objects/button';
import Image from '../../module/objects/image';
import Text from '../../module/objects/text';
import ScreenUtility from '../../module/screen/screen_utility';

export default class LeaderboardlView extends Phaser.GameObjects.Container{
/** @param {Phaser.scene} scene */
	constructor(scene) {
        super(scene);

        this.scene = scene;
        /** @type {ScreenUtility}  */
        this.ScreenUtility = scene.ScreenUtility;

        scene.add.existing(this);  
        
        // this.centerX = this.ScreenUtility.CenterX;
        // this.centerY = this.ScreenUtility.CenterY;
        // this.width = this.ScreenUtility.Width;
        // this.height = this.ScreenUtility.Height;
        // this.dwidth = this.ScreenUtility.DefaultWidth;
        // this.dheight = this.ScreenUtility.DefaultHeight;
        // this.scale = this.ScreenUtility.ScalePercentage;


        this.InitView();
    }

    SetResponsiveScale = (size) => {
		if ((this.width / this.height) <= 9/16) {
			return size*(this.width / this.dwidth);
		}
		else {
			return size*(this.height / this.dheight);
		}
	}


    InitView(){
        this.tempY = 1.6;

        this.topName = [];

        this.topScore = [];

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
        let contentHeight = (this.ScreenUtility.GameHeight < (maxHeight * 1.1) ) ? this.ScreenUtility.GameHeight : maxHeight * 1.2;

        this.ContentContainer.displayWidth = contentWidth;
        this.ContentContainer.displayHeight = contentHeight;
        this.MainGroup.add(this.ContentContainer);

        this.TopText = new Text(this.scene, 0, 0, 
            "LEADERBOARD", 
            { align:'center', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(80);
        this.TopText.setPosition(this.ContentContainer.x - this.ContentContainer.displayWidth * 0.125, this.ContentContainer.y - this.ContentContainer.displayHeight * 0.5 - this.TopText.displayHeight);
        this.MainGroup.add(this.TopText);

        this.BtnClose = new Button (this.scene, 0, 0, 'btn_close');
        this.BtnClose.setPosition(this.ContentContainer.displayWidth * 1.15, this.TopText.y);
        this.MainGroup.add(this.BtnClose);

        this.BannerImage = new Image(this.scene, this.ContentContainer.x, this.ContentContainer.y, 'banner_leaderboard');
        this.BannerImage.setDisplayWidth(this.ContentContainer.displayWidth, true);
        this.BannerImage.setPosition(this.ContentContainer.x, this.ContentContainer.y * 0.4);
        this.MainGroup.add(this.BannerImage);

        this.TopText = new Text(this.scene, 0, 0, 
            "DEBBY GROCERIES", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.TopText.setPosition(this.BannerImage.x * 1.05, this.BannerImage.y);
        this.MainGroup.add(this.TopText);

        this.TxtRank = new Text(this.scene, 0, 0, 
            "RANK", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.TxtRank.setPosition(this.BannerImage.x * 0.5, this.BannerImage.y * 1.4);
        this.MainGroup.add(this.TxtRank);

        this.TxtName = new Text(this.scene, 0, 0, 
            "NAME", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.TxtName.setPosition(this.ContentContainer.x, this.TxtRank.y);
        this.MainGroup.add(this.TxtName);

        this.TxtScore = new Text(this.scene, 0, 0, 
            "SCORE", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.TxtScore.setPosition(this.ContentContainer.displayWidth * 1.05, this.TxtRank.y);
        this.MainGroup.add(this.TxtScore);
        
        // this.CreateCurrentBoxRank();
    }

    CreateBox(index, myRank){
        this.boxPlayer = new Image(this.scene, 0, 0, 'bg_non_top3');
        this.boxPlayer.setPosition(this.BannerImage.x, this.BannerImage.y * this.tempY);
        this.MainGroup.add(this.boxPlayer);

        this.Number = new Text(this.scene, 0, 0, 
            "", 
            { align:'left', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.Number.setPosition(this.boxPlayer.x * 0.5, this.boxPlayer.y);
        this.Number.setText(index + 1);
        this.MainGroup.add(this.Number);

        this.TopTenName = new Text(this.scene, 0, 0, 
            "-", 
            { align:'left', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.TopTenName.setPosition(this.boxPlayer.x, this.boxPlayer.y);
        this.TopTenName.setText(this.topName[index]);
        this.MainGroup.add(this.TopTenName);

        this.TopTenScore = new Text(this.scene, 0, 0, 
            "0", 
            { align:'left', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.TopTenScore.setPosition(this.boxPlayer.x * 1.45, this.boxPlayer.y);
        this.TopTenScore.setText(this.topScore[index]);
        this.MainGroup.add(this.TopTenScore);

        if(index < 3){
            this.boxPlayer.setTexture('bg_top3');
        }
        if(index == myRank){
            this.boxPlayer.setTexture('bg_current_rank');
        }
        
        this.tempY += 0.25;
    }


    CreateCurrentBoxRank(myName, myRank, myScore){
        this.CurrentRank = new Image(this.scene, 0, 0, 'bg_current__rank_big');
        this.CurrentRank.setPosition(this.BannerImage.x, this.ContentContainer.displayHeight * 1.1);
        this.MainGroup.add(this.CurrentRank);

        this.YourName = new Text(this.scene, 0, 0, 
            "-", 
            { align:'left', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(70);
        this.YourName.setPosition(this.CurrentRank.x, this.CurrentRank.y);
        this.YourName.setText(myName);
        this.MainGroup.add(this.YourName);

        this.YourRank = new Text(this.scene, 0, 0, 
            "0", 
            { align:'left', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(70);
        this.YourRank.setPosition(this.CurrentRank.x * 0.5, this.CurrentRank.y);
        this.YourRank.setText(myRank + 1);
        this.MainGroup.add(this.YourRank);

        this.YourScore = new Text(this.scene, 0, 0, 
            "0", 
            { align:'left', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(70);
        this.YourScore.setPosition(this.CurrentRank.x * 1.5, this.CurrentRank.y);
        this.YourScore.setText(myScore);
        this.MainGroup.add(this.YourScore);
    }


    Fill = (playerData, playerRank) => {
        var myRank = playerRank.rank - 1;
        var myName = window.localStorage.getItem("myName");
        var myScore = playerRank.score;

        console.log(myName);

        for(let i = 0; i < 10; i++){
            this.topName[i] = playerData[i].userName;
            this.topScore[i] = playerData[i].score;
            this.CreateBox(i, myRank);
        }

        this.CreateCurrentBoxRank(myName, myRank, myScore);
        
		// if (rank == -1) {
		// 	innerboard.playerBox.rank.text = '-';
		// }
		// else {
		// 	innerboard.playerBox.rank.text = playerRank.rank;
		// 	innerboard.boxes[rank].box.setTexture('bg_current');
		// }
		// innerboard.playerBox.name.text = playerData[rank].userName;
		// innerboard.playerBox.score.text = playerRank.score;
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

    OnClickClose(event){
        this.BtnClose.onClick(event);
    }
    
}