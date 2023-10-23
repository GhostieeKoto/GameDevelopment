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
            key: "player_run",
            frames: this.anims.generateFrameNumbers("player_run"),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: "player_idle",
            frames: this.anims.generateFrameNumbers("player_idle"),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: "player_death",
            frames: this.anims.generateFrameNumbers("player_die"),
            frameRate: 12,
            repeat: 0,
            hideOnComplete: true
        });
        this.anims.create({
            key: "player_stop",
            frames: this.anims.generateFrameNumbers("player_stop"),
            frameRate: 8,
            repeat: 0,
        });
        this.anims.create({
            key: "player_attack",
            frames: this.anims.generateFrameNumbers("player_attack"),
            frameRate: 8,
            repeat: 0,
        });
        this.anims.create({
            key: "player_block",
            frames: this.anims.generateFrameNumbers("player_block"),
            frameRate: 8,
            repeat: 0,
        });
        this.anims.create({
            key: "player_jump",
            frames: this.anims.generateFrameNumbers("player_jump"),
            frameRate: 8,
            repeat: 0,
        });
        this.player.play("player_idle");
        this.player.setInteractive(, 'player');
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
            let keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
            let keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
            let keyC= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
            let keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);        
            let keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);        
            let keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);        
            let keyG = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G);
            let keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
            let keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
            let keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);        
            let keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);        
            let keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);        
            let keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
            let keyN= this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
            let keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
            let keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);        
            let keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);        
            let keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);        
            let keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            let keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
            let keyU = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.U);
            let keyV = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.V);        
            let keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);        
            let keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);        
            let keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
            let keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    
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
        if(this.cursorKeys.left.isDown && this.cursorKeys.right.isDown){
            x = 0;
        }
        if(keyA.isDown){
            x = -gameSettings.playerSpeed;
        }

        if(keyD.isDown){
            x = gameSettings.playerSpeed;
        }

        if(keyW.isDown){
            this.player.play("player_jump");
            //y = -gameSettings.playerSpeed;
        }

        if(keyS.isDown){
            //y = gameSettings.playerSpeed;
        }
        if(keyA.isDown && keyD.isDown){
            x = 0;
        }
        if(keyQ.isDown){
            this.player.play("player_attack");
            setTimeout( () => {this.player.play("player_idle")}, 2125);
        }
        if(keyE.isDown){
            this.player.play("player_block");
            setTimeout( () => {this.player.play("player_idle")}, 1625);
        }


        if (x !== 0 || y !== 0){
            if (!this.player.isMoving){
                if(x > 0){
                    this.player.setFlipX(false);
                }
                if(x < 0){
                    this.player.setFlipX(true);
                }
                this.player.play("player_run");
                this.player.isMoving = true;
            }
        } else {
            if (this.player.isMoving){
                this.player.isMoving = false;
                this.player.stop("player_run");
                this.player.play("player_stop");
                setTimeout( () => {this.player.play("player_idle")} , 1000);
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
