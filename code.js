var gameSettings = {
    playerSpeed: 200,
}

var config = {
    width: 768,
    height: 432,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade:{
            debug: true,
            gravity: { y: 0}
        },
    }
}
var game = new Phaser.Game(config);
let platforms;
let player;
let cursors;

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}
