class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("background", "/assets/menu/Backgrounds/GrassyMountains/Grassy_Mountains_preview_fullcolor.png");
        this.load.image("player", "/assets/sprites/Mario.png");
    }
    create() {
        this.add.text(20, 20, "Loading game...", {font: '25px Arial', fill: 'red'});
        setTimeout( () => {this.scene.start("playGame")} , 1000);
    }

}
