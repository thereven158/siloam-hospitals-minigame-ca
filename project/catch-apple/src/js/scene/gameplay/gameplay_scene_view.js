import GameplaySceneController from "./gameplay_scene_controller";
import Image from '../../module/objects/image';
import Text from '../../module/objects/text';

export default class GameplaySceneView {
    /** @param {GameplaySceneController} scene */
    constructor(scene){
      this.scene = scene;
      this.ScreenUtility = scene.ScreenUtility;
      
    }

    /** @return {GameplaySceneView} */
    create(){
        this.initScreen();

        this.background = new Image (this.scene, 
          this.ScreenUtility.CenterX, 
          this.ScreenUtility.CenterY, 
          'background');
        this.background.setDisplaySize(this.ScreenUtility.GameWidth,
          this.ScreenUtility.GameHeight);

        this.windowTop = new Image(this.scene, 0, 0, 'window-top');
        this.windowTop.setPosition(this.ScreenUtility.CenterX, this.windowTop.displayHeight / 2);

        this.basket = this.scene.physics.add.image(this.ScreenUtility.CenterX, 
          this.ScreenUtility.CenterY + this.ScreenUtility.GameHeight / 2.5, 
          'basket')
          .setImmovable();
        this.basket.setInteractive();
        this.basket.displayWidth = this.ScreenUtility.GameWidth * 0.25;
        this.basket.displayHeight = this.basket.displayWidth * (this.basket.height / this.basket.width);
        this.basket.setDepth(2);

        this.scoreWindow = new Image(this.scene, 0, 0, 'score-window');
        this.scoreWindow.setDisplayWidth(this.ScreenUtility.GameWidth * 0.25, true);
        this.scoreWindow.setPosition(this.ScreenUtility.GameWidth - this.scoreWindow.displayWidth * 0.65, this.scoreWindow.displayHeight * 1.5);

        this.score = new Text(this.scene,
          this.scoreWindow.x / 1,
          this.scoreWindow.y / 1, 
          "0", 
          { align:'center', fontFamily: 'panton', color: '#ffffff' })
          .setFontSizeRS(90);
        this.score.setDepth(1);

        this.textScore = new Text(this.scene, this.score.x, this.score.y - this.score.displayHeight * 0.90, "SCORE",
          { color: '#000000' })
          .setFontSizeRS(75);
        this.textScore.setDepth(1);

        this.life1 = new Image (this.scene, 0, 0, 'life');
        this.life1.setPosition(this.life1.displayWidth * 1.25 , this.life1.displayHeight * 2);
        this.life1.setDisplayWidth(this.ScreenUtility.GameWidth * 0.095, true);

        this.textHealth = new Text(this.scene, this.life1.x + this.life1.displayWidth * 0.77, this.life1.y - this.life1.displayHeight * 0.90, "HEALTH", 
          { color: '#000000' })
          .setFontSizeRS(75);
          this.textHealth.setDepth(1);

        this.life2 = new Image (this.scene, 
          this.life1.x + this.life1.displayWidth * 1.35,
          this.life1.y,
          'life');
        this.life2.setDisplayWidth(this.ScreenUtility.GameWidth * 0.095, true);

        this.life3 = new Image (this.scene, this.life2.x + this.life2.displayWidth  * 1.35,
          this.life1.y,
          'life');
        this.life3.setDisplayWidth(this.ScreenUtility.GameWidth * 0.095, true);

        return this;
    }
    
    initScreen = ()=>{

    }

    update = ()=>{
      
    }

};
