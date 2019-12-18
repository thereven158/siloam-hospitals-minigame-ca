import LoadingSceneController from "../loading_scene_controller";

export default class LoadingTitleController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.image('btn_play', this.scene.CreatePath('/images/uigame/ingame_ui_button_long.png'));
        this.scene.load.image('main_picture', this.scene.CreatePath('/images/ingame/ingame_debby_basket.png'));        

        // this.scene.load.image('title_light', this.scene.CreatePath('/images/mainmenu/Light.png'));        
        
        // this.scene.load.image('logo_game', this.scene.CreatePath('/images/mainmenu/TitleTembakBintang.png'));        
        this.scene.load.image('background_menu', this.scene.CreatePath('/images/env/ingame_env_background_main.png'));      
     }
}