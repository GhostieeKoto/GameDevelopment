class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
        

    }

    create(){
        this.add.text(20,20,"Playing game", {font: '25px Comic sans', fill: 'green' });
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0,0);
        this.background.setScale(2);
        this.player = this.add.sprite(0, 0, "player");
        this.player.isMoving = true;
        this.player.setOrigin(0,0);
        this.player.setScale(1);
        this.anims.create({
            key: "player_anim",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: "player_death",
            frames: this.anims.generateFrameNumbers("playerdie"),
            frameRate: 10,
            repeat: 0,
            hideOnComplete: true
        });
        this.player.play("player_anim");
        this.player.setInteractive();
        this.input.on('gameobjectdown', this.destroyPlayer, this);
    }




    movePlayer(player, speed){
        if (this.player.isMoving){
            player.x += speed;
            if(player.x > config.width){
                this.resetPlayerPos(player);
            }
        }

    }
    update() {
        this.background.tilePositionX = 0.5;
        this.movePlayer(this.player, 1);

        

    }
    destroyPlayer(pointer, gameObject){
        this.player.isMoving = false;
        gameObject.setTexture("playerdie");
        gameObject.play("player_death");
    }
    resetPlayerPos(player){
        player.x = 0;
        player.y = Phaser.Math.Between(0, config.height);
    }
}
