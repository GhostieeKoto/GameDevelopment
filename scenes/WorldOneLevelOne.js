class WorldOneLevelOne extends Phaser.Scene {
    constructor() {
        super("WorldOneLevelOne");
        this.resetSlimeState();
        this.pKey;
        this.oKey;
        this.key1;
    }

    init(data) {
        // If lives data is passed, use it; otherwise, set to default (e.g., 3)
        this.lives = data.lives !== undefined ? data.lives : 3;
    }

    resetSlimeState() {
        this.s1idle = false;
        this.s1jump = false;
        this.s1die = false;
        this.s1dead = false;
        this.s1walking = false;
        this.s1walk = true;
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
    castle;
    lbname;
    bombs;
    sky;
    grid = 32;
    startGame;
    inCutscene = true;
    lives = 3;
    stars;
    player;
    slime;
    s1walk = true;
    s1idle = false;
    s1jump = false;
    s1die = false;
    s1dead = false;
    turtldir = true;
    s1walking = false;
    turtlespeed = -50;
    go2;
    lby;
    PlayerCollides;
    lb1used = false;
    lb2used = false;
    lb3used = false;
    doublejump = false;
    supersmash = false;
    gpound = false;
    jp = 350;
    pspeed = 320;
    g = 500;
    create() {
        this.turtlestoppedmoving = false;
        this.lb1used = false;
        this.lb2used = false;
        this.lb3used = false;
        //alert("Game Started");
        // Create the camera
        this.cameras.main.setSize(window.innerWidth, window.innerHeight);
        //  A simple background for our game
        this.sky = this.add.tileSprite(200, 200, 400, 600, 'sky').setScale(1000);
        //alert("Background Made");
        this.height = 1;

        //  The platforms group contains the ground and the 2 ledges we can jump on
        this.platforms = this.physics.add.staticGroup();
        this.luckyblocks = this.physics.add.staticGroup();
        this.startGame = this.physics.add.staticGroup();
        this.end = this.physics.add.staticGroup();
        this.flag = this.physics.add.staticGroup();
        //this.winlevel = this.physics.add.staticGroup();
        this.timedEvent = new Phaser.Time.TimerEvent({ delay: 500 });
        this.phitcd = new Phaser.Time.TimerEvent({ delay: 500 });
        this.stopvibrating = new Phaser.Time.TimerEvent({ delay: 25 });
        this.time.addEvent(this.stopvibrating);
        this.stopvibrating.paused = false;
        this.time.addEvent(this.phitcd);
        this.phitcd.paused = false;
        this.time.addEvent(this.timedEvent);
        this.timedEvent.paused = true;
        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.ground = this.platforms.create(0, 500, 'ground').setScale(1000, 1).refreshBody();
        this.ground2 = this.platforms.create(0, 590, 'ground').setScale(1000, 5).refreshBody();
        this.ground.setDepth(10);
        this.ground2.setDepth(10);
        this.ground.name = 'ground';
        //this.startGame.create((this.iw/2)+500, 50, 'zone');

        if (this.anims.exists('left')) {
            this.anims.remove('left');
        }
        if (this.anims.exists('right')) {
            this.anims.remove('right');
        }
        if (this.anims.exists('turn')) {
            this.anims.remove('turn');
        }
        if (this.anims.exists('lbup')) {
            this.anims.remove('lbup');
        }
        if (this.anims.exists('sidle')) {
            this.anims.remove('sidle');
        }
        if (this.anims.exists('swalk')) {
            this.anims.remove('swalk');
        }
        if (this.anims.exists('sjump')) {
            this.anims.remove('sjump');
        }
        if (this.anims.exists('sdeath')) {
            this.anims.remove('sdeath');
        }
        if (this.anims.exists('cspin')) {
            this.anims.remove('cspin');
        }
        if (this.anims.exists('bhit')) {
            this.anims.remove('bhit');
        }

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

        //  Now let's create some ledges
        this.platforms.create(this.grid * 15, 400, 'ground').setScale(1, 1).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 17, 400, 'ground').setScale(1, 1).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 25, 468, 'ground').setScale(1, 1).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 25, 436, 'ground').setScale(1, 1).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 25, 404, 'ground').setScale(1, 1).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 24, 404, 'ground').setScale(1, 1).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 23, 404, 'ground').setScale(1, 1).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 24, 436, 'ground').setScale(1, 1).refreshBody().name = "Brick";

        // The slime
        this.slime1 = this.physics.add.sprite(this.grid*18, 400, 'slime');
        this.slime1.setSize(18, 16);
        this.slime1.setScale(1.25, 1.25);
        this.slime1.body.onCollide = true;
        this.slime1.name = 'slime1';
        this.slime1.setDepth(1);
        this.resetSlimeState();  // Reset the slime's state

        // Create the castle
        this.castle = this.end.create(this.grid*70, 300, 'castle');
        this.flag = this.flag.create(this.grid*60, 368, 'flag');
        this.castle.name = 'Castle';
        this.castle.setSize(375, 400);
        this.flag.name = 'FlagPole';
        this.flag.setScale(0.2);
        this.flag.setSize(10, 250);
        this.flag.setOffset(595, 475);

        


        // The player and its settings
        this.player = this.physics.add.sprite(0, 450, 'idle');
        this.lbplr = this.physics.add.sprite(0, 450, 'air');
        this.playerscaley = 0;
        this.player.name = 'player';
        this.lbplr.name = 'lbplr';
        //this.player.setSize(26, 35);
        //this.player.setOffset(3, -2);
        this.player.setSize(60, 54);
        this.player.setOffset(54, 64);
        this.player.setScale(0.5, 0.55);
        this.lbplr.setSize(30, 5);
        this.lbplr.setOffset(-13, -13);
        this.lbplr.body.setAllowGravity(false);
        this.lbplr.body.onCollide = true;
        this.player.body.onCollide = false;
        // Adjust the physics collider to check for overlap
        this.physics.world.on('collide', (object1, object2, body1, body2) => {
            // Add more precise check here
            let obj1top = object1.getBounds().top;
            let obj1btm = object1.getBounds().bottom;
            let obj2btm = object2.getBounds().bottom;
            let obj2top = object2.getBounds().top;
            //console.log(object1.name, object2.name);
            if (obj1top >= obj2btm && object1.name.includes("lbplr")) {
                console.log('Top of the hitbox hits the lucky block!');
                this.hitLuckyBlock(object2.name);
            }
            if (obj1top >= obj2btm && object1.name.includes("lbplr") && object2.name.includes("Brick") && !this.playerdead) {
                console.log('Top of the hitbox hits the lucky block!');
                this.breakBrick(object2);
            }
            if(object2.name.includes("player") && object1.name.includes("slime")){
                console.log(obj1top >= obj2btm-54);
                console.log(obj1top < obj2btm-54);
            }
            if (obj1top < obj2btm-54 && object2.name.includes("player") && object1.name.includes("slime")) {
                this.killPlayer();
            }
            if (obj1top >= obj2btm-54 && object2.name.includes("player") && object1.name.includes("slime")) {
                console.log('you killed the slime!');
                this.killSlime(object1.name);
            }
        }, null, this);

        /*        this.physics.world.on('collide', (gameObject1, gameObject2, body1, body2) =>
                    {
                        if(gameObject2.name.includes("LuckyBlock") && gameObject1.name.includes("player")){
                        console.log(gameObject1.body.touching.up);
                        if(gameObject1.body.touching.up && gameObject2.body.touching.down){
                            this.hitLuckyBlock(gameObject2.name);
                        }
                        }
                        if(gameObject1.name.includes("player")){
                            this.go2 = gameObject2.name;
                            console.log(gameObject2.name);
                        }
                    });
        */
        //  Player physics properties. Give the little guy a slight bounce.
        this.player.setBounce(0.15);
        this.player.setCollideWorldBounds(true);
        this.playerdead = false;

        // Start Camera Following
        this.cameras.main.startFollow(this.player);
        //alert("Camera Followed");


        //  Input Events
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setBounds(0, 0, 999999999, 0);
        this.physics.world.setBounds(0, 0, 5000, 1000);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.pKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.oKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        this.key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);

        this.cameras.main.followOffset.set(0, 0);

        this.cameras.main.setDeadzone(200, 350);
        this.cameras.main.setZoom(1);
        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        this.stars = this.physics.add.group({
            defaultKey: 'star',
            repeat: 1,
        });
        this.stars.children.iterate(child => {
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0, 0.5))
        });
        this.coins = this.physics.add.group({
            defaultKey: 'coin',
            repeat: 1,
        });
        this.coins.children.iterate(child => {
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0, 0.5));
        });

        this.bombs = this.physics.add.group();
        const bomb1 = this.bombs.create(2000, 300, 'bomb');
        bomb1.setBounce(1);
        bomb1.setCollideWorldBounds(true);

        // ... (rest of the existing code)
        // Lucky Block Stuff

        this.lb1coin = this.coins.create(this.grid * 11, 400).setScale(1.25).anims.play('cspin', true).setOffset(0, 2);
        this.lb2coin = this.coins.create(this.grid * 16, 400).setScale(1.25).anims.play('cspin', true).setOffset(0, 2);
        this.lb3star = this.stars.create(this.grid * 16, 300);
        this.lb1coin.body.setAllowGravity(false);
        this.lb2coin.body.setAllowGravity(false);
        this.lb3star.body.setAllowGravity(false);
        this.lb1coin.name = "lb1coin";
        this.lb2coin.name = "lb2coin";
        this.lb3star.name = "lb3star";
        this.lb1 = this.luckyblocks.create(this.grid * 11, 400, 'block');
        this.lb2 = this.luckyblocks.create(this.grid * 16, 400, 'block');
        this.lb3 = this.luckyblocks.create(this.grid * 16, 300, 'block');
        this.lb1.name = "LuckyBlock1";
        this.lb1.body.onOverlap = true;
        this.lb2.name = "LuckyBlock2";
        this.lb2.body.onOverlap = true;
        this.lb3.name = "LuckyBlock3";
        this.lb3.body.onOverlap = true;

        //  The score
        this.scoreText = this.add.text(this.cameras.x, 16, 'Score: 0', { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setScrollFactor(0);
        //this.livesText = this.add.text(this.cameras.x, 48, `Lives: ${this.lives}`, { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setScrollFactor(0);

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.stars, this.luckyblocks);
        this.physics.add.collider(this.coins, this.platforms);
        this.physics.add.collider(this.coins, this.luckyblocks);
        this.playergroundcollider = this.physics.add.collider(this.player, this.platforms);
        this.playergroundcollider2 = this.physics.add.collider(this.lbplr, this.platforms);
        this.playerflagcollider = this.physics.add.overlap(this.player, this.flag, this.winlevel, null, this);
        this.physics.add.overlap(this.lbplr, this.luckyblocks, null, null, this);
        this.physics.add.overlap(this.player, this.platforms, null, null, this);
        this.playerluckyblockcollider = this.physics.add.collider(this.player, this.luckyblocks);
        this.playerluckyblockcollider2 = this.physics.add.collider(this.lbplr, this.luckyblocks);
        this.physics.add.collider(this.bombs, this.platforms);
        this.physics.add.collider(this.slime1, this.platforms);
        this.playerslime1collider = this.physics.add.collider(this.slime1, this.player);

        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        //this.physics.add.overlap(this.player, this.startGame, this.startGameCutscene, null, this);
        this.playerbombcollider = this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        console.log("create done!");
        console.log(this.slime1);
    }
    update() {
        if(!this.cursors.down.isDown && this.height == 2) {
            this.player.setScale(0.5, 1);
        }

        if(this.player.body.touching.down){
//            console.log("Player is touching the ground");
            
        }
        // Dev Cheats
        if (Phaser.Input.Keyboard.JustDown(this.key1)) {
            this.player.x = 2100;
        }

        // Pretend you just collected a star
        if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
            this.collectStar(null, null);
        }
        // Spawn a slime enemy (NOT GUARANTEED TO BE IMPLEMENTED!)
        // The way I spawn a slime kind of sucks, but as of right now,
        // I haven't figured out how to do this more efficiently atm.
        // I think I can use the code for the stars/coins, but I think
        // I'll do that later because it doesn't matter much right now
        if (Phaser.Input.Keyboard.JustDown(this.oKey)) {
            // Might add a way to spawn a slime here but idk
        }
        // Spawn the bombs (This isn't spawning a bomb on command)
        if (this.bombs.getChildren().length > 0) {
            const bomb = this.bombs.getChildren()[0];  // Get the first (and only) bomb
            if (bomb.body.touching.down) {
                bomb.setVelocityX(0);
            }
        }

        // Check if slime has killed or been killed by the player
        this.checkSlime1();

        // Check if the player is touching the ground
        if (this.player.body.touching.down) {
            // If so, then reset the double jump
            // Also reset the ground pound ability
            this.gpound = true;
            this.supersmash = false;
            this.player.setBounce(0.15); // The Super Smash ability disables the player's bounce effect, so it's reinstated here
        }

        // This weirdly actually works lmao.
        // This just adds a hitbox at the top of the player so it can
        // detect if the top of the player hits a luckyblock
        // Otherwise you'd have to hit the luckyblock and nothing else
        // Player's hitbox is way too big for this.
        // Player's hitbox most likely will be changed in the near future
        // when we completely switch assets.
        this.lbplr.x = this.player.x;
        this.lbplr.y = this.player.y - this.playerscaley; // Account for if the player is big
        //console.log(this.go2);

        // Prevent player from doing anything while still in the cutscene
        if (this.player.x < 100 && this.inCutscene) {
            //this.player.anims.play('right', true);
            this.player.setVelocityX(320);
        } else {  // But make sure that you collide with world bounds ONLY IF NOT DEAD
            if (!this.playerdead) {
                this.player.setCollideWorldBounds(true);
            }
            this.player.setVelocityX(0); // Set velocity to 0 if on the ground. This shouldn't work, but it does.
            this.inCutscene = false; // Makes it so that the player can do stuff

            this.sky.tilePositionX += 1;  // I think this moves the background every frame
            // But the background is a solid color xd

            // Make the camera move only if the player is moving towards the side of the screen
            const cam = this.cameras.main; // Create the camera

            if (cam.deadzone) // I THINK this checks if the player is outside of the camera's deadzone
            {
                this.moveCam;
            }
            else if (cam._tb) // Actually never mind, I have no clue what this is. This was in the project by default so I'm assuming it's what moves the camera
            {
                this.moveCam;
            }


            this.physics.world.gravity.y = this.g; // Ensure earth's core hasn't suddenly disappeared. (gravity xd)
            if (this.gameOver) // If the game is over, send you back to the main menu
            {
                this.killPlayer();
            }
            if (this.player.y > 1080) { // If the player is too low then kill them
                this.killPlayer();
            }

            // Controls

            if (this.cursors.left.isDown) {
                if (!this.playerdead) { // If the player is dead they can't move.
                    this.player.setVelocityX(-1*this.pspeed);
                    //this.player.anims.play('left', true);
                    //this.player.y-=2;
                }
            }
            else if (this.cursors.right.isDown) {
                if (!this.playerdead) { // If the player is dead they can't move.
                    this.player.setVelocityX(this.pspeed);
                    //this.player.anims.play('right', true);
                    //this.player.y-=2;
                }
            }
            else {
                this.player.setVelocityX(0); // If no controls are being pressed, turn the player towards the camera.
                //this.player.anims.play('turn', true); // Once we switch assets, an idle animation will be created.
            }

            if (this.player.body.touching.down) {    // If the player is on the ground
                this.time.addEvent(this.timedEvent); // Start the timer for double jump
            }
            if (this.cursors.up.isDown) // If the player presses the jump button
            {
                if (!this.playerdead) { // If the player isn't dead
                    if (!this.player.body.touching.down) { // If the player is not on the ground
                        if (this.timedEvent.getRemaining() == 0) { // And the double jump timer is completed
                            this.doublejump = true; // Then allow
                            this.time.addEvent(this.timedEvent); // A double jump
                            this.timedEvent.paused = true; // and pause the timer because there's no triple jump (yet ;P )
                        }
                        if (this.doublejump) { // if double jump is allowed
                            this.player.setVelocityY(this.jp * -1); // then double jump
                            this.doublejump = false; // and prevent player from double jumping again
                            if (this.gpound) { // if the player hasn't hit the down arrow
                                this.supersmash = true; // then they can do a super smash
                            } else {
                                this.gpound = true; // otherwise they do another ground pound
                            }
                        }
                    }
                    if (this.player.body.touching.down) {
                        this.stopvibrating.paused = false; // this restarts the jump timer after hitting the ground
                        if(this.stopvibrating.getRemaining() == 0) {
                        this.player.setVelocityY(this.jp * -1);
                        }
                        this.timedEvent.paused = false; // this restarts the double jump timer after jumping off the ground
                    }
                }
            }
            if (this.cursors.down.isDown) {
                if (!this.playerdead) {
                    if (!this.player.body.touching.down) {
                        if (this.supersmash) {
                            this.player.setVelocityY(this.jp * 3);
                            this.player.setBounce(0);
                            this.gpound = false;
                            this.supersmash = false;
                        }
                        if (this.gpound) {
                            this.player.setVelocityY(this.jp * 1);
                            this.gpound = false;
                        }
                    }else{
                        this.player.setScale(0.5, 0.55);
                    }
                }
            }
        }
    }

    checkSlime1() {
        //console.log("checkslime1");
        if (this.s1die) {
            this.slime1.setVelocityX(0);
            this.s1walk = false;
        } else if (this.s1jump) {

        } else if (this.s1walk) {
            this.slime1.setFlipX(true);
            if (!this.s1walking) {
                //console.log("s1walking")
                this.s1walking = true;
                this.slimeWalk();
            }
        } else {
            this.slime1.setVelocityX(0);
            this.slime1.anims.play('sidle', true);
        }
    }

    winLevel() {
        
    }

    checkTurtle() {
        // This is to detect if the slime has hit a wall.
        if (this.turtle1.body.velocity.x === 0 && !this.turtlestoppedmoving) {
            this.turtlestoppedmoving = true;

            // Set a timeout to flip and reset the velocity after a short delay
            this.time.delayedCall(500, () => {
                if (this.turtle1.body.velocity.x === 0) { // Confirm it's still not moving
                    this.turtledir = !this.turtledir;
                    this.turtleSpeed = this.turtleSpeed * -1
                }
                this.turtleStoppedMoving = false;
            });
        }
    }


    slimeWalk() {
        const startAnimation = () => {
            //console.log('Starting animation');
            this.slime1.anims.play('swalk');
            this.slime1.setVelocityX(-50);
        };
        startAnimation();
        //console.log("e");
        // Listen for the animation complete event
        this.slime1.on('animationcomplete', () => {
            if (!this.s1die) {
                //console.log('Animation completed');
                // Stop moving the sprite
                this.slime1.setVelocityX(0);
                // Wait 500ms before starting the animation again
                this.time.delayedCall(500, startAnimation, [], this);
            }
        });
    }


    hitLuckyBlock(lbname) {
        //console.log(this.lb1used);
        this.lby = 0;
        this.player.setVelocityY(0);
        //console.log("Hit Lucky Block!!");
        if (!this.lb1used && lbname == "LuckyBlock1") {
            this.lb1.anims.play('lbup');
            this.lb1coin.body.setAllowGravity(true);
            this.lb1coin.setVelocityY(-190);
            this.lb1used = true;
        }
        if (!this.lb2used && lbname == "LuckyBlock2") {
            this.lb2.anims.play('lbup');
            this.lb2coin.body.setAllowGravity(true);
            this.lb2coin.setVelocityY(-190);
            this.lb2used = true;
        }
        if (!this.lb3used && lbname == "LuckyBlock3") {
            this.lb3.anims.play('lbup');
            this.lb3star.body.setAllowGravity(true);
            this.lb3star.setVelocityY(-190);
            this.lb3used = true;
        }
    }
    breakBrick(brick){
        if(!brick.name.includes("LuckyBlock")){
        if(this.height == 2){
        brick.destroy();
        }else{
            console.log(brick.x);
            brick.anims.play('bhit', true);
            setTimeout(() => {
                console.log(brick.anims.isPlaying);
                brick.anims.stop();
            }, 1000);
        }
    }
    }

    killPlayer() {
        console.log(this.phitcd.getRemaining());
        if (this.phitcd.getRemaining() == 0) {
            if (this.height == 1) {
                this.playerdead = true;
                console.log("lmao");
                this.physics.world.removeCollider(this.playerbombcollider);
                this.physics.world.removeCollider(this.playergroundcollider);
                this.physics.world.removeCollider(this.playerluckyblockcollider);
                this.physics.world.removeCollider(this.playerluckyblockcollider2);
                this.physics.world.removeCollider(this.playerslime1collider);
                this.player.setVelocityY(this.jp * -1.5);
                //this.checkPlayerY();
            } else if (this.height == 2) {
                this.physics.world.removeCollider(this.playerslime1collider);
                this.physics.world.removeCollider(this.playerbombcollider);
                this.playerdead = false;
                this.player.setCollideWorldBounds(true);
                this.player.setScale(1, 1);
                this.time.delayedCall(500, this.enablePlayerCollision, [], this);
            }
            this.time.addEvent(this.phitcd);
        }
    }

    enablePlayerCollision() {
        this.playerslime1collider = this.physics.add.collider(this.slime1, this.player);
        this.playerbombcollider = this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        this.height = 1;
        this.playerscaley = 0;
    }

    checkPlayerY() {
        this.player.setVelocityX(0);
        if (this.player.y > 600) {
            // Action when the player reaches the desired y-coordinate
            console.log('Player has reached the desired y-coordinate');
            this.player.setCollideWorldBounds(false);
            // Do whatever action you need here
            if (this.lives > 1) {
                this.lives--;
                this.scene.start("NextLevel", { nextScene: "WorldOneLevelOne", world: 1, level: 1, lives: this.lives });
            } else if (this.lives == 1) {
                this.scene.start("mainMenu");
            }
        } else {
            // Continue checking until player reaches the desired y-coordinate
            this.time.delayedCall(1, this.checkPlayerY, [], this);
        }
    }

    killSlime(slimeNum) {
        slimeNum = parseInt(slimeNum.replace('slime', ''));
        switch (slimeNum) {
            case 1:
                if (!this.s1dead) {
                    this.s1dead = true;
                    console.log(this.anims.generateFrameNumbers('slime', { start: 28, end: 32 }));
                    console.log("Killing Slime 1!");
                    this.s1idle = false;
                    this.s1jump = false;
                    this.s1die = true;
                    this.s1walk = false;
                    this.slime1.body.setAllowGravity(false);
                    this.EnemyBounce();
                    this.physics.world.removeCollider(this.playerslime1collider);
                    this.slime1.anims.play('sdeath');
                    console.log("animation started")
                    this.slime1.on('animationcomplete', () => {
                        console.log(this.slime1.y);
                        this.slime1.y += 250;
                        this.slime1.anims.play('shide');
                    });
                }
                break;
        }
    }
    EnemyBounce() {
        this.player.setVelocityY(this.jp * -1);
    }

    collectStar(player, star) {
        if (star != null) {
            star.body.setAllowGravity(false);
            star.y += 500;
        }
        //star.disableBody(true, true);

        //  Add and update the score
        //this.score += 1;
        //this.scoreText.setText(`Score: ${this.score}`);
        this.player.setScale(0.5, 1);
        this.player.y -= 10;
        this.playerscaley = 14;
        this.height = 2;
    }
    collectCoin(player, coin) {
        coin.body.setAllowGravity(false);
        coin.y += 500;
        //star.disableBody(true, true);

        //  Add and update the score
        this.score += 1;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    hitBomb(player, bomb) {
        this.killPlayer();
    }



}