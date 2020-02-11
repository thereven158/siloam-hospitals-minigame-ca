import Image from '../../../module/objects/image';
import Text from '../../../module/objects/text';

export default class OrientationWarningView
{    
    constructor(scene, assets={})
	{
		this.scene = scene;
		this.assets = assets;
		this.ScreenUtility = scene.ScreenUtility;
		
		this.create();
    }
	
	create()
	{
		this.createAudios();
		this.createHUD();
		this.resizeHUD();
	}
	
	createAudios()
	{
		
	}

	createHUD()
	{
		this.hudGroup = this.scene.add.group();
		
		this.createHeaderHUD();
		this.createFooterHUD();
		this.createMainHUD(); 
	}
	
	resizeHUD()
	{
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
		
		this.panel = new Image(this.scene, 0, 0, this.assets["medium_panel"]?this.assets["medium_panel"]:"medium_panel");		
		this.orientationWarningIcon = new Image(this.scene, 0, 0, this.assets["warning_image"]?this.assets["warning_image"]:"warning_image");	

		let warningStr = "GAME INI HANYA BISA DIMAINKAN PADA MODE POTRAIT.\nSILAKAN PUTAR DEVICE ANDA.";

		this.warningText = new Text(this.scene, 0, 0, warningStr, {fontFamily : "helsinki", align:'center', color: '#f0526c'});		
	}
	
	resizeMainHUD()
	{
		this.panel.setAngle(90);
		this.panel.setOrigin(0.5, 0.5);
		this.panel.setDisplayWidth(this.ScreenUtility.GameHeight * 0.75, true);
		this.panel.setPosition(this.ScreenUtility.GameWidth * 0.50, this.ScreenUtility.GameHeight * 0.50);

		this.orientationWarningIcon.setOrigin(0.5, 0.5);
      	this.orientationWarningIcon.setDisplayWidth(this.panel.displayWidth * 0.5, true);
		this.orientationWarningIcon.setPosition(this.panel.x, this.panel.y - this.panel.displayHeight * 0.1);

		this.warningText.setOrigin(0.5, 0);
		this.warningText.setWordWrapWidth(this.panel.displayHeight * 0.8);
		this.warningText.setFontSizeR(30);
		this.warningText.setPosition(this.orientationWarningIcon.x, this.orientationWarningIcon.y + this.orientationWarningIcon.displayHeight * 0.55);

		if (this.panel.displayWidth/this.ScreenUtility.GameWidth < 0.35)
		{
			this.warningText.setFontSizeR(20);
		}
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
