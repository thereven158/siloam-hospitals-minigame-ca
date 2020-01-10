import ScreenUtility from "../module/screen/screen_utility";
import SpawnPoint from '../subcontroller/spawn_point';

export default class SpawnerController {

    /** @param {Phaser.Scene} scene */
    constructor(scene){
        this.scene = scene;
        this.ScreenUtility = ScreenUtility.getInstance();

    }

    create(){

        this.spawnPoint = new SpawnPoint(this.scene).create();

        this.levelOneLeft = [];
        this.levelOneMid = [];
        this.levelOneRight = [];

        this.lvlOneLeftGroup = this.scene.add.group();
        this.lvlOneMidGroup = this.scene.add.group();
        this.lvlOneRightGroup = this.scene.add.group();

        this.levelTwoLeft = [];
        this.levelTwoMid = [];
        this.levelTwoRight = [];

        this.lvlTwoLeftGroup = this.scene.add.group();
        this.lvlTwoMidGroup = this.scene.add.group();
        this.lvlTwoRightGroup = this.scene.add.group();

        this.levelThreeLeft = [];
        this.levelThreeMid = [];
        this.levelThreeRight = [];

        this.lvlThreeLeftGroup = this.scene.add.group();
        this.lvlThreeMidGroup = this.scene.add.group();
        this.lvlThreeRightGroup = this.scene.add.group();

        this.point1X = this.ScreenUtility.GameWidth * 0.5 * 0.5;
        this.point1Y = 0;
        
        this.point2X = this.ScreenUtility.CenterX;

        this.point3X = this.ScreenUtility.CenterX + this.point1X;

        this.misc0 = "kosong";
        this.misc1 = "bad";
        this.misc2 = "good";

        this.spawn1;
        this.spawn2;
        this.spawn3;

        this.rateSpawn = 5000;

        // this.initiateFood();
        this.initLevelOneLeft();
        this.initLevelOneMid();
        this.initLevelOneRight();

        this.initLevelTwoLeft();
        this.initLevelTwoMid();
        this.initLevelTwoRight();
    }

    initLevelOneLeft(){
        this.levelOneLeft.push(this.misc2);
        this.levelOneLeft.push(this.misc1);
        this.levelOneLeft.push(this.misc0);
        this.levelOneLeft.push(this.misc0);
        this.levelOneLeft.push(this.misc2);
        this.levelOneLeft.push(this.misc1);
        this.levelOneLeft.push(this.misc2);
        this.levelOneLeft.push(this.misc0);
        this.levelOneLeft.push(this.misc0);
        this.levelOneLeft.push(this.misc2);
    }

    initLevelOneMid(){
        this.levelOneMid.push(this.misc0);
        this.levelOneMid.push(this.misc2);
        this.levelOneMid.push(this.misc0);
        this.levelOneMid.push(this.misc2);
        this.levelOneMid.push(this.misc0);
        this.levelOneMid.push(this.misc0);
        this.levelOneMid.push(this.misc0);
        this.levelOneMid.push(this.misc1);
        this.levelOneMid.push(this.misc0);
        this.levelOneMid.push(this.misc1);
    }

    initLevelOneRight(){
        this.levelOneRight.push(this.misc0);
        this.levelOneRight.push(this.misc0);
        this.levelOneRight.push(this.misc1);
        this.levelOneRight.push(this.misc0);
        this.levelOneRight.push(this.misc1);
        this.levelOneRight.push(this.misc2);
        this.levelOneRight.push(this.misc0);
        this.levelOneRight.push(this.misc0);
        this.levelOneRight.push(this.misc2);
        this.levelOneRight.push(this.misc0);
    }

    initLevelTwoLeft(){
        this.levelTwoLeft.push(this.misc0);
        this.levelTwoLeft.push(this.misc1);
        this.levelTwoLeft.push(this.misc0);
        this.levelTwoLeft.push(this.misc0);
        this.levelTwoLeft.push(this.misc2);
        this.levelTwoLeft.push(this.misc0);
        this.levelTwoLeft.push(this.misc0);
        this.levelTwoLeft.push(this.misc2);
        this.levelTwoLeft.push(this.misc1);
        this.levelTwoLeft.push(this.misc2);
    }

    initLevelTwoMid(){
        this.levelTwoMid.push(this.misc2);
        this.levelTwoMid.push(this.misc0);
        this.levelTwoMid.push(this.misc0);
        this.levelTwoMid.push(this.misc2);
        this.levelTwoMid.push(this.misc1);
        this.levelTwoMid.push(this.misc1);
        this.levelTwoMid.push(this.misc0);
        this.levelTwoMid.push(this.misc0);
        this.levelTwoMid.push(this.misc0);
        this.levelTwoMid.push(this.misc0);
    }

    initLevelTwoRight(){
        this.levelTwoRight.push(this.misc0);
        this.levelTwoRight.push(this.misc0);
        this.levelTwoRight.push(this.misc2);
        this.levelTwoRight.push(this.misc1);
        this.levelTwoRight.push(this.misc0);
        this.levelTwoRight.push(this.misc0);
        this.levelTwoRight.push(this.misc2);
        this.levelTwoRight.push(this.misc1);
        this.levelTwoRight.push(this.misc2);
        this.levelTwoRight.push(this.misc0);
    }

    initLevelThreeLeft(){
        this.levelThreeLeft.push(this.misc0);
    }

    initLevelThreeMid(){
        
    }

    initLevelThreeRight(){
        
    }

    LevelOne(){
        let countah = 1;

        this.spawn1 = this.scene.physics.add.image(this.point1X, this.point1Y, this.levelOneLeft[0]);
        this.spawn1.displayHeight = 150;
        this.spawn1.displayWidth = 150;

        this.spawn2 = this.scene.physics.add.image(this.point2X, this.point1Y, this.levelOneMid[0]);
        this.spawn2.displayHeight = 150;
        this.spawn2.displayWidth = 150;

        this.spawn3 = this.scene.physics.add.image(this.point3X, this.point1Y, this.levelOneRight[0]);
        this.spawn3.displayHeight = 150;
        this.spawn3.displayWidth = 150;

        this.lvlOneLeftGroup.add(this.spawn1);
        this.lvlOneMidGroup.add(this.spawn2);
        this.lvlOneRightGroup.add(this.spawn3);

        let interval = setInterval(() => {
            this.spawn1 = this.scene.physics.add.image(this.point1X, this.point1Y, this.levelOneLeft[countah]);
            // Phaser.Math.RND.pick('', );
            this.spawn1.displayHeight = 150;
            this.spawn1.displayWidth = 150;
            this.lvlOneLeftGroup.add(this.spawn1);

            this.spawn2 = this.scene.physics.add.image(this.point2X, this.point1Y, this.levelOneMid[countah]);
            this.spawn2.displayHeight = 150;
            this.spawn2.displayWidth = 150;
            this.lvlOneMidGroup.add(this.spawn2);
            
            this.spawn3 = this.scene.physics.add.image(this.point3X, this.point1Y, this.levelOneRight[countah]);
            this.spawn3.displayHeight = 150;
            this.spawn3.displayWidth = 150;
            this.lvlOneRightGroup.add(this.spawn3);

            
            countah++;

            this.setVelocity(400);

            if(countah >= 10){
                clearInterval(interval);
                this.rateSpawn -= 500;
                this.LevelTwo();
            }
        }, this.rateSpawn);

        this.setVelocity(500);
    }

    spawnLevel1Left(countah){
        this.spawn1 = this.scene.physics.add.image(this.point1X, this.point1Y, this.levelOneLeft[countah]);
    }

    LevelTwo(){
        let countah = 0;

        let interval = setInterval(() => {
            this.spawn1 = this.scene.physics.add.image(this.point1X, this.point1Y, this.levelTwoLeft[countah]);
            this.spawn1.displayHeight = 150;
            this.spawn1.displayWidth = 150;
            this.lvlTwoLeftGroup.add(this.spawn1);

            this.spawn2 = this.scene.physics.add.image(this.point2X, this.point1Y, this.levelTwoMid[countah]);
            this.spawn2.displayHeight = 150;
            this.spawn2.displayWidth = 150;
            this.lvlTwoMidGroup.add(this.spawn2);

            this.spawn3 = this.scene.physics.add.image(this.point3X, this.point1Y, this.levelTwoRight[countah]);
            this.spawn3.displayHeight = 150;
            this.spawn3.displayWidth = 150;
            this.lvlTwoRightGroup.add(this.spawn3);
            
            countah++;

            this.setVelocity(400);

            if(countah >= 10){
                clearInterval(interval);
                this.rateSpawn -= 500;
                this.LevelOne();
            }
        }, this.rateSpawn);
        this.setVelocity(400);
    }

    setVelocity(speed){
        this.spawn1.setVelocityY(speed);
        this.spawn2.setVelocityY(speed);
        this.spawn3.setVelocityY(speed);
    }
    
}
