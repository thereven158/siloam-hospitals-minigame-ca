import LoadingSceneController from "../loading_scene_controller";

export default class LoadingGameplayController {
    /** @param {LoadingSceneController} scene */
     constructor(scene){
       this.scene = scene;

     }

     loadResource(){
      this.scene.load.crossOrigin = 'anonymous';
      this.scene.load.image('debby',this.scene.CreatePath('/images/ingame/ingame_debby.png'));
      this.scene.load.image('debby_sad',this.scene.CreatePath('/images/ingame/ingame_debby_sad.png'));
      this.scene.load.image('debby_happy',this.scene.CreatePath('/images/ingame/ingame_debby_happy.png'));
      this.scene.load.image('basket',this.scene.CreatePath('/images/ingame/ingame_basket.png'));
      this.scene.load.image('good',this.scene.CreatePath('/images/ingame/ingame_good_01.png'));
      this.scene.load.image('bad',this.scene.CreatePath('/images/ingame/ingame_bad_01.png'));
      this.scene.load.image('good2',this.scene.CreatePath('/images/ingame/ingame_good_02.png'));
      this.scene.load.image('bad2',this.scene.CreatePath('/images/ingame/ingame_bad_02.png'));
      this.scene.load.image('good3',this.scene.CreatePath('/images/ingame/ingame_good_03.png'));
      this.scene.load.image('bad3',this.scene.CreatePath('/images/ingame/ingame_bad_03.png'));
      this.scene.load.image('good4',this.scene.CreatePath('/images/ingame/ingame_good_04.png'));
      this.scene.load.image('bad4',this.scene.CreatePath('/images/ingame/ingame_bad_04.png'));
      this.scene.load.image('good5',this.scene.CreatePath('/images/ingame/ingame_good_05.png'));
      this.scene.load.image('bad5',this.scene.CreatePath('/images/ingame/ingame_bad_05.png'));
      this.scene.load.image('bottom_bound',this.scene.CreatePath('/images/ingame/bottom_bound.png'));

      this.scene.load.image('kosong',this.scene.CreatePath('/images/ingame/trans.png'));

      this.scene.load.image('score-window',this.scene.CreatePath('/images/uigame/ui_container_score.png'));
      this.scene.load.image('life',this.scene.CreatePath('/images/uigame/ingame_ui_live.png'));
      this.scene.load.image('unlife',this.scene.CreatePath('/images/uigame/ingame_ui_live_null.png'));
      this.scene.load.image('btn_pause',this.scene.CreatePath('/images/uigame/ui_button_pause.png'));
      this.scene.load.image('btn_resume',this.scene.CreatePath('/images/uigame/ui_button_resume.png'));
      this.scene.load.image('btn_skip',this.scene.CreatePath('/images/uigame/ui_button_close_skip.png'));
      this.scene.load.image('small_container',this.scene.CreatePath('/images/uigame/ui_panel_small.png'));

      this.scene.load.image('window-top',this.scene.CreatePath('/images/env/ingame_env_cloud_main.png'));
      this.scene.load.image('background_gameplay',this.scene.CreatePath('/images/env/ingame_still_backgound.png'));
      this.scene.load.image('trans_topcloud',this.scene.CreatePath('/images/env/ingame_env_cloud_second.png'));
      this.scene.load.video('cusotm', this.scene.CreatePath('/video/padoru.mp4'));
      // this.scene.load.video('cusotm', this.scene.CreatePath("https://storage.googleapis.com/bucket-storage-siloam-hospital.gf.agatedev.net/23b57541562146e5b64a688d6db43134.mp4?GoogleAccessId=siloam-hospital-sa@agate-gamification.iam.gserviceaccount.com&Expires=1580895285&Signature=R7Ip2X%2B2359F4kguUv8dsjTUhpR1z7OJauWMQj%2Bs5kj7JytY00lkWFyJ2ekQM%2F1TgdqST7LM7r1ISNVt9Nfgz11ZWh6lSWLDrlxk1hxyeyb5oKzQBprNknf3fF9yiWQk2jIrs0ElsjAKJjtNgKURGNlVp3gKDgGe11uWhdEa3fmcKRl%2Be5L4Jp%2BJ9IkdWJzv19pv7eVXapXxk0hY78sOEyhlpz2UFmQy14Iv2yw18yy3uNkxLRfKAICJg9N2uCXklGQlcYXYNzAzlyzXakAhLVhrJ5iKqDEz3I%2FYakXH0iE7Xv1tpSxQX72SREr9bsUT%2FErj4vK%2F0Eu4NjIYQvNWXw%3D%3D"));
      
      this.scene.load.image('cusotm2', this.scene.CreatePath('/video/catree.png'));
     }
}