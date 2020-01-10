import LoadingSceneController from "../loading_scene_controller";

export default class LoadingTitleController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.image('btn_play', this.scene.CreatePath('/images/uigame/ui_button_play_effect.png'));
        this.scene.load.image('btn_setting', this.scene.CreatePath('/images/uigame/ui_button_setting.png'));
        this.scene.load.image('btn_tutorial', this.scene.CreatePath('/images/uigame/ui_button_tutorial.png'));
        this.scene.load.image('btn_leaderboard', this.scene.CreatePath('/images/uigame/ui_button_leaderboard.png'));
        this.scene.load.image('main_picture', this.scene.CreatePath('/images/uigame/ui_debby_groceries_title.png'));
        this.scene.load.image('btn_close', this.scene.CreatePath('/images/uigame/ui_button_exit_small.png'));
        this.scene.load.image('sound_off',this.scene.CreatePath('/images/uigame/ui_toggle_sound_off.png'));
        this.scene.load.image('sound_on',this.scene.CreatePath('/images/uigame/ui_toggle_sound_on.png'));
        this.scene.load.image('btn_normal',this.scene.CreatePath('/images/uigame/ui_button_regular.png'));
        this.scene.load.image('btn_pressed',this.scene.CreatePath('/images/uigame/ui_button_regular_pressed.png'));
        this.scene.load.image('btn_play_pressed',this.scene.CreatePath('/images/uigame/ui_button_regular_on.png'));

        this.scene.load.image('icon_next',this.scene.CreatePath('/images/uigame/ui_icon_next.png'));
        this.scene.load.image('icon_play',this.scene.CreatePath('/images/uigame/ui_icon_play_b.png'));
        this.scene.load.image('icon_play_pressed',this.scene.CreatePath('/images/uigame/ui_icon_play.png'));
           
        this.scene.load.image('background_menu', this.scene.CreatePath('/images/env/ingame_env_background_main.png'));
        this.scene.load.image('background_tree', this.scene.CreatePath('/images/env/ingame_env_background_second.png'));
        this.scene.load.image('background_cloud', this.scene.CreatePath('/images/env/ingame_env_cloud_ornaments.png'));

        this.scene.load.image('bg_black', this.scene.CreatePath('/images/uigame/Bg_black.png'));
        this.scene.load.image('bg_white', this.scene.CreatePath('/images/uigame/box_white.png'));

        this.scene.load.image('tutorial', this.scene.CreatePath('/images/tutorial/ui_illustration_tutorial_01.png'));
        this.scene.load.image('tutorial2', this.scene.CreatePath('/images/tutorial/ui_illustration_tutorial_02.png'));
        this.scene.load.image('tutorial3', this.scene.CreatePath('/images/tutorial/ui_illustration_tutorial_03.png'));
        this.scene.load.image('tutorial4', this.scene.CreatePath('/images/tutorial/ui_illustration_tutorial_04.png'));
     }
}