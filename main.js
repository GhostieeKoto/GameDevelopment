var gameSettings = {
    playerSpeed: 200,
}

var config = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    scene: [Preload, MainMenu, GameStartCutscene, WorldOneLevelOne],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade:{
            debug: true,
            gravity: { y: 500}
        },
    }
}
var game = new Phaser.Game(config);
let platforms;
let StartGame;
let player;
let cursors;
let playerx;
let playery;

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}