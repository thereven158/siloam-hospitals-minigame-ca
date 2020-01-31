import ScreenUtility from "../../module/screen/screen_utility";
import Image from "../../module/objects/image";
import Text from "../../module/objects/text";

export default class WarningSceneView 
{
	constructor(scene, assets) {
		this.scene = scene;
		this.screen = ScreenUtility.getInstance();
		this.assets = assets;

        this.centerX = this.screen.CenterX;
        this.centerY = this.screen.CenterY;
        this.width = this.screen.GameWidth;
        this.height = this.screen.GameHeight;
        this.dwidth = this.screen.GameDefaultWidth;
        this.dheight = this.screen.GameDefaultHeight;
	}

	CreateBackground = () => {
		var background = new Image(this.scene, this.centerX, this.centerY, this.assets.background);
		background.setDisplayHeight(this.height, true);

		var box = this.scene.add.rectangle(this.centerX, this.centerY, this.width, this.height, 0x000000);
		box.setAlpha(0.5);
		// box.visible = false;
		console.log("create warning scene1");

		return box;
	}

	SetResponsiveScale = (size) => {
		if ((this.width / this.height) <= 9/16) {
			return size*(this.width / this.dwidth);
		}
		else {
			return size*(this.height / this.dheight);
		}
	}

	CreateBoard = (down, size) => {
		this.down = down;
		this.boardSize = size;
		var y = this.centerY + this.SetResponsiveScale(down);
		var outerboard = new Image(this.scene, this.centerX, y, this.assets.outerboard);
		outerboard.setScale(this.SetResponsiveScale(size));
		// outerboard.visible = false;

		var maintenanceY = outerboard.y - this.SetResponsiveScale(300);
		var maintenance = new Image(this.scene, this.centerX, maintenanceY, this.assets.maintenance);
		maintenance.setScale(this.SetResponsiveScale(size/2));
		// maintenance.visible = false;

		var descY = outerboard.y + this.SetResponsiveScale(30);
		var desc = new Text(this.scene, this.centerX, descY, 'Oops, Something went wrong!. Check your internet connection or refresh the game!', {
			align: 'center',
			fontFamily: 'helsinki',
			color: '#e94360',
			wordWrap: { width: outerboard.displayWidth - this.SetResponsiveScale(100)}
		}).setFontSizeR(40);
		desc.setOrigin(0.5, 0);
		// desc.visible = false;

		var buttonY = outerboard.y + this.SetResponsiveScale(550);
		var button = new Image(this.scene, this.centerX, buttonY, this.assets.button);
		button.setScale(this.SetResponsiveScale(size));
		button.setInteractive();
		// button.visible = false;

		var iconX = this.centerX - (button.displayWidth/2) + this.SetResponsiveScale(75);
		var icon = new Image(this.scene, iconX, buttonY, this.assets.icon);
		icon.setScale(this.SetResponsiveScale(size/2));

		var buttonTextX = this.centerX + (icon.displayWidth/2);
		var buttonText = new Text(this.scene, buttonTextX, buttonY, 'Refresh', {
			align: 'center',
			fontFamily: 'helsinki',
			color: '#e94360'
		}).setFontSizeR(60);

		return {
			outerboard: outerboard,
			maintenance: maintenance,
			desc: desc,
			button: button,
			icon: icon,
			buttonText: buttonText
		};
	}

	ButtonPress = (button, OnPressed) => {
		button.removeAllListeners();
		button.on('pointerdown', () => {
    		button.setTexture(this.assets.buttonPressed);
    	});
    	button.on('pointerup', () => {
    		button.setTexture(this.assets.button);
    		OnPressed();
    	});
	}
}