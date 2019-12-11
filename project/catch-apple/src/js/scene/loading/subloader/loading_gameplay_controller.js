import LoadingSceneController from "../loading_scene_controller";

export default class LoadingGameplayController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
      this.scene.load.image('paddle',this.scene.CreatePath('/images/ingame/basket.png'));
     }
}