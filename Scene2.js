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
        player = this.physics.add.sprite(100, 100, 'player_run');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        platforms = this.physics.add.staticGroup();
        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(600, 400, 'ground');
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');
        
        
        this.ground = this.add.tileSprite((config.width/2), (config.height-10), config.width, 25, "ground");
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
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player_run', { start: 1, end: 9 }),
            frameRate: 10,
            repeat: 0
        });
    
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player_run', { start: 10, end: 18 }),
            frameRate: 10,
            repeat: 0
        });

        this.player = new Player(this, this.input, 'player');

        this.input.on('gameobjectdown', this.destroyPlayer, this);
        this.physics.add.collider(player, platforms);
        cursors = this.input.keyboard.createCursorKeys();

    }


    update() {
        this.background.tilePositionX = 0.5;
        //this.player.update();
        if (player){
            updatePlayer();
        }
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