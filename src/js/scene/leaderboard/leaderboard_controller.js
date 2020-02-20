import LeaderboardView from "./leaderboard_view";
import ApiController from "../../module/api/api_controller";

export default class LeaderboardController
{
	constructor(scene, assets, title){
		this.scene = scene;
		this.view;
		this.api;

		this.box;
		this.outerboard;
		this.innerboard;
		this.banner;
		this.container;

		this.assets = assets;
		this.title = title;
	}

	init = () => {

	}

	create = (onClose = () => {}) => {
		this.api = ApiController.getInstance();
		this.view = new LeaderboardView(this.scene, this.assets);
		this.box = this.view.CreateBackground();
		this.outerboard = this.view.CreateOuterBoard(50, 1);
		this.banner = this.view.CreateBanner(this.title);
		this.view.ClosePress(this.outerboard.close, () => {
			this.hide(onClose);
		});
		this.innerboard = this.view.CreateInnerBoard(11);
		this.addToContainer();
	}

	show = () => {
		this.api.Leaderboard()
		.then(data => {
			console.log(data.data.data);
			// this.view.Fill(this.innerboard, data.data.data, data.myRank);
            this.view.Enable(this.box, this.container);
		})
		.catch(() => {
			this.scene.scene.start('WarningScene');
		});
	}

	hide = (onComplete) => {
		this.view.Disable(this.box, this.container, onComplete);
	}

	addToContainer = () => {
		this.container = this.scene.add.container(0,0);
		this.container.y += this.view.SetResponsiveScale(1300);

		this.container.add(this.outerboard.outerboard);
		this.container.add(this.outerboard.sign);
		this.container.add(this.outerboard.close.button);

		this.container.add(this.innerboard.innerboard);
		this.container.add(this.innerboard.rank);
		this.container.add(this.innerboard.name)
		this.container.add(this.innerboard.score);

		this.innerboard.boxes.forEach((box, index) => {
			this.container.add(box.box);
			this.container.add(box.rank);
			this.container.add(box.name);
			this.container.add(box.score);
		});

		this.container.add(this.innerboard.playerBox.box);
		this.container.add(this.innerboard.playerBox.rank);
		this.container.add(this.innerboard.playerBox.name);
		this.container.add(this.innerboard.playerBox.score);

		this.container.add(this.banner.banner);
		this.container.add(this.banner.title);

	}
}
