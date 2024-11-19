
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
        this.load.image('black', 'assets/loading.png');
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
        this.createAnimations();3
        this.scene.start("mainMenu");       
    }
    createAnimations() {
//  Our player animations, turning, walking left and walking right.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'lbup',
            frames: this.anims.generateFrameNumbers('lbhit', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'bhit',
            frames: this.anims.generateFrameNumbers('brickhit', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'sidle',
            frames: this.anims.generateFrameNumbers('slime', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'swalk',
            frames: this.anims.generateFrameNumbers('slime', { start: 7, end: 12 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'sjump',
            frames: this.anims.generateFrameNumbers('slime', { start: 14, end: 20 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'sdeath',
            frames: this.anims.generateFrameNumbers('slime', { start: 28, end: 32 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'shide',
            frames: this.anims.generateFrameNumbers('slime', { start: 33, end: 33 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'cspin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'pidle',
            frames: this.anims.generateFrameNumbers('idle', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });
        this.anims.create({
            key: 'pjump',
            frames: this.anims.generateFrameNumbers('jump', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'pdie',
            frames: this.anims.generateFrameNumbers('pdeath', { start: 0, end: 9 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'prun',
            frames: this.anims.generateFrameNumbers('run', { start: 0, end: 8 }),
            frameRate: 10,
            repeat: 0
        });
    }

}