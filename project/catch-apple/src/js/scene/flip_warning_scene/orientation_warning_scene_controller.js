import ScreenUtility from '../../module/screen/screen_utility';
import OrientationWarningController from './flip_warning/orientation_warning_controller';
import OrientationWarningSceneView from './orientation_warning_scene_view';

export default class OrientationWarningSceneController extends Phaser.Scene
{    
    constructor()
	{
        super(
        {
            key: 'OrientationWarningScene'
        });
	}
	
	preload() 
	{
		// SILAKAN DIGANTI PATH IMAGENYA SESUAI KEPERLUAN
		this.load.image("title_background","images/orientation_warning/UI_Title-bg-min.png");
		this.load.image("dark_panel","images/orientation_warning/dark_panel.png");     
		
		// SILAKAN DIGANTI PATH IMAGENYA SESUAI KEPERLUAN
		this.load.image("medium_panel","images/orientation_warning/UI_Panel-medium-min.png"); 
		this.load.image("warning_image","images/orientation_warning/Warning.png");
	}

    init()
	{
        
    }

    create()
    {
		this.ScreenUtility = ScreenUtility.getInstance();
		this.createView();

		this.createOrientationWarning();			
	}
	
	update()
	{
		
	}

	createOrientationWarning()
	{
		let assets = {
			medium_panel:"medium_panel",
			warning_image:"warning_image",
		}

        this.orientationWarning = new OrientationWarningController(this, assets);
	}

	createView()
	{
		/*let assets = {
			title_background:"title_background",
			dark_panel:"dark_panel",
		}*/

		this.view = new OrientationWarningSceneView(this);
	}	

	createEvents()
	{
		
	}

}
