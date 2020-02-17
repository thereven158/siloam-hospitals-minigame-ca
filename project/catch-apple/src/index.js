import Phaser from 'phaser';
import './css/index.css';

import BootScene from '../src/js/scene/boot/boot_scene_controller';
import LoadingScene from '../src/js/scene/loading/loading_scene_controller';
import TitleScene from '../src/js/scene/title/title_scene_controller';
import GameplayScene from '../src/js/scene/gameplay/gameplay_scene_controller';
import PauseScene from '../src/js/scene/pause/pause_scene_controller';
import WarningSceneController from '../src/js/scene/disconnected/warning_scene_controller';

let actualWidth = window.innerWidth < 480 ? window.innerWidth * window.devicePixelRatio : window.innerWidth;
let actualHeight = window.innerWidth < 480 ? window.innerHeight * window.devicePixelRatio : window.innerHeight;
let actualZoom = window.innerWidth < 480 ? 1 / window.devicePixelRatio : 1;

let phaserType = (navigator.userAgent.match(/Mozilla/i)) ? Phaser.AUTO: Phaser.CANVAS;

let isLandscape = window.innerWidth > window.innerHeight;
let renderType = Phaser.CANVAS;

if (/Firefox/i.test(navigator.userAgent)){
	renderType = Phaser.WEBGL;
}

if (isLandscape) {
	if (!/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)){
		actualWidth = actualHeight * (actualHeight/actualWidth);
	}
}

if (document.getElementById('game') == null)
{
	let canvas = document.createElement("CANVAS");
	canvas.setAttribute("id", "game");
	document.body.appendChild(canvas);
}


console.log("pixel ratio: " + window.devicePixelRatio);
console.log("innerHeigh: " + window.innerHeight);
console.log("actual: " + actualHeight);

console.log("innerWidth: " + window.innerWidth);
console.log("actual: " + actualWidth);

console.log("zoomed: " + actualZoom);

var config = {
	type: renderType,
	canvas: document.getElementById('game'),
	parent: 'content',
	scale: {
		mode: Phaser.Scale.NONE,
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
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
