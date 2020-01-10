import LoadingSceneController from "../loading_scene_controller";

export default class LoadingGameplayController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
      this.scene.load.image('debby',this.scene.CreatePath('/images/ingame/ingame_debby.png'));
      this.scene.load.image('debby_sad',this.scene.CreatePath('/images/ingame/ingame_debby_sad.png'));
      this.scene.load.image('basket',this.scene.CreatePath('/images/ingame/ingame_basket.png'));
      this.scene.load.image('good',this.scene.CreatePath('/images/ingame/ingame_good_01.png'));
      this.scene.load.image('bad',this.scene.CreatePath('/images/ingame/ingame_bad_01.png'));
      this.scene.load.image('good2',this.scene.CreatePath('/images/ingame/ingame_good_02.png'));
      this.scene.load.image('bad2',this.scene.CreatePath('/images/ingame/ingame_bad_02.png'));
      this.scene.load.image('good3',this.scene.CreatePath('/images/ingame/ingame_good_03.png'));
      this.scene.load.image('bad3',this.scene.CreatePath('/images/ingame/ingame_bad_02.png'));

      this.scene.load.image('kosong',this.scene.CreatePath('/images/ingame/trans.png'));

      this.scene.load.image('score-window',this.scene.CreatePath('/images/uigame/ui_container_score.png'));
      this.scene.load.image('life',this.scene.CreatePath('/images/uigame/ingame_ui_live.png'));
      this.scene.load.image('unlife',this.scene.CreatePath('/images/uigame/ingame_ui_live_null.png'));
      this.scene.load.image('btn_pause',this.scene.CreatePath('/images/uigame/ui_button_pause.png'));
      this.scene.load.image('btn_resume',this.scene.CreatePath('/images/uigame/ui_button_resume.png'));
      this.scene.load.image('small_container',this.scene.CreatePath('/images/uigame/ui_panel_small.png'));

      this.scene.load.image('window-top',this.scene.CreatePath('/images/env/ingame_env_cloud_main.png'));
      this.scene.load.image('background_gameplay',this.scene.CreatePath('/images/env/ingame_still_backgound.png'));
      this.scene.load.image('trans_topcloud',this.scene.CreatePath('/images/env/ingame_env_cloud_second.png'));
      this.scene.load.video('cusotm', this.scene.CreatePath('/video/padoru.mp4'));
     }
}