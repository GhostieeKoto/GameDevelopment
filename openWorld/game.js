var gameSettings = {
    playerSpeed: 200,
}

var config = {
    width: 800,
    height: 500,
    backgroundColor: 0x000000,
    scene: [LoadScene, GameScene],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade:{
            debug: false,
            gravity: { y: 0}
        },
    }
}
let game = new Phaser.Game(config);
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
