import ScreenUtility from "../../module/screen/screen_utility";
import Image from "../../module/objects/image";
import Text from "../../module/objects/text";

export default class LeaderboardView 
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
        // this.scale = this.screen.ScalePercentage;

        this.down = 0;
        this.boardSize = 0;
	}

	CreateBackground = () => {
        var box = this.scene.add.rectangle(this.centerX, this.centerY, this.width, this.height, 0x000000);
        box.setDepth(14);
		box.setAlpha(0.5);
		box.visible = false;

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

	CreateOuterBoard = (down, size) => {
		this.down = down;
		this.boardSize = size;
		var y = this.centerY + this.SetResponsiveScale(down);
		var outerboard = new Image(this.scene, this.centerX, y, this.assets.outerboard);
		outerboard.setScale(this.SetResponsiveScale(size));
        outerboard.visible = false;

		var signY = outerboard.y - (outerboard.displayHeight/2) - this.SetResponsiveScale(30);
		var signX = outerboard.x - (outerboard.displayWidth/2) + this.SetResponsiveScale(40);
		var sign = new Text(this.scene, signX, signY, 'LEADERBOARD', {
			align: 'left',
			fontFamily: 'helsinki',
			color: '#FFFFFF'
		});
		sign.setFontSize(this.SetResponsiveScale(80));
		sign.setOrigin(0, 0.5);
		sign.visible = false;

		var closeY = signY;
		var closeX = this.centerX + (outerboard.displayWidth/2) - this.SetResponsiveScale(20);
		var close = new Image(this.scene, closeX, closeY, this.assets.closeButton);
		close.setOrigin(1,0.5);
		close.setScale(this.SetResponsiveScale(size));
		close.setInteractive();
		close.visible = false;

		return {
			outerboard: outerboard,
			sign: sign,
			close: {
				click: false,
				button: close
			}
		};
	}

	CreateInnerBoard = (index) => {
		var y = this.centerY + this.SetResponsiveScale(this.down + 50);
		var innerboard = new Image(this.scene, this.centerX, y, this.assets.innerboard);
		innerboard.setScale(this.SetResponsiveScale(this.boardSize));
		innerboard.visible = false;

		var rankX = this.centerX - this.SetResponsiveScale(275);
		var rankY = y - (innerboard.displayHeight/2) - this.SetResponsiveScale(35);
		var rank = new Text(this.scene, rankX, rankY, 'Rank', {
			align: 'center',
			fontFamily: 'helsinki',
			color: '#1849A0'
		});
		rank.setFontSize(this.SetResponsiveScale(35));
		rank.visible = false;

		var nameX = rankX + this.SetResponsiveScale(80);
		var name = new Text(this.scene, nameX, rankY, 'Name', {
			align: 'center',
			fontFamily: 'helsinki',
			color: '#1849A0'
		});
		name.setFontSize(this.SetResponsiveScale(35));
		name.setOrigin(0,0.5);
		name.visible = false;

		var scoreX = this.centerX + this.SetResponsiveScale(250);
		var score = new Text(this.scene, scoreX, rankY, 'Score', {
			align: 'center',
			fontFamily: 'helsinki',
			color: '#1849A0'
		});
		score.setFontSize(this.SetResponsiveScale(35));
		score.visible = false;

		var innerBoardHeight = innerboard.displayHeight - this.SetResponsiveScale(15);
		var dataX = {
			rankX: rankX,
			nameX: nameX,
			scoreX: scoreX
		}
		var boxes = [];
		var data = {
			userName: ' ',
			score: 0
		}
		for (var i = 0; i < 10; i++) {
			var box = this.CreateBox(i, y, innerBoardHeight, index, dataX, data);
			boxes.push(box);
		}

		var playerBox = this.CreatePlayerBox(index, data);

		return {
			innerboard: innerboard,
			rank: rank,
			name: name,
			score: score,
			boxes: boxes,
			playerBox: playerBox
		};
	}

	CreateBanner = (title) => {
		var y = this.centerY + this.SetResponsiveScale(this.down - 575);
		var banner = new Image(this.scene, this.centerX, y, this.assets.banner);
		banner.setScale(this.SetResponsiveScale(this.boardSize));
		banner.visible = false;

		var x = banner.x + this.SetResponsiveScale(50);
		var title = new Text(this.scene, x, y, title, {
			align: 'center',
			fontFamily: 'helsinki',
			color: '#1849A0'
		});
		title.setFontSize(this.SetResponsiveScale(45));
		title.visible = false;

		return {
			banner: banner,
			title: title
		};
	}

	CreateBox = (index, boardY, boardSize, playerIndex, dataX, data) => {
		var y = boardY + ((boardSize/10) * (index - 5));
		var box;
		if (index == playerIndex) 
			box = new Image(this.scene, this.centerX, y, this.assets.playerBox);
		else if (index < 3) 
			box = new Image(this.scene, this.centerX, y, this.assets.topBox);
		else 
			box = new Image(this.scene, this.centerX, y, this.assets.box);
		box.setScale(this.SetResponsiveScale(this.boardSize));
		box.y += (boardSize/20);
		box.visible = false;

		var rank = new Text(this.scene, dataX.rankX, box.y, index+1, {
			align: 'center',
			fontFamily: 'helsinki',
			color: '#FFFFFF'
		});
		rank.setFontSize(this.SetResponsiveScale(35));
		rank.visible = false;

		var name = new Text(this.scene, dataX.nameX, box.y, data.userName, {
			align: 'center',
			fontFamily: 'helsinki',
			color: '#FFFFFF'
		});
		name.setFontSize(this.SetResponsiveScale(35));
		name.setOrigin(0, 0.5);
		name.visible = false;

		var score = new Text(this.scene, dataX.scoreX, box.y, data.score, {
			align: 'center',
			fontFamily: 'helsinki',
			color: '#FFFFFF'
		});
		score.setFontSize(this.SetResponsiveScale(35));
		score.visible = false;

		return {
			box: box,
			rank: rank,
			name: name,
			score: score
		}
	}

	CreatePlayerBox = (playerRank, data) => {
		var y = this.centerY + this.SetResponsiveScale(this.down + 610);
		var playerBox = new Image(this.scene, this.centerX, y, this.assets.playerBoxMain);
		playerBox.setScale(this.SetResponsiveScale(this.boardSize));
		playerBox.visible = false;

		var rankX = this.centerX - this.SetResponsiveScale(300);
		var rank = new Text(this.scene, rankX, y, playerRank+1, {
			align: 'center',
			fontFamily: 'helsinki',
			color: '#FFFFFF'
		});
		rank.setFontSize(this.SetResponsiveScale(40));
		rank.visible = false;

		var nameX = rankX + this.SetResponsiveScale(75);
		var name = new Text(this.scene, nameX, y, data.userName, {
			align: 'center',
			fontFamily: 'helsinki',
			color: '#FFFFFF'
		});
		name.setFontSize(this.SetResponsiveScale(40));
		name.setOrigin(0,0.5);
		name.visible = false;

		var scoreX = this.centerX + this.SetResponsiveScale(275);
		var score = new Text(this.scene, scoreX, y, data.score, {
			align: 'center',
			fontFamily: 'helsinki',
			color: '#FFFFFF'
		});
		score.setFontSize(this.SetResponsiveScale(40));
		score.visible = false;

		return {
			box: playerBox,
			rank: rank,
			name: name,
			score: score
		}
	}

	ClosePress = (button, OnPressed) => {
		button.button.on('pointerdown', () => {
			button.click = true;
    		button.button.setTexture(this.assets.closeButtonPress);
    	});
    	button.button.on('pointerup', () => {
    		if (button.click) {
    			button.click = false;
    			button.button.setTexture(this.assets.closeButton);
    			OnPressed();
    		}
    	});
    	button.button.on('pointerout', () => {
    		if (button.click) {
    			button.click = false;
    			button.button.setTexture(this.assets.closeButton);
    		}
    	});
	}

	Fill = (innerboard, playerData, playerRank) => {

		playerData.forEach((data, index) => {
			innerboard.boxes[index].name.text = data.userName;
            innerboard.boxes[index].score.text = data.score;
        });

		for (var i = playerData.length; i < innerboard.boxes.length; i++) {
			innerboard.boxes[i].name.text = '(Empty)';
			innerboard.boxes[i].score.text = '-';
		}

		if (playerRank == null) {
			innerboard.playerBox.rank.text = '-';
			innerboard.playerBox.name.text = '(Empty)';
			innerboard.playerBox.score.text = '-';
		}
		else {
			var rank = playerRank.rank - 1;
			if (rank == -1) {
				innerboard.playerBox.rank.text = '-';
			}
			else {
				innerboard.playerBox.rank.text = playerRank.rank;
                innerboard.boxes[rank].box.setTexture(this.assets.playerBox);
			}
			innerboard.playerBox.name.text = playerRank.userName;
			innerboard.playerBox.score.text = playerRank.score;
		}
	}

	Enable = (box, container) => {
        container.setDepth(15);
		if (container.getAll('visible', false).length > 0) {
			var allItem = container.getAll('visible', false);
			allItem.forEach((item, index) => {
				item.visible = true;
			})
		}
		if (!container.visible) 
			container.visible = true;
		if (!box.visible) 
			box.visible = true;
		var tween = this.scene.tweens.add({
            targets: container,
            y: 0,
            duration: 750,
            ease: 'Back'
        });
	}

	Disable = (box, container, onComplete) => {
		if (container.visible) {
			var tween = this.scene.tweens.add({
				targets: container,
				alpha: 0,
				duration: 250,
				ease: 'Linear',
				onComplete: () => {
					container.visible = false;
					container.alpha = 1;
					container.y += this.SetResponsiveScale(1300);
				}
			});
			var tween2 = this.scene.tweens.add({
				targets: box,
				alpha: 0,
				duration: 300,
				ease: 'Linear',
				onComplete: () => {
					box.visible = false;
					box.alpha = 0.5;
					onComplete();
				}
			});
		}
	}
}
