import LoadingSceneController from "../loading_scene_controller";

export default class LoadingTitleController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

    
     }

     loadResource(){
        this.scene.load.crossOrigin = "Anonymous";
        this.scene.load.image('btn_play', this.scene.CreatePath('/images/uigame/ui_button_play_effect.png'));
        this.scene.load.image('btn_setting', this.scene.CreatePath('/images/uigame/ui_button_settings.png'));
        this.scene.load.image('btn_tutorial', this.scene.CreatePath('/images/uigame/ui_button_tutorial.png'));
        this.scene.load.image('btn_leaderboard', this.scene.CreatePath('/images/uigame/ui_button_leaderboard.png'));
        this.scene.load.image('main_picture', this.scene.CreatePath('/images/uigame/ui_debby_groceries_title.png'));
        this.scene.load.image('btn_close', this.scene.CreatePath('/images/uigame/ui_button_exit_small.png'));
        this.scene.load.image('sound_off',this.scene.CreatePath('/images/uigame/ui_toggle_sound_off.png'));
        this.scene.load.image('sound_on',this.scene.CreatePath('/images/uigame/ui_toggle_sound_on.png'));
        this.scene.load.image('btn_normal',this.scene.CreatePath('/images/uigame/ui_button_regular.png'));
        this.scene.load.image('btn_pressed',this.scene.CreatePath('/images/uigame/ui_button_regular_pressed.png'));
        this.scene.load.image('btn_play_pressed',this.scene.CreatePath('/images/uigame/ui_button_regular_on.png'));
        this.scene.load.image('btn_close_pressed',this.scene.CreatePath('/images/uigame/ui_button_close_pressed.png'));
        this.scene.load.image('btn_setting_pressed',this.scene.CreatePath('/images/uigame/ui_button_settings_pressed.png'));
        this.scene.load.image('btn_skip_pressed',this.scene.CreatePath('/images/uigame/ui_button_close_skip_pressed.png'));

        this.scene.load.image('icon_next',this.scene.CreatePath('/images/uigame/ui_icon_next.png'));
        this.scene.load.image('icon_play',this.scene.CreatePath('/images/uigame/ui_icon_play_b.png'));
        this.scene.load.image('icon_play_pressed',this.scene.CreatePath('/images/uigame/ui_icon_play.png'));
        this.scene.load.image('icon_exit',this.scene.CreatePath('/images/uigame/ingame_ui_exit_icon.png'));
        this.scene.load.image('icon_retry',this.scene.CreatePath('/images/uigame/ingame_ui_retry_icon.png'));
        this.scene.load.image('icon_tutorial',this.scene.CreatePath('/images/uigame/ui_icon_tutorial.png'));
        this.scene.load.image('icon_leaderboard',this.scene.CreatePath('/images/uigame/ui_icon_leaderboard.png'));
        this.scene.load.image('banner_leaderboard',this.scene.CreatePath('/images/uigame/ui_illustration_long.png'));
        this.scene.load.image('icon_mainmenu',this.scene.CreatePath('/images/uigame/ui_icon_main_menu.png'));
           
        this.scene.load.image('background_menu', this.scene.CreatePath('/images/env/ingame_env_background_main.png'));
        this.scene.load.image('background_tree', this.scene.CreatePath('/images/env/ingame_env_background_second.png'));
        this.scene.load.image('background_cloud', this.scene.CreatePath('/images/env/ingame_env_cloud_ornaments.png'));

        this.scene.load.image('bg_black', this.scene.CreatePath('/images/uigame/Bg_black.png'));
        this.scene.load.image('bg_white', this.scene.CreatePath('/images/uigame/box_white.png'));

        this.scene.load.image('tutorial', this.scene.CreatePath('/images/tutorial/ui_illustration_tutorial_01.png'));
        this.scene.load.image('tutorial2', this.scene.CreatePath('/images/tutorial/ui_illustration_tutorial_02.png'));
        this.scene.load.image('tutorial3', this.scene.CreatePath('/images/tutorial/ui_illustration_tutorial_03.png'));
        this.scene.load.image('tutorial4', this.scene.CreatePath('/images/tutorial/ui_illustration_tutorial_04.png'));

        //warning screen
        this.scene.load.image('background_warning', this.scene.CreatePath('/images/warning/background.png'));
        this.scene.load.image('lb_outer_board', this.scene.CreatePath('/images/warning/lb_outer_board.png'));
        this.scene.load.image('maintenance', this.scene.CreatePath('/images/warning/maintenance.png'));
        this.scene.load.image('refresh_ico', this.scene.CreatePath('/images/warning/refresh_ico.png'));
        this.scene.load.image('regular_btn_warning', this.scene.CreatePath('/images/warning/regular_btn.png'));
        this.scene.load.image('regular_btn_pressed_warning', this.scene.CreatePath('/images/warning/regular_btn_pressed.png'));
        
        //leaderboard
        this.scene.load.image('bg_top3',this.scene.CreatePath('/images/uigame/ui_panel_user_top.png'));
        this.scene.load.image('bg_non_top3',this.scene.CreatePath('/images/uigame/ui_panel_user_regular.png'));
        this.scene.load.image('bg_current_rank',this.scene.CreatePath('/images/uigame/ui_panel_user_main.png'));
        this.scene.load.image('bg_current__rank_big',this.scene.CreatePath('/images/uigame/ui_panel_user_main_big.png'));
        this.scene.load.image('lb_inner_board',this.scene.CreatePath('/images/uigame/ui_panel_large_leaderboard.png'));

     }
}