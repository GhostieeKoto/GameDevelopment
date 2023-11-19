class Preload extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

     preload() {
        this.load.image('sky', 'assets2/sky.png');
        this.load.image('ground', 'assets2/platform.png');
        this.load.image('star', 'assets2/star.png');
        this.load.image('bomb', 'assets2/bomb.png');
        this.load.spritesheet('dude', 'assets2/dude.png', { frameWidth: 32, frameHeight: 48 });
    }
    create() {
        this.add.text(20, 20, "Loading game...", {font: '25px Arial', fill: 'red'});
        setTimeout( () => {this.scene.start("playGame")} , 1000);
        
    }

}