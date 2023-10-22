var gameSettings = {
    playerSpeed: 200,
}

var config = {
    width: 768,
    height: 432,
    backgroundColor: 0x000000,
    physics: {
        default: 'matter',
        matter: {
            gravity: { y: 0}
        }
    },
    scene: [Scene1, Scene2]
}
var game = new Phaser.Game(config);