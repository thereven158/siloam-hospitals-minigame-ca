import LoadingSceneController from "../loading_scene_controller";

export default class LoadingAudioController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.audio('menu_music', this.scene.CreatePath('/audios/bgm_mainmenu.mp3'));
        this.scene.load.audio('ingame_music', this.scene.CreatePath('/audios/bgm_ingame.mp3'));
        this.scene.load.audio('audio_btn_click', this.scene.CreatePath('/audios/ui_button_play.mp3'));
        this.scene.load.audio('audio_btn_close', this.scene.CreatePath('/audios/ui_button_quit.mp3'));
        this.scene.load.audio('catch_good', this.scene.CreatePath('/audios/Game_CatchGood.mp3'));
        this.scene.load.audio('catch_bad', this.scene.CreatePath('/audios/Game_CatchBad.mp3'));
        this.scene.load.audio('game_over', this.scene.CreatePath('/audios/bgm_result.mp3'));
        this.scene.load.audio('swipe_sfx', this.scene.CreatePath('/audios/Game_Swipe.mp3'));
     }
}