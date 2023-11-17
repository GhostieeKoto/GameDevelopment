const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

game = new Phaser.Game(config);
let platforms;
let player;
let cursors;

function preload() {
    this.load.image('sky', 'assets2/sky.png');
    this.load.image('ground', 'assets2/platform.png');
    this.load.image('star', 'assets2/star.png');
    this.load.image('bomb', 'assets2/bomb.png');
    this.load.spritesheet('dude', 'assets2/dude.png', { frameWidth: 32, frameHeight: 48 });
}


function create() {
//  A simple background for our game
    this.add.image(400, 300, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();
    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, platforms);

}

function update() {
    if (player){
        updatePlayer();
    }
}

function updatePlayer(){
    console.log('player', player);
    let x = player.body.velocity.x;
    let y = player.body.velocity.y;
    if (cursors.left.isDown)
    {
        player.setVelocity(-160,y);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocity(160, y);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocity(0, y);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocity(x, -330);
    }
}