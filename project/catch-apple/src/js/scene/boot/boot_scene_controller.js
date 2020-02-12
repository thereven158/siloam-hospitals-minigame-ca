import LoaderController from '../../module/loader/loader_controller';
import ScreenUtility from '../../module/screen/screen_utility';
import AudioController from '../../module/audio/audio_controller';
import ApiController from '../../module/api/api_controller';
import OrientationHTMLWarningController from '../../module/flip_screen/orientation_html_warning_controller';


export default class BootSceneController extends Phaser.Scene{
    constructor(){
        super({key:'BootScene'});

        this.IsAudioOn = true;
    }

    init(){
        //console.log('boot screen');

        ScreenUtility.getInstance().init(this);
        ScreenUtility.ResetGameScreen();

        AudioController.getInstance().init(this, true);


    }
 
    preload(){
        Promise.all([
            LoaderController.getInstance().init(),
            ApiController.getInstance().init(1),
            OrientationHTMLWarningController.getInstance().Init(),
            LoaderController.getInstance()
				.loadFonts([
					{
						key: "panton",
						path: CONFIG.BASE_ASSET_URL + "/fonts/Panton-Regular.otf"
                    },
                    {
						key: "panton_bold",
						path: CONFIG.BASE_ASSET_URL + "/fonts/Panton-Bold.otf"
					},
                    {
						key: "helsinki",
						path: CONFIG.BASE_ASSET_URL + "/fonts/helsinki.ttf"
					}
				])        
        ]).then(() =>{
            if (ScreenUtility.getInstance().GameWidth > ScreenUtility.getInstance().GameHeight)
            {
                OrientationHTMLWarningController.getInstance().hideGame(true);
                OrientationHTMLWarningController.getInstance().setOnOrientationChangeEvent(() => {
                    location.reload();
                });

            }
            else
            {
                this.scene.start('LoadingScene');
            }
        }).catch((err) =>{
            // this.scene.start('WarningScene');
        })
    }
}