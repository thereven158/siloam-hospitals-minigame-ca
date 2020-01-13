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

        this.InitView();
    }

    InitView(){
        this.topThreeName = ["Yoga", "Putra", "Nugraha"];
        this.topTenName = ["Diki", "Ari", "Dobleh", "Adit", "Kabur", "Satria", "Bangbang"];

        this.topThreeScore = [999, 998, 997];
        this.topTenScore = [900, 800, 700, 600, 500, 400, 300];

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

        this.RankTxt = new Text(this.scene, 0, 0, 
            "RANK", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.RankTxt.setPosition(this.BannerImage.x * 0.5, this.BannerImage.y * 1.4);
        this.MainGroup.add(this.RankTxt);

        this.NameTxt = new Text(this.scene, 0, 0, 
            "NAME", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.NameTxt.setPosition(this.RankTxt.x * 1.5, this.RankTxt.y);
        this.MainGroup.add(this.NameTxt);

        this.ScoreTxt = new Text(this.scene, 0, 0, 
            "SCORE", 
            { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(40);
        this.ScoreTxt.setPosition(this.ContentContainer.displayWidth * 1.05, this.RankTxt.y);
        this.MainGroup.add(this.ScoreTxt);

        let temp1 = 1.6;
        for(let i = 0; i < 3; i++){
            this.topThree = new Image(this.scene, 0, 0, 'bg_top3');
            this.topThree.setPosition(this.BannerImage.x, this.BannerImage.y * temp1);
            this.MainGroup.add(this.topThree);

            this.Number = new Text(this.scene, 0, 0, 
                "", 
                { align:'left', fontFamily: 'helsinki', color: '#1849A0' })
                .setFontSizeRS(40);
            this.Number.setPosition(this.RankTxt.x, this.topThree.y);
            this.Number.setText(i + 1);
            this.MainGroup.add(this.Number);

            this.NumberScore = new Text(this.scene, 0, 0, 
                "", 
                { align:'left', fontFamily: 'helsinki', color: '#1849A0' })
                .setFontSizeRS(40);
            this.NumberScore.setPosition(this.ScoreTxt.x, this.topThree.y);
            this.NumberScore.setText(this.topThreeScore[i]);
            this.MainGroup.add(this.NumberScore);

            this.LeadNameTop3 = new Text(this.scene, 0, 0, 
                "", 
                { align:'left', fontFamily: 'helsinki', color: '#1849A0' })
                .setFontSizeRS(40);
            this.LeadNameTop3.setPosition(this.topThree.x, this.topThree.y);
            this.LeadNameTop3.setText(this.topThreeName[i]);
            this.MainGroup.add(this.LeadNameTop3);

            temp1 += 0.25;
        }

        let temp2 = 2.35;
        for(let i = 0; i < 7; i++){
            if(i == 2){
                this.topTen = new Image(this.scene, 0, 0, 'bg_current');
                this.topTen.setPosition(this.BannerImage.x, this.BannerImage.y * temp2);
                this.MainGroup.add(this.topTen);
            } else{
                this.topTen = new Image(this.scene, 0, 0, 'bg_non_top3');
                this.topTen.setPosition(this.BannerImage.x, this.BannerImage.y * temp2);
                this.MainGroup.add(this.topTen);
            }
                this.Number = new Text(this.scene, 0, 0, 
                    "", 
                    { align:'left', fontFamily: 'helsinki', color: '#1849A0' })
                    .setFontSizeRS(40);
                this.Number.setPosition(this.RankTxt.x, this.topTen.y);
                this.Number.setText(i + 4);
                this.MainGroup.add(this.Number);

                this.NumberScore = new Text(this.scene, 0, 0, 
                    "", 
                    { align:'left', fontFamily: 'helsinki', color: '#1849A0' })
                    .setFontSizeRS(40);
                this.NumberScore.setPosition(this.ScoreTxt.x, this.topTen.y);
                this.NumberScore.setText(this.topTenScore[i]);
                this.MainGroup.add(this.NumberScore);

                this.LeadNameTop10 = new Text(this.scene, 0, 0, 
                    "", 
                    { align:'left', fontFamily: 'helsinki', color: '#1849A0' })
                    .setFontSizeRS(40);
                this.LeadNameTop10.setPosition(this.topTen.x, this.topTen.y);
                this.LeadNameTop10.setText(this.topTenName[i]);
                this.MainGroup.add(this.LeadNameTop10);

            temp2 += 0.25;
        }

        this.CurrentRank = new Image(this.scene, 0, 0, 'bg_current_big');
        this.CurrentRank.setPosition(this.BannerImage.x, this.ContentContainer.displayHeight * 1.1);
        this.MainGroup.add(this.CurrentRank);

        this.YourName = new Text(this.scene, 0, 0, 
            "DOBLEH", 
            { align:'left', fontFamily: 'helsinki', color: '#1849A0' })
            .setFontSizeRS(70);
        this.YourName.setPosition(this.CurrentRank.x, this.CurrentRank.y);
        this.MainGroup.add(this.YourName);
        
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