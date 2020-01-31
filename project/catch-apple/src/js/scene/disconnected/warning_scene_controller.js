import WarningSceneView from "./warning_scene_view";

export default class WarningSceneController extends Phaser.Scene
{
	constructor() {
		super(
        {
            key: 'WarningScene'
        });
		this.view;
		this.assets = {
			background: 'background_warning',
			outerboard: 'lb_outer_board',
			maintenance: 'maintenance',
			button: 'regular_btn_warning',
			buttonPressed: 'regular_btn_pressed_warning',
			icon: 'refresh_ico'
		}

		this.board;
	}

	create = () => {
		console.log("create warning scene");
		this.view = new WarningSceneView(this, this.assets);
		this.view.CreateBackground();
		this.board = this.view.CreateBoard(0,1);
		this.view.ButtonPress(this.board.button, this.OnRefreshPress);
	}

	OnRefreshPress = () => {
		this.scene.start('TitleScene');
	}
}