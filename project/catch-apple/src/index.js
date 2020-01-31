import Phaser from 'phaser';

import BootScene from '../src/js/scene/boot/boot_scene_controller';
import LoadingScene from '../src/js/scene/loading/loading_scene_controller';
import TitleScene from '../src/js/scene/title/title_scene_controller';
import GameplayScene from '../src/js/scene/gameplay/gameplay_scene_controller';
import PauseScene from '../src/js/scene/pause/pause_scene_controller';
import WarningSceneController from '../src/js/scene/disconnected/warning_scene_controller';

let actualWidth = window.innerWidth < 480 ? window.innerWidth * window.devicePixelRatio : window.innerWidth;
let actualHeight = window.innerWidth < 480 ? window.innerHeight * window.devicePixelRatio : window.innerHeight;
let actualZoom = window.innerWidth < 480 ? 1 / window.devicePixelRatio : 1;
let isLandscape = window.innerWidth > window.innerHeight;
if(isLandscape){
  actualWidth = actualHeight * (3/4);
}
let phaserType = (navigator.userAgent.match(/Mozilla/i)) ? Phaser.AUTO: Phaser.CANVAS;

console.log("pixel ratio: " + window.devicePixelRatio);
console.log("innerHeigh: " + window.innerHeight);
console.log("actual: " + actualHeight);

console.log("innerWidth: " + window.innerWidth);
console.log("actual: " + actualWidth);

var config = {
	type: phaserType,
	canvas: document.getElementById('game'),
	parent: 'content',
	scale: {
		mode: Phaser.Scale.NONE,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: actualWidth,
		height: actualHeight,
		zoom: actualZoom
		
	},
	scene: [
		BootScene,
		LoadingScene, 
		TitleScene,
		WarningSceneController,
		GameplayScene,
		PauseScene
	],
	dom: {
		createContainer: true
	},
	render: {
		antiAlias: false,
		pixelArt: false,
		roundPixels: false,
		powerPreference: 'high-performance'
	},
	physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
	},
	autoRound: false
};

const game = new Phaser.Game(config);
