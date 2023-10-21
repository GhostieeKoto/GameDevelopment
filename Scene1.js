class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    create() {
        this.add.text(20, 20, "Loading game...", {font: '25px Comic sans', fill: 'red'});
        this.scene.start("playGame");
    }

}
