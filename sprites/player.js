class Player  {

    isMoving = false;
    player;
    input;
    
    constructor(scene, input, reference){
        const x = 16;
        const y = 16;
        this.player = scene.physics.add.sprite(x,y, reference);
        this.player.setOrigin(0,0);
        this.player.setScale(1);
        this.player.setCollideWorldBounds(true);
        this.player.play("player_idle");
        this.player.setInteractive();
        this.player.cursorKeys = input.keyboard.createCursorKeys();
        this.input = input;

    }


    update(){
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

        if(this.player.cursorKeys.left.isDown || keyA.isDown){
            x = -gameSettings.playerSpeed;
        }

        if(this.player.cursorKeys.right.isDown || keyD.isDown){
            x = gameSettings.playerSpeed;
        }

        if(this.player.cursorKeys.up.isDown || keyW.isDown){
            y = -gameSettings.playerSpeed;
        }

        if(this.player.cursorKeys.down.isDown || keyS.isDown){
            y = gameSettings.playerSpeed;
        }
        if(this.player.cursorKeys.left.isDown && this.player.cursorKeys.right.isDown){
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
        if(keyA.isDown && keyD.isDown){
            x = 0;
        }
        if (x !== 0 || y !== 0){
            if (!this.isMoving){
                if(x > 0){
                    this.player.setFlipX(false);
                }
                if(x < 0){
                    this.player.setFlipX(true);
                }
                this.player.play("player_run");
                this.isMoving = true;
            }
        } else {
            if (this.isMoving){
                this.isMoving = false;
                this.player.stop("player_run");
                this.player.play("player_stop");
                setTimeout( () => {this.player.play("player_idle")} , 1000);

            }

        }
        this.player.setVelocity(x,y);
    }

}