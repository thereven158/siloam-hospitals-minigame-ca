import LoadingSceneController from "./loading_scene_controller";
import Image from '../../module/objects/image';
import Text from '../../module/objects/text';

export default class LoadingSceneView{
   /** @param {LoadingSceneController} scene */
    constructor(scene){
      this.scene = scene;
      this.ScreenUtility = scene.ScreenUtility;
    
    }

    /** @return {LoadingSceneView} */
    create(){
      this.loadingScreen = this.scene.add.graphics();
      this.loadingScreen.fillStyle('0x00000', 1);
      this.loadingScreen.fillRect(0,0, this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
      
      return this;
    }

    initLoading = ()=>{
      this.Background =  new Image(this.scene, this.ScreenUtility.CenterX, this.ScreenUtility.CenterY, 'bg_loading');
      this.Background.setDisplaySize(this.ScreenUtility.GameWidth, this.ScreenUtility.GameHeight);
      
      this.Character = new Image(this.scene, 
        this.ScreenUtility.CenterX, 
        this.ScreenUtility.CenterY - this.ScreenUtility.CenterY * 0.5, 'loading_character');
      this.Character.setDisplayWidth(this.ScreenUtility.GameWidth * 0.5, true);

      this.EmptyBar = new Image(this.scene, 0, 0, 'loading_emptybar');
      this.EmptyBar.displayWidth = this.ScreenUtility.GameWidth * 0.8;
      this.EmptyBar.displayHeight = this.EmptyBar.displayHeight * 0.6;
      this.EmptyBar.setPosition(this.ScreenUtility.CenterX, this.ScreenUtility.CenterY * 1.5)

      this.FullBar = new Image(this.scene, 0,0, 'loading_fullbar');
      this.FullBar.setDisplaySize(this.EmptyBar.displayWidth, this.EmptyBar.displayHeight);
      this.FullBar.setPosition(this.EmptyBar.x - (this.FullBar.displayWidth * 0.5), this.EmptyBar.y)
      this.FullBar.setOrigin(0, 0.5);

      this.FullBarWidth = this.FullBar.displayWidth;

      this.LoadingText = new Text(this.scene, this.ScreenUtility.CenterX * 0.5, this.FullBar.y - this.FullBar.displayHeight * 1.5 , "Loading..."
        ,{align:'center', fontFamily: 'helsinki', color: '#1849A0'}).setFontSizeR(70);
        
      this.LoadingText.setOrigin(0.5,0.5);
    }
    
    setProgressText = (value) =>{
        this.FullBar.displayWidth = value * this.FullBarWidth;
    }
};