var gameSettings = {
    playerSpeed: 200,
}
const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },

};

var game = new Phaser.Game(config);
let platforms;
let player;
let cursors;