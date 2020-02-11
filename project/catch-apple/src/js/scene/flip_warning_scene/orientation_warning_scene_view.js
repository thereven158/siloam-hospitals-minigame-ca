import Image from '../../module/objects/image';

export default class OrientationWarningSceneView
{    
    constructor(scene, assets={})
	{
        this.scene = scene;
		this.ScreenUtility = scene.ScreenUtility;
		this.assets = assets;

		this.create();
    }
	
	create()
	{
		this.createHUD();
		this.resizeHUD();
	}
	

	createHUD()
	{
		this.background = new Image(this.scene, 0,0, this.assets["title_background"]?this.assets["title_background"]:"title_background");
		
		this.hudGroup = this.scene.add.group();

		this.darkPanel = new Image(this.scene, 0, 0, this.assets["dark_panel"]?this.assets["dark_panel"]:"dark_panel");
		this.darkPanel.alpha = 0.4;

		this.createHeaderHUD();
		this.createFooterHUD();
		this.createMainHUD(); 
	}
	
	resizeHUD()
	{
		this.background.setAngle(90);
		this.background.setOrigin(0.5, 0.5);
      	this.background.setDisplayWidth(this.ScreenUtility.GameWidth * 1, true);
		this.background.setPosition(this.ScreenUtility.GameWidth * 0.5, this.ScreenUtility.GameHeight * 0.5);

		if (this.background.displayHeight < this.ScreenUtility.GameHeight)
		{
			this.background.displayHeight(this.ScreenUtility.GameHeight * 1, true);
		}

		this.darkPanel.setAngle(90);
		this.darkPanel.setOrigin(0.5, 0.5);
		this.darkPanel.setDisplayHeight(this.ScreenUtility.GameHeight * 1, true);
		this.darkPanel.setPosition(this.ScreenUtility.GameWidth * 0.5, this.ScreenUtility.GameHeight * 0.5);
	  
		if (this.darkPanel.displayWidth < this.ScreenUtility.GameWidth)
		{
			this.darkPanel.setDisplayWidth(this.ScreenUtility.GameWidth * 1, true);
		}		

		this.resizeHeaderHUD();
		this.resizeFooterHUD();
		this.resizeMainHUD();
	}
	
	createHeaderHUD()
	{
		this.headerContainer = this.scene.add.container();
		this.hudGroup.add(this.headerContainer);
	}
	
	resizeHeaderHUD()
	{


	}

	createMainHUD()
	{
		this.mainContainer = this.scene.add.container();		
		this.hudGroup.add(this.mainContainer);
	}
	
	resizeMainHUD()
	{
		
	}

	createFooterHUD()
	{
		this.footerContainer = this.scene.add.container();
		this.hudGroup.add(this.footerContainer);
	}
	
	resizeFooterHUD()
	{
		
	}

}
