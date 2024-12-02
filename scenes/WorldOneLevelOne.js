import { SlimeManager } from "./SlimeManager.js";
export class WorldOneLevelOne extends Phaser.Scene {

    constructor() {
        super("WorldOneLevelOne");
        this.resetSlimeState();
        this.pKey;
        this.oKey;
        this.rKey;
        this.slimeManager = null;
        this.key1;
        this.acceleration = 10; // Acceleration rate
        this.deceleration = 10; // Deceleration rate
        this.maxSpeed = this.pspeed; // Maximum speed (use your existing pspeed value)
        this.inCutscene = true;
        this.timeLeft = 400;
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
    updateGame = false;
    loading = true;
    platforms;
    ground;
    luckyblocks;
    castle;
    lbname;
    bombs;
    sky;
    grid = 32;
    startGame;
    lives = 3;
    coinz = 0;
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
    playerfixed = false;
    pvfix = false;
    slimefix = false;
    go2;
    lby;
    PlayerCollides;
    PlayerCanMove = true;
    lb1used = false;
    lb2used = false;
    lb3used = false;
    doublejump = false;
    supersmash = false;
    gpound = false;
    jp = 350;
    pspeed = 320;
    g = 500;
    hasHitGround = false;
    cantgrow = false;
    create() {
        this.PlayerCanMove = true;
        this.cantgrow = false;
        this.score = 0;
        this.slimeManager = new SlimeManager(this);
        this.timeLeft = 100;
        this.inCutscene = true;
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
        this.zones = this.physics.add.staticGroup();
        this.luckyblocks = this.physics.add.staticGroup();
        this.startGame = this.physics.add.staticGroup();
        this.slimes = [];
        this.slime = this.physics.add.group({
            setSize: { x: 18, y: 16 },
            setScale: { x: 1.25, y: 1.25 },
            onCollide: true,
            setDepth: 1
        });
        this.slime.children.iterate((child) => {
            child.name = $`slime${child.y}`
        });

        this.slime.getChildren().forEach((slime, index) => {
            slime.on('animationcomplete', () => {
                const ts = this.slimes[index];
                if (!ts.isDead) {
                    this.stopSlime(index);
                    this.time.delayedCall(500, () => this.slimeWalk(index), [], this);
                }
            });
        });

        // The slime
        //this.slime.create(this.grid*18, 400, 'slime').setSize(18,16);
        //this.slime1.setSize(18, 16);
        this.end = this.physics.add.staticGroup();
        this.flag = this.physics.add.staticGroup();
        //this.winlevel = this.physics.add.staticGroup();
        this.PIdleTO = new Phaser.Time.TimerEvent({ delay: 2000 });
        this.phitcd = new Phaser.Time.TimerEvent({ delay: 500 });
        this.stopvibrating = new Phaser.Time.TimerEvent({ delay: 25 });
        this.time.addEvent(this.stopvibrating);
        this.stopvibrating.paused = false;
        this.time.addEvent(this.phitcd);
        this.phitcd.paused = false;
        this.time.addEvent(this.PIdleTO);
        this.PIdleTO.paused = true;
        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.ground = this.platforms.create(0, 500, 'ground').setScale(1000, 1).refreshBody();
        this.ground2 = this.platforms.create(0, 590, 'ground').setScale(1000, 5).refreshBody();
        this.ground.setDepth(10);
        this.ground2.setDepth(10);
        this.ground.name = 'ground';
        //this.startGame.create((this.iw/2)+500, 50, 'zone');

        // Create Timer for time left
        this.timeLeftTimer = new Phaser.Time.TimerEvent({ delay: 1000 });
        this.time.addEvent(this.timeLeftTimer);

        //  Now let's create some ledges
        this.platforms.create(this.grid * 15, 400, 'ground').setScale(1, 1).setDepth(10).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 17, 400, 'ground').setScale(1, 1).setDepth(10).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 25, 468, 'ground').setScale(1, 1).setDepth(10).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 25, 436, 'ground').setScale(1, 1).setDepth(10).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 25, 404, 'ground').setScale(1, 1).setDepth(10).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 24, 404, 'ground').setScale(1, 1).setDepth(10).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 23, 404, 'ground').setScale(1, 1).setDepth(10).refreshBody().name = "Brick";
        this.platforms.create(this.grid * 24, 436, 'ground').setScale(1, 1).setDepth(10).refreshBody().name = "Brick";
        this.zones.create(this.grid * 60, this.grid * 15, 'ground').setScale(1, 1).setDepth(10).refreshBody().name = "Brick";


        // Create the castle
        this.castle = this.end.create(this.grid * 70, 300, 'castle');
        this.flag = this.flag.create(this.grid * 60, this.grid * 12, 'flag');
        this.castle.name = 'Castle';
        this.castle.setSize(37, 75);
        this.castle.setOffset(225, 390);
        this.flag.name = 'FlagPole';
        this.flag.setScale(0.2);
        this.flag.setSize(10, 250);
        this.flag.onOverlap = true;
        this.flag.setOffset(595, 475);
        this.physics.world.createDebugGraphic();



        // The player and its settings
        this.player = this.physics.add.sprite(0, 450, 'idle');
        this.lbplr = this.physics.add.sprite(0, 450, 'air');
        this.duckscan = this.physics.add.sprite(0, 450, 'air');
        this.playerscaley = 0;
        this.player.name = 'player';
        this.lbplr.name = 'lbplr';
        this.duckscan.name = 'duckscan';
        //this.player.setSize(26, 35);
        //this.player.setOffset(3, -2);
        this.player.setSize(60, 54);
        this.player.setOffset(65, 65);
        this.player.setScale(0.5, 0.55);
        //this.player.setOrigin(0.5, 1);
        this.lbplr.setSize(15, 5);
        this.lbplr.setOffset(0, -10);
        this.lbplr.body.setAllowGravity(false);
        this.lbplr.body.onCollide = true;
        this.duckscan.setSize(15, 5);
        this.duckscan.setOffset(0, -10);
        this.duckscan.body.setAllowGravity(false);
        this.duckscan.body.onCollide = true;
        this.player.body.onCollide = false;


                this.physics.world.on('collide', (object1, object2, body1, body2) =>
                    {
                        let obj1top = object1.getBounds().top;
                        let obj1btm = object1.getBounds().bottom;
                        let obj2btm = object2.getBounds().bottom;
                        let obj2top = object2.getBounds().top;
                
                        //console.log(object1.name);
                        //console.log(object2.name);
                        //console.log(obj1top, obj2btm);
                
                        if (obj1top >= obj2btm && object1.name.includes("lbplr")) {
                            console.log('Top of the hitbox hits the lucky block!');
                            this.hitLuckyBlock(object2.name);
                        }
                        if (obj1top <= obj2btm && object1.name.includes("duckscan")) {
                            //console.log('Block above you isn\'t air');
                            this.cantgrow = true;
                            //this.hitLuckyBlock(object2.name);
                        }
                        if (obj1top >= obj2btm && object1.name.includes("lbplr") && object2.name.includes("Brick") && !this.playerdead) {
                            console.log('Top of the hitbox hits the lucky block!');
                            this.breakBrick(object2);
                        }
                    });
    
        //  Player physics ts. Give the little guy a slight bounce.
        this.player.setBounce(0.15);
        this.player.setCollideWorldBounds(true);
        this.playerdead = false;
        this.playerwon = false;

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
        this.rKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
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
        //const bomb1 = this.bombs.create(2000, 300, 'bomb');
        //bomb1.setBounce(0);
        //bomb1.setCollideWorldBounds(true);

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
        const cwidth = this.cameras.main.width;
        const cheight = this.cameras.main.height;


        
        //  The score
        this.scoreText = this.add.text(0, 16, 'Score', { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setOrigin(0).setScrollFactor(0);
        this.scoreNum = this.add.text(32, 64, '   0', { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setOrigin(0.5).setScrollFactor(0);
        this.timeText = this.add.text(cwidth / 4, 16, 'Time', { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setOrigin(0).setScrollFactor(0);
        this.timeNum = this.add.text(cwidth / 3.35, 64, `${this.timeLeft}`, { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setOrigin(0.5).setScrollFactor(0);
        this.worldText = this.add.text(cwidth / 1.5, 16, 'World: 1-1', { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setOrigin(0).setScrollFactor(0);
        this.coinsText = this.add.text(cwidth / 1.5, 16, `Coins: ${this.coinz}`, { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setOrigin(0).setScrollFactor(0);
        //this.livesText = this.add.text(this.cameras.x, 48, `Lives: ${this.lives}`, { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setScrollFactor(0);

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.stars, this.luckyblocks);
        this.physics.add.collider(this.coins, this.platforms);
        this.physics.add.collider(this.coins, this.luckyblocks);
        this.playergroundcollider = this.physics.add.collider(this.player, this.platforms, this.handleCollision, null, this);
        this.playergroundcollider2 = this.physics.add.collider(this.lbplr, this.platforms, this.handleCollision, null, this);
        this.playerflagcollider = this.physics.add.overlap(this.player, this.flag, this.winLevel, null, this);
        this.playerflag2collider = this.physics.add.overlap(this.player, this.zones, this.runCastle, null, this);
        this.playercastlecollider = this.physics.add.overlap(this.player, this.castle, this.enterCastle, null, this);
        this.physics.add.overlap(this.lbplr, this.luckyblocks, this.handleCollision, null, this);
        this.physics.add.collider(this.duckscan, this.platforms, this.handleCollision, null, this);
        this.physics.add.overlap(this.player, this.platforms, this.handleCollision, null, this);
        this.playerluckyblockcollider = this.physics.add.collider(this.player, this.luckyblocks, this.handleCollision, null, this);
        this.playerluckyblockcollider2 = this.physics.add.collider(this.lbplr, this.luckyblocks, this.handleCollision, null, this);
        this.physics.add.collider(this.bombs, this.platforms);
        
        //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
        this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        //this.physics.add.overlap(this.player, this.startGame, this.startGameCutscene, null, this);
        this.playerbombcollider = this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        console.log(this.slimes);
        this.summonSlime(18, 14);
        console.log("create done!");
        this.PIdleTO.paused = false;
        console.log(this.sys.game.config.height);
    }
    update() {
        if (this.timeLeftTimer.getRemaining() == 0 && !this.playerwon) {
            this.timeLeft--;
            this.timeNum.setText(`${this.timeLeft}`);
            this.timeLeftTimer.reset({ delay: 1000 });
        }
        if (this.timeLeft <= 0 && !this.playerwon) {
            if (!this.playerdead) {
                this.forceKillPlayer();
            }
        }

        if (this.playerwon) {
            this.testForCastle();
        }

        this.checkSlimes();

        //console.log(this.PIdleTO.getRemaining());
        //console.log(this.player.body.velocity.x);
        if (!this.cursors.down.isDown && this.height == 2 && !this.playerwon && !this.cantgrow) {
            this.player.setScale(0.5, 1);
            if (!this.playerfixed) {
                this.player.y -= 10;
                this.playerfixed = true;
                this.PlayerCanMove = true;
                this.playerscaley = 15;
            }
        }
        // Dev Cheats
        if (Phaser.Input.Keyboard.JustDown(this.key1)) {
            this.player.x = 2000;
        }

        // Pretend you just collected a star
        if (Phaser.Input.Keyboard.JustDown(this.pKey)) {
            this.collectStar(null, null);
        }
        // Restart Scene
        if (Phaser.Input.Keyboard.JustDown(this.rKey)) {
            this.scene.start("WorldOneLevelOne");
        }
        // Spawn a slime enemy
        if (Phaser.Input.Keyboard.JustDown(this.oKey)) {
            console.log(this.player.x - this.player.x % this.grid);
            this.summonSlime((this.player.x - this.player.x % this.grid + this.grid * 5) / this.grid, (this.player.y - this.player.y % this.grid - this.grid * 1) / this.grid);
        }
        // Spawn the bombs (This isn't spawning a bomb on command)
        if (this.bombs.getChildren().length > 0) {
            const bomb = this.bombs.getChildren()[0];  // Get the first (and only) bomb
            if (bomb.body.touching.down) {
                bomb.setVelocityX(0);
            }
        }
        if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
            this.resetPlayerIdleTimeout();
        } else if (this.player.body.touching.down) {
            if (this.player.body.velocity.x === 0) {
                //this.player.setOffset(65, 65);
                if (this.PIdleTO.getRemaining() === 0) {
                    //console.log("Player Idle");
                    this.PlayerIdle();
                }
            }
        }
        // Check if the player is touching the ground
        if (this.player.body.touching.down) {
            this.hasHitGround = true;
            // If so, then reset the double jump
            this.doublejump = true; // allow jump
            // Also reset the ground pound ability
            this.gpound = true;
            this.supersmash = false;
            // The Super Smash ability disables the player's bounce effect
            // So it's reinstated here
            this.player.setBounce(0.15);
            // if on ground then start idle timer
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
        this.duckscan.x = this.player.x;
        this.duckscan.y = (this.player.y-(this.player.y%this.grid)) - this.playerscaley; // Account for if the player is big
        //console.log(this.go2);

        // Prevent player from doing anything while still in the cutscene
        if (this.player.x < 100 && this.inCutscene) {
            //this.player.anims.play('prun', true);
            this.player.setVelocityX(320);
        } else {  // But make sure that you collide with world bounds ONLY IF NOT DEAD
            if (!this.playerdead) {
                this.player.setCollideWorldBounds(true);
            }
            //this.player.setVelocityX(0); // Set velocity to 0 if on the ground. This shouldn't work, but it does.
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
            if (this.player.y > 950) { // If the player is too low then kill them
                console.log("Player is dead");
                if (!this.playerdead) {
                    this.killPlayer();
                }
            }
            //console.log(this.player.body.velocity.x);
            // Controls

            if (this.cursors.left.isDown && this.PlayerCanMove && !this.playerdead) {
                this.resetPlayerIdleTimeout();
                if (this.player.body.velocity.x > -1 * this.maxSpeed) {
                    this.player.setVelocityX(this.player.body.velocity.x - this.acceleration);
                }
                this.player.setFlipX(true); // If the player is moving left, flip the sprite
                this.player.anims.play('prun', true);
                //this.player.setOffset(65, 70);
            }
            else if (this.cursors.right.isDown && this.PlayerCanMove && !this.playerdead) {
                this.resetPlayerIdleTimeout();
                if (this.player.body.velocity.x < this.maxSpeed) {
                    this.player.setVelocityX(this.player.body.velocity.x + this.acceleration);
                } else {
                    this.player.setVelocityX(this.maxSpeed);
                }
                this.player.setFlipX(false); // If the player is moving right, flip the sprite again to make it unflipped
                this.player.anims.play('prun', true);
                //this.player.setOffset(65, 70);
            }
            else {
                if (this.player.body.velocity.x > 1) {
                    this.player.setVelocityX(this.player.body.velocity.x - (this.deceleration / 150 * this.player.body.velocity.x));
                } else if (this.player.body.velocity.x < 1 && this.player.body.velocity.x > 0) {
                    this.player.setVelocityX(0);
                }

                if (this.player.body.velocity.x < -1) {
                    this.player.setVelocityX(this.player.body.velocity.x - (this.deceleration / 150 * this.player.body.velocity.x));
                } else if (this.player.body.velocity.x > -1 && this.player.body.velocity.x < 0) {
                    this.player.setVelocityX(0);
                }
                //this.player.anims.play('turn', true); // Once we switch assets, an idle animation will be created.
            }
            //console.log(this.timedEvent.paused, this.timedEvent.getRemaining());

            if (Phaser.Input.Keyboard.JustDown(this.cursors.up)) // If the player presses the jump button
            {
                //console.log("a");
                this.resetPlayerIdleTimeout();
                if (!this.playerdead) { // If the player isn't dead
                    //console.log("b");
                    //console.log("Player Body Touching Down: ", this.player.body.touching.down);
                    //console.log("Double Jump: ", this.doublejump);
                    if (!this.player.body.touching.down && this.doublejump) { // If the player is not on the ground
                        //console.log("c");
                        this.player.setVelocityY(this.jp * -1); // then double jump
                        this.doublejump = false; // Allow jump
                        if (this.gpound) { // if the player hasn't hit the down arrow
                            this.supersmash = true; // then they can do a super smash
                        } else {
                            this.gpound = true; // otherwise they do another ground pound
                        }
                    }
                }
                if (this.player.body.touching.down) { // If the player is on the ground and can jump
                    this.player.setVelocityY(this.jp * -1);
                    this.hasHitGround = false;
                }
            }
            if (this.cursors.down.isDown) {
                this.resetPlayerIdleTimeout();
                if (!this.playerdead && this.PlayerCanMove) {
                    if (!this.player.body.touching.down) {
                        if (this.supersmash) {
                            this.player.setVelocityY(this.jp * 3);
                            this.player.setBounce(0);
                            this.gpound = false;
                            this.supersmash = false;
                        }
                        if (this.gpound) {
                            this.player.setVelocityY(this.jp * 1);
                            this.player.setBounce(0);
                            this.gpound = false;
                        }
                    } else if (this.height == 2) {
                        this.player.setScale(0.5, 0.55);
                        this.playerfixed = false;
                        this.PlayerCanMove = false;
                        this.playerscaley = 0;
                    }
                }
            }
        }
    }
    checkSlimes() {
        this.slimeManager.getAllSlimes().forEach(slime => {
            //console.log(slime.id);
            if (slime.sprite.y > this.sys.game.config.height) {
                // If the slime has fallen off the screen, remove it
                this.slimeManager.removeSlime(slime.id);
            }else{
                this.checkSlime(slime.id);
            }
        });
    }

    checkSlime(id) {
        const slime = this.slimeManager.getSlime(id);
        if (!slime) return;

        if(slime.isWalking) {
            slime.sprite.setFlipX(true);
            slime.isWalking = false;
            this.slimeWalk(id);
        }
    }

    winLevel() {
        if (!this.playerwon) {
            this.player.body.setAllowGravity(false);
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            this.PlayerCanMove = false;
            this.player.anims.stop();
            this.player.setVelocityY(50);
        }
    }

    handleBlockCollision(object1, object2) {

    }

        handleMobCollision(slimeSprite, player){
        console.log("Player collided with slime!");
        console.log(slimeSprite.name);
        const slimeId = parseInt(slimeSprite.name.split('_')[1]);
        const slime = this.slimeManager.getSlime(slimeId);
        console.log(slimeId, slime);
        if (!slime) return;
    
        const playerBottom = player.body.bottom;
        const slimeTop = slimeSprite.body.top;
        const slimeHeight = slimeSprite.body.height;
        const collisionPoint = (playerBottom - slimeTop) / slimeHeight;
        console.log(collisionPoint);
        if (collisionPoint <= 0.5) {
            this.killSlime(slimeId);
            player.setVelocityY(-200);
            this.addPoints(100);
        } else {
            this.killPlayer(slimeId);
        }
    }

    summonSlime(x, y) {
        this.slimeManager.createSlime(this.grid*x, this.grid*y, 1.5);
    }

    runCastle() {
        this.playerwon = true;
        this.player.anims.play('prun', true);
        this.playerhidden = false;
        this.testForCastle();

    }

    testForCastle() {
        if (!this.oncastle) {
            this.player.setVelocityX(100);
            this.player.anims.play('prun', true);
            this.player.setFlipX(false);
            this.player.setVelocityY(50);
        }
    }

    enterCastle() {
        this.oncastle = true;
        console.log("You entered the castle!");
        this.player.setVelocityY(0);
        setTimeout(() => {
            this.player.setVisible(false);
            this.player.setVelocityX(0);
            this.player.body.setAllowGravity(false);
            if (!this.playerhidden) {
                this.player.y -= 100;
                this.playerhidden = true;
            }
        }, 1000);
    }

    resetPlayerIdleTimeout() {
        this.PIdleTO.paused = true;
        this.PIdleTO.reset({ delay: 2000 });
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
    slimeWalk(id) {
        const slime = this.slimeManager.getSlime(id);
        if(!slime || slime.isDead) return;

        slime.sprite.anims.play('swalk');
        this.time.delayedCall(50, () => {
            if(slime && !slime.isDead) {
                slime.sprite.setVelocityX(-50);
            }
        });
        this.time.delayedCall(500, () => {
            if(slime && !slime.isDead){
                this.stopSlime(id);
            }
        });
    }
    stopSlime(id) {
        const slime = this.slimeManager.getSlime(id);
        if (!slime || slime.isDead) return;

        slime.sprite.setVelocityX(0);
        slime.sprite.anims.stop();
        this.time.delayedCall(500, () => {
            if(slime &&!slime.isDead) {
                this.slimeWalk(id);
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

    breakBrick(brick) {
        console.log(brick);
        this.tbrick = brick;
        if (!brick.name.includes("LuckyBlock")) {
            if (this.height == 2) {
                brick.destroy();
                if(this.cantgrow) {
                    this.cangrow = false;
                }
            } else if (this.height == 1) {
                if (!brick.isAnimating) {
                    brick.isAnimating = true;
                    brick.anims.play('bhit', true);

                    brick.once('animationcomplete', () => {
                        brick.isAnimating = false;
                        setTimeout(() => {
                            brick.setTexture('ground');  // Reset to original texture
                        }, 250);
                    });
                }
            }
        }
    }

    forceKillPlayer() {
        console.log("no more tall :(");
        this.updatePlayerScale(0.5, 0.55);
        this.physics.world.removeCollider(this.playerslime1collider);
        this.physics.world.removeCollider(this.playerbombcollider);
        this.playerdead = false;
        this.player.setCollideWorldBounds(true);
        this.playerdead = true;
        this.player.anims.play('pdie', true);
        setTimeout(() => {
            if (this.lives > 1) {
                this.lives--;
                this.scene.start("NextLevel", { nextScene: "WorldOneLevelOne", world: 1, level: 1, lives: this.lives });
            } else if (this.lives == 1) {
                this.lives--;
                this.scene.start("NextLevel", { nextScene: "mainMenu", world: 1, level: 1, lives: this.lives });
            }
        }, 1000);

    }

    killPlayer(id) {
        try {
            console.log(this.phitcd.getRemaining());
            if (this.phitcd.getRemaining() == 0) {
                if (this.height == 1) {
                    this.playerdead = true;
                    this.slimeManager.removeColliders(id);
                    console.log("lmao");
                    this.player.setVelocityX(this.player.body.velocity.x * -1);
                    this.physics.world.removeCollider(this.playerbombcollider);
                    this.player.setDepth(100);
                    this.player.anims.play('pdie', true);
                    setTimeout(() => {
                        if (this.lives > 1) {
                            this.lives--;
                            this.scene.start("NextLevel", { nextScene: "WorldOneLevelOne", world: 1, level: 1, lives: this.lives });
                        } else if (this.lives == 1) {
                            this.lives--;
                            this.scene.start("NextLevel", { nextScene: "mainMenu", world: 1, level: 1, lives: this.lives });
                        }
                    }, 1000);
                } else if (this.height == 2) {
                    console.log("no more tall :(");
                    this.updatePlayerScale(0.5, 0.55);
                    //this.physics.world.removeCollider(this.playerslimecollider);
                    this.playerdead = false;
                    this.player.setCollideWorldBounds(true);
                    this.enablePlayerCollision(id);
                }
                this.time.addEvent(this.phitcd);
            }
        } catch (error) {
            console.log("Something went wrong with killing the player");
            console.log(error);
        }
    }
    updatePlayerScale(scaleX, scaleY) {
        this.player.setScale(scaleX, scaleY);
        this.height = 1;
        this.playerscaley = 0;
    }
    enablePlayerCollision(id) {
        const slime = this.slimeManager.getSlime(id);
        if(!slime || slime.isDead) return;
        this.slimeManager.addPlayerColliders(slime);
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

    killSlime(id) {
        const slime = this.slimeManager.getSlime(id);
        if(!slime || slime.isDead) return;
        this.slimeManager.removeColliders(id);

        slime.isDead = true;
        slime.sprite.anims.play('sdeath');
        this.EnemyBounce();
        this.time.delayedCall(500, () => {
            this.slimeManager.splitSlime(id);
        });
    }

    EnemyBounce() {
        this.player.setVelocityY(this.jp * -1);
        this.doublejump = true;
        console.log(this.hasHitGround);
    }
    PlayerIdle() {
        this.PIdleTO.paused = true;
        this.PIdleTO.reset();
        this.player.anims.play('pidle', true);
    }

    collectStar(player, star) {
        if (star != null) {
            star.body.setAllowGravity(false);
            star.y += 500;
            this.addPoints(1000);
        }
        //star.disableBody(true, true);

        //  Add and update the score
        //this.score += 1;
        //this.scoreText.setText(`Score: ${this.score}`);
        this.player.setScale(0.5, 1);
        this.player.y -= 10;
        this.playerscaley = 15;
        this.height = 2;
    }
    collectCoin(player, coin) {
        coin.body.setAllowGravity(false);
        coin.y += 500;
        //star.disableBody(true, true);

        //  Add and update the score
        this.addPoints(200);
        this.coinamt++;
        if (this.coinz > 99) {
            this.lives++;
        }
    }
    /**
     * Adds points to the player's score.
     * @param {number} pts - The number of points to add.
     */
    addPoints(pts) {
        this.score += pts;
        this.scoreNum.setText(`  ${this.score}`);
    }

    hitBomb(player, bomb) {
        this.killPlayer();
    }

    freezeGameTime() {
        this.physics.world.timeScale = 0;
        this.time.timeScale = 0;
        this.anims.globalTimeScale = 0;
    }

    unfreezeGameTime() {
        this.physics.world.timeScale = 1;
        this.time.timeScale = 1;
        this.anims.globalTimeScale = 1;
    }
}