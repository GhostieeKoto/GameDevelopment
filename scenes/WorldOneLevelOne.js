class WorldOneLevelOne extends Phaser.Scene {
    constructor() {
        super("WorldOneLevelOne");
    }
    scoreText;
    gameOver = false;
    score = 0;
    iw = window.innerWidth;
    ih = window.innerHeight;
    cursors;
    platforms;
    ground;
    luckyblocks;
    lbname;
    bombs;
    sky;
    startGame;
    inCutscene = true;
    stars;
    player;
    lby;
    PlayerCollides;
    lb1used = false;
    jp = 350;
    g = 500;
    create ()
    {
        //alert("Game Started");
        // Create the camera
        this.cameras.main.setSize(window.innerWidth, window.innerHeight);
        //  A simple background for our game
        this.sky = this.add.tileSprite(200, 200, 400, 600, 'sky').setScale(1000);
        //alert("Background Made");

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.physics.add.staticGroup();
        this.luckyblocks = this.physics.add.staticGroup();
        this.startGame = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
         this.ground = this.platforms.create(0, 500, 'ground').setScale(1000, 1).refreshBody();
         this.ground.name = 'ground';
       //this.startGame.create((this.iw/2)+500, 50, 'zone');


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
        this.anims.create({
            key: 'lbup',
            frames: this.anims.generateFrameNumbers('lbhit', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        //  Now let's create some ledges
        this.platforms.create((this.iw/2-256), 400, 'ground').setScale(1, 1).refreshBody().name = "ground";
        this.platforms.create((this.iw/2-128), 400, 'ground').setScale(1, 1).refreshBody().name = "ground";

        // The player and its settings
        this.player = this.physics.add.sprite(0, 450, 'dude');
        this.player.name = 'player';
        this.player.body.onCollide = true;
        this.physics.world.on('collide', (gameObject1, gameObject2, body1, body2) =>
            {
                //console.log(gameObject2.name);
                if(gameObject2.name.includes("LuckyBlock")){
                    this.lbname = gameObject2;
                }
            });
        //  Player physics properties. Give the little guy a slight bounce.
        this.player.setBounce(0.15);
        this.player.setCollideWorldBounds(false);
        
        // Start Camera Following
        this.cameras.main.startFollow(this.player);
        //alert("Camera Followed");

        // Lucky Block Stuff

        //  Input Events
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setBounds(0, 0, 999999999, 0);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.followOffset.set(0, 0);

        this.cameras.main.setDeadzone(200, 350);
        this.cameras.main.setZoom(1);

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        this.stars = this.physics.add.group({
            defaultKey: 'star',
            repeat: 0,
        });
        this.stars.children.iterate(child =>
        {
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0, 0.5));

        });
        this.lb1star = this.stars.create((this.iw/2-224), 400);
        this.lb1star.body.setAllowGravity(false);
        this.lb1star.body.onCollide = true;
        this.lb1star.name = "lb1star";
        this.lb1 = this.luckyblocks.create((this.iw/2-224), 400, 'block');
        this.lb1.name = "lb1";
        this.bombs = this.physics.add.group();

        //  The score
        this.scoreText = this.add.text(this.cameras.x, 16, 'Score: 0', { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setScrollFactor(0);

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.stars, this.luckyblocks);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.luckyblocks, this.hitLuckyBlock, null, this);
        this.physics.add.collider(this.player, this.luckyblocks);
        this.physics.add.collider(this.bombs, this.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        //this.physics.add.overlap(this.player, this.startGame, this.startGameCutscene, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }

    update ()
    {
        if(this.player.x < 100 && this.inCutscene){
            this.player.anims.play('right', true);
            this.player.setVelocityX(320);
        }else{
        this.player.setVelocityX(0);
        this.inCutscene = false;
        this.player.setCollideWorldBounds(true);
        
        //this.platforms.create(this.player.x, 500, 'ground').setScale(1).refreshBody();
        this.sky.tilePositionX += 1;
        //this.bg.tilePositionY += 1.5;
        const cam = this.cameras.main;

        if (cam.deadzone)
        {
            this.moveCam
        }
        else if (cam._tb)
        {
            this.moveCam
        }


        this.physics.world.gravity.y = this.g;
        if (this.gameOver)
        {
            this.scene.start("bootGame");
        }
        if (this.player.y > 1080){
            this.scene.start("bootGame");
        }

        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-320);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(320);
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        if (this.cursors.up.isDown)
        {
            if(this.player.body.touching.down){
            this.player.setVelocityY(this.jp*-1);
            }
        }
    }
}
    hitLuckyBlock() {
        console.log(this.lb1used);
        this.lby = 0;
        console.log("Hit Lucky Block!!");
        if(!this.lb1used){
        this.lb1.anims.play('lbup');
        this.lb1star.body.setAllowGravity(true);
        this.lb1star.setVelocityY(-190);
        this.lb1used = true;
        }
    }


    collectStar (player, star)
    {
        star.disableBody(true, true);

        //  Add and update the score
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    hitBomb (player, bomb)
    {
        location.reload();
    }



}