class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    create() {
        this.add.text(20, 20, "Loading game...", {font: '25px Arial', fill: 'red'});
        setTimeout( () => {this.scene.start("playGame")} , 1000);
    }

}
