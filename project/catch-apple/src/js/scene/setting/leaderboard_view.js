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
        }else{
            this.iPhone = false;
        }
        console.log(this.width);
        console.log(this.height);
        console.log(this.resolution);
    }


    InitView(){
        this.tempY = 1.5;

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

        // this.bgTree = new Image (this.scene, 
        //     this.ScreenUtility.CenterX, 
        //     this.ScreenUtility.GameHeight, 
        //     'background_tree');
        // this.add(this.bgTree);

        this.Blackground = new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'bg_black').setInteractive();
		this.Blackground.setDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
        this.Blackground.setAlpha(0.5);
        this.add(this.Blackground);

        this.MainGroup = this.scene.add.container(0,0);
        this.add(this.MainGroup);

        this.ContentContainer = new Image(this.scene, this.ScreenUtility.CenterX , this.ScreenUtility.CenterY, 'bg_white');

        let contentWidth = (this.ScreenUtility.GameWidth * 0.7);
        let maxHeight = contentWidth * (this.ContentContainer.height / this.ContentContainer.width);
        let contentHeight = (this.ScreenUtility.GameHeight < (maxHeight * 1.1) ) ? this.ScreenUtility.GameHeight : maxHeight * 1;

        this.ContentContainer.displayWidth = contentWidth;
        this.ContentContainer.displayHeight = contentHeight;
        this.ContentContainer.setPosition(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY);
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
        this.BannerImage.setPosition(this.ContentContainer.x, this.ContentContainer.y -this.ContentContainer.displayHeight * 0.4);
        this.MainGroup.add(this.BannerImage);

        this.TitleText = new Text(this.scene, 0, 0, 
            "DEBBY'S GROCERIES", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(50);
        this.TitleText.setPosition(this.BannerImage.x * 1.05, this.BannerImage.y);
        this.MainGroup.add(this.TitleText);

        this.TxtRank = new Text(this.scene, 0, 0, 
            "RANK", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.TxtRank.setPosition(this.BannerImage.x * 0.5, this.BannerImage.y * 1.3);
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

        if(this.resolution >= 0.75){
            this.ContentContainer.displayHeight = contentHeight * 0.85;
            this.ContentContainer.setPosition(this.ContentContainer.x, this.ContentContainer.y * 1.1);

            this.BannerImage.setPosition(this.ContentContainer.x, this.ContentContainer.y - this.ContentContainer.displayHeight * 0.4);
            this.TitleText.setPosition(this.BannerImage.x * 1.05, this.BannerImage.y);
            this.TxtRank.setPosition(this.BannerImage.x * 0.5, this.BannerImage.y * 1.4);
            this.TxtName.setPosition(this.ContentContainer.x, this.TxtRank.y);
            this.TxtScore.setPosition(this.ContentContainer.displayWidth * 1.05, this.TxtRank.y);

            this.TopText.setPosition(this.ContentContainer.x - this.ContentContainer.displayWidth * 0.125, this.ContentContainer.y - this.ContentContainer.displayHeight * 0.55);
            this.BtnClose.setPosition(this.ContentContainer.displayWidth * 1.15, this.TopText.y);
        }
        
        if(this.iPhone == true){
            if(window.devicePixelRatio == 2){

                if(this.resolution == 2/3){
                    this.ContentContainer.displayHeight = contentHeight * 0.8;

                    this.BannerImage.setPosition(this.ContentContainer.x, this.ContentContainer.y - this.ContentContainer.displayHeight * 0.375);
                    this.TitleText.setPosition(this.BannerImage.x * 1.05, this.BannerImage.y);
                    this.TxtRank.setPosition(this.BannerImage.x * 0.5, this.BannerImage.y * 1.25);
                    this.TxtName.setPosition(this.ContentContainer.x, this.TxtRank.y);
                    this.TxtScore.setPosition(this.ContentContainer.displayWidth * 1.05, this.TxtRank.y);

                    this.TopText.setPosition(this.ContentContainer.x - this.ContentContainer.displayWidth * 0.125, this.ContentContainer.y - this.ContentContainer.displayHeight * 0.6);
                    this.BtnClose.setPosition(this.ContentContainer.displayWidth * 1.15, this.TopText.y);
                    
                }else if(this.resolution >= 3/4){

                }
                
            }else if(window.devicePixelRatio == 3){

                this.TopText.setPosition(this.ContentContainer.x - this.ContentContainer.displayWidth * 0.125, this.ContentContainer.y - this.ContentContainer.displayHeight * 0.6);
                this.BtnClose.setPosition(this.ContentContainer.displayWidth * 1.15, this.TopText.y);

                if(this.resolution < 9/16){
                    
                }
                
            }
        }
    }

    CreateBox(index, myRank){
        this.boxPlayer = new Image(this.scene, 0, 0, 'bg_non_top3');
        this.boxPlayer.setPosition(this.BannerImage.x, this.TxtName.y + this.TxtName.displayHeight * this.tempY);
        this.MainGroup.add(this.boxPlayer);

        this.boxPlayer.displayHeight = this.ContentContainer.displayHeight * 0.05;

        if(this.resolution >= 3/4){
            this.boxPlayer.displayHeight = this.boxPlayer.displayHeight * 0.8;
        }

        this.Number = new Text(this.scene, 0, 0, 
            "", 
            { align:'left', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(40);
        this.Number.setPosition(this.boxPlayer.x * 0.5, this.boxPlayer.y);
        this.Number.setText(index + 1);
        this.MainGroup.add(this.Number);

        this.TopTenName = new Text(this.scene, 0, 0, 
            "-", 
            { align:'left', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(40);
        this.TopTenName.setPosition(this.boxPlayer.x, this.boxPlayer.y);
        this.TopTenName.setText(this.topName[index]);
        this.MainGroup.add(this.TopTenName);

        this.TopTenScore = new Text(this.scene, 0, 0, 
            "0", 
            { align:'left', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(40);
        this.TopTenScore.setPosition(this.boxPlayer.x * 1.45, this.boxPlayer.y);
        this.TopTenScore.setText(this.topScore[index]);
        this.MainGroup.add(this.TopTenScore);

        if(index < 3){
            this.boxPlayer.setTexture('bg_top3');
        }
        if(index == myRank - 1){
            this.boxPlayer.setTexture('bg_current_rank');
        }

        if(this.iPhone == false){
            if(this.resolution >= 3/4){
                this.tempY += 1.75;
            }else if(this.resolution >= 10/16){
                this.tempY += 2;
            }else{
                this.tempY += 2;
            }
        }
        
        
        if(this.iPhone){
            if(window.devicePixelRatio == 2){
                if(this.resolution >= 3/4){
                    this.tempY = this.tempY - 1.75;
                    this.tempY += 1.5;
                }else if(this.resolution == 2/3){
                    this.tempY += 1.5;
                }
                else{
                    this.tempY += 2;
                }
            }
            
        }
    }


    CreateCurrentBoxRank(myName, myRank, myScore){
        this.CurrentRank = new Image(this.scene, 0, 0, 'bg_current__rank_big');
        this.CurrentRank.setPosition(this.ContentContainer.x, this.ContentContainer.y + this.ContentContainer.displayHeight * 0.45);
        this.MainGroup.add(this.CurrentRank);

        this.CurrentRank.displayHeight = this.ContentContainer.displayHeight * 0.075;

        if(this.resolution >= 3/4){
            this.CurrentRank.displayHeight = this.CurrentRank.displayHeight * 0.8;
            this.CurrentRank.setPosition(this.BannerImage.x, this.boxPlayer.y * 1.075);
        }

        this.YourName = new Text(this.scene, 0, 0, 
            "-", 
            { align:'left', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(40);
        this.YourName.setPosition(this.CurrentRank.x, this.CurrentRank.y);
        this.YourName.setText(myName);
        this.MainGroup.add(this.YourName);

        this.YourRank = new Text(this.scene, 0, 0, 
            "0", 
            { align:'left', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(40);
        this.YourRank.setPosition(this.CurrentRank.x * 0.5, this.CurrentRank.y);
        if(myRank == -1){
            this.YourRank.setText("-");
        }else{
            this.YourRank.setText(myRank + 1);
        }   
        
        this.MainGroup.add(this.YourRank);

        this.YourScore = new Text(this.scene, 0, 0, 
            "0", 
            { align:'left', fontFamily: 'helsinki', color: '#ffffff' })
            .setFontSizeRS(40);
        this.YourScore.setPosition(this.CurrentRank.x * 1.5, this.CurrentRank.y);
        if(myScore == 0){
            this.YourScore.setText("0");
        }else{
            this.YourScore.setText(myScore);
        }  
        
        this.MainGroup.add(this.YourScore);

    }


    Fill = (playerData, playerRank, playerScore) => {
        // var myRank = playerRank.rank - 1;
        var myName = window.sessionStorage.getItem("myName");
        // var myScore = playerRank.score;

        // if(playerData == null){
        //     for(let i = 0; i < 10; i++){
        //         this.topName[i] = "-";
        //         this.topScore[i] = "0";
        //         this.CreateBox(i, playerRank);
        //     }
        //     this.CreateCurrentBoxRank("-", "-", 0);
        // }else{
        //     for(let i = 0; i < 10; i++){
        //         this.topName[i] = playerData[i].userName;
        //         this.topScore[i] = playerData[i].score;
        //         this.CreateBox(i, myRank);
        //     }
        //     this.CreateCurrentBoxRank(myName, playerRank, playerScore);
        // }

        for(let i = 0; i < 10; i++){
            if(playerData == null){
                return console.log("data null");
            }else if(playerData[i].userName == null){
                return console.log("data null");
            }
            else{
                this.topName[i] = playerData[i].userName;
                this.topScore[i] = playerData[i].score;
            }
            this.CreateBox(i, playerRank.rank);
        }
        this.CreateCurrentBoxRank(myName, playerRank.rank - 1, playerScore.score);
        
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