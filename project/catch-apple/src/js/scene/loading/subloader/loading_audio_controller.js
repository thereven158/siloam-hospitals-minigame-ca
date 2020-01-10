import LoadingSceneController from "../loading_scene_controller";

export default class LoadingAudioController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.audio('menu_music', this.scene.CreatePath('/audios/bgm_mainmenu.ogg'));
        this.scene.load.audio('ingame_music', this.scene.CreatePath('/audios/bgm_ingame.ogg'));
        this.scene.load.audio('audio_btn_click', this.scene.CreatePath('/audios/ui_button_play.ogg'));
        this.scene.load.audio('audio_btn_close', this.scene.CreatePath('/audios/ui_button_quit.ogg'));
        this.scene.load.audio('catch_good', this.scene.CreatePath('/audios/Game_CatchGood.ogg'));
        this.scene.load.audio('catch_bad', this.scene.CreatePath('/audios/Game_CatchBad.ogg'));
        this.scene.load.audio('game_over', this.scene.CreatePath('/audios/bgm_result.ogg'));
        this.scene.load.audio('swipe_sfx', this.scene.CreatePath('/audios/Game_Swipe.ogg'));
     }
}