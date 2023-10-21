class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");


    }

    create(){
        this.add.text(20,20,"Playing game", {font: '25px Comic sans', fill: 'green' });
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0,0);
        this.player = this.add.image(0, 0, "player");
        this.player.setOrigin(0,0);
        this.player.setScale(0.25);
    }

    movePlayer(player, speed){
        player.x += speed;
        if(player.x > config.width){
            this.resetPlayerPos(player);
        }
    }
    update() {
        this.movePlayer(this.player, 1);
        this.background.tilePositionX -= 0.5;
    }
    resetPlayerPos(player){
        player.x = 0;
        var randomY = Phaser.Math.Between(0, config.height);
        player.y = randomY;
    }
}
