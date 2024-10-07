
class Preload extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

     preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('block', 'assets/block.png');
        this.load.image('zone', 'assets/zone.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 42 });
        this.load.spritesheet('lbhit', 'assets/luckyblockwhite.png', { frameWidth: 32, frameHeight: 64 });
        this.moveCam = false;
        console.log(Phaser.VERSION);
    }
    create() {
        this.add.text(20, 20, "Game Failed", {font: '25px Arial', fill: 'red'});
        this.scene.start("mainMenu");       
    }

}