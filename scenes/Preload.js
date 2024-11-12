
class Preload extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

     preload() {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('block', 'assets/block.png');
        this.load.image('zone', 'assets/zone.png');
        this.load.image('star', 'assets/star.png');
        this.load.spritesheet('coin', 'assets/coin.png', { frameWidth: 15, frameHeight: 16} );
        this.load.spritesheet('air', 'assets/null.png', {frameWidth: 16, frameHeight: 16});
        this.load.image('bomb', 'assets/bomb.png');
        this.load.image('castle', 'assets/castle.png');
        this.load.image('flag', 'assets/MarioFlag.png');
        this.load.spritesheet('dude', 'assets/dudehead.png', { frameWidth: 32, frameHeight: 32 });      
        this.load.spritesheet('lbhit', 'assets/luckyblockwhite.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('brickhit', 'assets/brickhit.png', { frameWidth: 32, frameHeight: 64 });
        this.load.spritesheet('slime', 'assets/mysticWoods/sprites/characters/slime.png', { frameWidth: 32, frameHeight: 32 });
        
        // Hobbit animations
        this.load.spritesheet('idle', 'assets/sprites/hobbits/Idle.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('jump', 'assets/sprites/hobbits/Jump.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('run', 'assets/sprites/hobbits/Run.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('pdeath', 'assets/sprites/hobbits/PlayerDeath.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('stop', 'assets/sprites/hobbits/Stop.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('atk', 'assets/sprites/hobbits/Attack.png', { frameWidth: 192, frameHeight: 192 });
        this.load.spritesheet('blk', 'assets/sprites/hobbits/Block.png', { frameWidth: 192, frameHeight: 192 });

        this.moveCam = false;
        console.log(Phaser.VERSION);
    }
    create() {
        this.add.text(20, 20, "Game Failed", {font: '25px Arial', fill: 'red'});
        this.scene.start("mainMenu");       
    }

}