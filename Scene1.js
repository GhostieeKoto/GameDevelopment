class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }
    create() {
        this.add.text(20, 20, "Loading game...", {font: '25px Arial', fill: 'red'});
        setTimeout(5000, )
        this.scene.start("playGame");
    }

}
