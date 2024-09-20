class GameStartCutscene extends Phaser.Scene {
    constructor() {
        super("GameStartCutscene");
    }
    scoreText;
    gameOver = false;
    score = 0;
    iw = window.innerWidth;
    ih = window.innerHeight;
    cursors;
    platforms;
    bombs;
    sky;
    startGame;
    stars;
    player;
    jp = 400;
    g = 500;
    cutscene;
    create ()
    {
        console.log(playerx + ", " + playery);
        // Create the camera
        this.cameras.main.setSize(window.innerWidth, window.innerHeight);
        //  A simple background for our game
        this.sky = this.add.tileSprite(200, 200, 400, 600, 'sky').setScale(1000);

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.physics.add.staticGroup();
        this.startGame = this.physics.add.staticGroup();

        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            this.platforms.create(0, 500, 'ground').setScale(100, 1).refreshBody();

        //  Now let's create some ledges
        this.platforms.create((this.iw/2), 400, 'ground').setScale(3, 1).refreshBody();
        this.platforms.create(((this.iw/2)-600), 300, 'ground').setScale(21, 1).refreshBody();
        this.platforms.create(((this.iw/2)+600), 300, 'ground').setScale(21, 1).refreshBody();
        
        // The player and its settings
        this.player = this.physics.add.sprite(playerx, playery, 'dude');

        //  Player physics properties. Give the little guy a slight bounce.
        this.player.setBounce(0.15);
        this.player.setCollideWorldBounds(false);
        
        // Start Camera Following
        this.cameras.main.startFollow(this.player);
        //alert("Camera Followed");

        //  Input Events
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setBounds(0, 0, 0, 0);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.followOffset.set(0, 0);

        this.cameras.main.setDeadzone(1500, 1350);
        this.cameras.main.setZoom(1);

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
//        this.stars = this.physics.add.group({
//            key: 'star',
//            repeat: 11,
//            setXY: { x: 600, y: 0, stepX: 70 }
//        });

//        this.stars.children.iterate(child =>
//        {
            //  Give each star a slightly different bounce
//            child.setBounceY(Phaser.Math.FloatBetween(0, 0.5));

//        });

        this.bombs = this.physics.add.group();

        //  The score
        this.scoreText = this.add.text(this.cameras.x, 16, 'Score: 0', { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setScrollFactor(0);

        //  Collide the player and the stars with the platforms
//        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.player, this.platforms);
        //this.physics.add.collider(this.player, this.startGame);
        this.physics.add.collider(this.bombs, this.platforms);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
//        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.startGame, this.startGameCutscene, null, this);
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        this.startGameCutscene();
    }

    update ()
    {
        //this.platforms.create(this.player.x, 500, 'ground').setScale(1).refreshBody();
        this.sky.tilePositionX += 1;
        //this.bg.tilePositionY += 1.5;
        const cam = this.cameras.main;
        
        if(this.cutscene){
            if(this.player.x > this.iw){
                this.scene.start("WorldOneLevelOne");
                };
        }


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
    }
    startGameCutscene(player, gameStart)
    {
        this.player.anims.play('right', true);
        this.player.setVelocityX(320);
        //this.player.setVelocityY(this.jp*-1);
        console.log(1);
        this.cutscene = true;
        console.log(0);
        //this.scene.start("mainMenu");

    }


    collectStar (player, star)
    {
        star.disableBody(true, true);

        //  Add and update the score
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);

        if(this.stars.countActive(true) === 11){
            this.jp = 200;
        }else if(this.stars.countActive(true) === 10){
            //this.g = 500;
            this.jp = 333;
        }else if(this.stars.countActive(true) === 9){
            //this.g = 10000;
            this.jp = 350;
        }else if(this.stars.countActive(true) === 8){
            this.jp = 350;
        }else if(this.stars.countActive(true) === 7){
            this.g = 350;
        }
        


        if (this.stars.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            this.stars.children.iterate(child =>
            {

                child.enableBody(true, child.x, 0, true, true);

            });

            const x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            const bomb = this.bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

        }
    }

    hitBomb (player, bomb)
    {
        location.reload();
    }



}

console.log("Scene2");