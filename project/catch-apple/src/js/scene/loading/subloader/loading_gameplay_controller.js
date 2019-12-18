import LoadingSceneController from "../loading_scene_controller";

export default class LoadingGameplayController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
      this.scene.load.image('basket',this.scene.CreatePath('/images/ingame/ingame_basket.png'));
      this.scene.load.image('good',this.scene.CreatePath('/images/ingame/ingame_good_02.png'));
      this.scene.load.image('bad',this.scene.CreatePath('/images/ingame/ingame_bad_02.png'));
      this.scene.load.image('kosong',this.scene.CreatePath('/images/ingame/trans.png'));

      this.scene.load.image('score-window',this.scene.CreatePath('/images/uigame/ingame_ui_container_score.png'));
      this.scene.load.image('life',this.scene.CreatePath('/images/uigame/ingame_ui_live.png'));
      this.scene.load.image('unlife',this.scene.CreatePath('/images/uigame/ingame_ui_live_null.png'));
      this.scene.load.image('window-top',this.scene.CreatePath('/images/env/ingame_env_cloud_main.png'));

      this.scene.load.image('background',this.scene.CreatePath('/images/env/ingame_still_backgound.png'));
     }
}