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
            debug: false
        }
    }
}
var game = new Phaser.Game(config);