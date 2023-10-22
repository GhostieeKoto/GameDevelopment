class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
        

    }

    tick = 0;

    create(){
        this.add.text(20,20,"Playing game", {font: '25px Comic sans', fill: 'green' });
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0,0);
        this.background.setScale(2);
        this.player = this.physics.add.sprite(16, 16, "player");
        this.player.isMoving = false;
        this.player.setOrigin(0,0);
        this.player.setScale(1);
        this.player.setCollideWorldBounds(true);
        this.anims.create({
            key: "player_anim",
            frames: this.anims.generateFrameNumbers("player"),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: "player_death",
            frames: this.anims.generateFrameNumbers("playerdie"),
            frameRate: 12,
            repeat: 0,
            hideOnComplete: true
        });
      //  this.player.play("player_anim");
        this.player.setInteractive();
        this.cursorKeys = this.input.keyboard.createCursorKeys();
       // this.input.on('gameobjectdown', this.destroyPlayer, this);
    }

    // moveplayer(player, speed){
    //     this.tick++;
    //     if (this.player.isMoving && this.tick%8===0){
    //         player.x += speed;
    //         if(player.x > config.width){
    //             this.resetPlayerPos(player);
    //         }
    //     }
    //
    // }
    update() {
        this.background.tilePositionX = 0.5;
        this.movePlayerManager();

    }
    movePlayerManager() {
        let x = 0;
        let y = 0;
        if(this.cursorKeys.left.isDown){
            x = -gameSettings.playerSpeed;
        }

        if(this.cursorKeys.right.isDown){
            x = gameSettings.playerSpeed;
        }

        if(this.cursorKeys.up.isDown){
            y = -gameSettings.playerSpeed;
        }

        if(this.cursorKeys.down.isDown){
            y = gameSettings.playerSpeed;
        }


        if (x > 0 || y > 0){
            if (!this.player.isMoving){
                this.player.play("player_anim");
                this.player.isMoving = true;
            }
        }
        this.player.setVelocity(x,y);
    }

    destroyPlayer(pointer, gameObject){
        this.player.isMoving = false;
        gameObject.setTexture("playerdie");
        gameObject.play("player_death");
        setTimeout( () => {this.scene.start("playGame")} , 2500);
    }
    resetPlayerPos(player){
        player.x = 0;
        player.y = Phaser.Math.Between(0, config.height);
    }
}
