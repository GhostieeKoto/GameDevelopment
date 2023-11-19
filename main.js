var gameSettings = {
    playerSpeed: 200,
}

var config = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    scene: [Preload, Scene1],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade:{
            debug: false,
            gravity: { y: 500}
        },
    }
}
var game = new Phaser.Game(config);
let platforms;
let StartGame;
let player;
let cursors;

function preload() {
    this.load.image('sky', 'assets2/sky.png');
    this.load.image('ground', 'assets2/platform.png');
    this.load.image('star', 'assets2/star.png');
    this.load.image('bomb', 'assets2/bomb.png');
    this.load.spritesheet('dude', 'assets2/dude.png', { frameWidth: 32, frameHeight: 48 });
}