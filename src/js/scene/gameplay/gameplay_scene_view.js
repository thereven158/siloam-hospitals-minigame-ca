import GameplaySceneController from "./gameplay_scene_controller";
import Image from '../../module/objects/image';
import Text from '../../module/objects/text';
import Button from "../../module/objects/button";

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
    constructor(scene){
      this.scene = scene;
      this.ScreenUtility = scene.ScreenUtility;
      
    }

    /** @return {GameplaySceneView} */
    create(){

        this.background = new Image (this.scene, 
          this.ScreenUtility.CenterX, 
          this.ScreenUtility.CenterY, 
          'background_gameplay');
        this.background.setDisplaySize(this.ScreenUtility.GameWidth,
          this.ScreenUtility.GameHeight);
        
        this.windowTop = new Image(this.scene, 0, 0, 'window-top');
        this.windowTop.setPosition(this.ScreenUtility.CenterX, this.windowTop.displayHeight / 2);
        this.windowTop.setDepth(5);

        this.basket = this.scene.physics.add.image(this.ScreenUtility.CenterX, 
          this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight / 2.5, 
          'basket')
          .setImmovable();
        this.basket.setInteractive();
        this.basket.displayWidth = this.ScreenUtility.GameWidth * 0.25;
        this.basket.displayHeight = this.basket.displayWidth * (this.basket.height / this.basket.width);
        this.basket.setDepth(2);

        this.bottomBound = this.scene.physics.add.image(this.ScreenUtility.CenterX, 
          this.ScreenUtility.GameHeight * 1.05, 
          'bottom_bound').setImmovable();
        this.bottomBound.displayWidth = this.ScreenUtility.GameWidth;
        this.bottomBound.displayHeight = this.basket.displayWidth * (this.basket.height / this.basket.width);
        this.bottomBound.setDepth(2);

        this.debby = new Image(this.scene, 0, 0, 'debby');
        this.debby.setPosition(this.basket.x * 1.25, this.basket.y * 1.01);
        this.debby.setDisplayWidth(this.ScreenUtility.GameWidth * 0.1, true);
        this.debby.setDepth(3);

        this.scoreWindow = new Image(this.scene, 0, 0, 'score-window');
        this.scoreWindow.setDisplayWidth(this.ScreenUtility.GameWidth * 0.25, true);
        this.scoreWindow.setPosition(this.ScreenUtility.GameWidth - this.scoreWindow.displayWidth * 0.65, this.scoreWindow.displayHeight * 1.4);
        this.scoreWindow.setDepth(5);

        this.score = new Text(this.scene,
          this.scoreWindow.x / 1,
          this.scoreWindow.y / 1, 
          "0", 
          { align:'center', fontFamily: 'helsinki', color: '#1849A0' })
          .setFontSizeRS(90);
        this.score.setDepth(5);

        this.textScore = new Text(this.scene, this.scoreWindow.x + this.scoreWindow.displayWidth * 0.2, this.scoreWindow.y - this.score.displayHeight * 0.90, "SCORE",
          { color: '#1849A0', fontFamily: 'helsinki' })
          .setFontSizeRS(50);
        this.textScore.setDepth(5);

        this.life1 = new Image (this.scene, 0, 0, 'life');
        this.life1.setPosition(this.ScreenUtility.GameWidth * 0.25 , this.life1.displayHeight * 2);
        this.life1.setDisplayWidth(this.ScreenUtility.GameWidth * 0.08, true);
        this.life1.setDepth(5);

        this.textHealth = new Text(this.scene, this.life1.x + this.life1.displayWidth * 0.8, this.life1.y - this.life1.displayHeight * 1.1, "HEALTH", 
          { color: '#1849A0', fontFamily: 'helsinki' })
          .setFontSizeRS(60);
        this.textHealth.setDepth(5);

        this.buttonPause = new Button(this.scene, 0, 0, 'btn_pause');
        this.buttonPause.setPosition(this.life1.x - this.buttonPause.Image.displayWidth * 1.1, this.life1.y - this.life1.displayHeight * 0.4);
        this.buttonPause.setDisplayWidth(this.ScreenUtility.GameWidth * 0.15, true);
        this.buttonPause.setDepth(5);

        this.life2 = new Image (this.scene, 
          this.life1.x + this.life1.displayWidth * 1.1,
          this.life1.y,
          'life');
        this.life2.setDisplayWidth(this.ScreenUtility.GameWidth * 0.08, true);
        this.life2.setDepth(5);

        this.life3 = new Image (this.scene, 
          this.life2.x + this.life2.displayWidth  * 1.1,
          this.life1.y,
          'life');
        this.life3.setDisplayWidth(this.ScreenUtility.GameWidth * 0.08, true);
        this.life3.setDepth(5);

        this.ComboTxt = new Text(this.scene, 
          this.ScreenUtility.CenterX, 
          this.ScreenUtility.CenterY * 0.65, 
          "",
        { color: '#ffffff', fontFamily: 'helsinki' })
        .setFontSizeRS(300);
        this.ComboTxt.setAlpha(0.5);

        return this;
    }

    moveToLeft(){
      this.scene.tweens.add({
        targets: this.basket,
        x: this.ScreenUtility.GameWidth * 0.5 * 0.5,
        duration: 250,
        ease: Phaser.Math.Easing.Back.Out,
      });	
    }

    moveToMid(){
      this.scene.tweens.add({
        targets: this.basket,
        x: this.ScreenUtility.CenterX,
        duration: 250,
        ease: Phaser.Math.Easing.Back.Out,
      });	
    }

    moveToRight(){
      this.scene.tweens.add({
        targets: this.basket,
        x: this.ScreenUtility.CenterX + this.ScreenUtility.GameWidth * 0.5 * 0.5,
        duration: 250,
        ease: Phaser.Math.Easing.Back.Out,
      });	
    }

    comboTextTween(){
      this.ComboTxt.alpha = 1;
      this.scene.tweens.add({
        targets: this.ComboTxt,
        alpha: 0.5,
        duration: 1000,
        ease: Phaser.Math.Easing.Back.Out,
      });	
    }
    
    onClickPause(event){
      this.buttonPause.onClick(event);
    }

};
