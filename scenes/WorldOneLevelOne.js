class WorldOneLevelOne extends Phaser.Scene {
    constructor() {
        super("WorldOneLevelOne");
        this.resetSlimeState();
    }

    init(data) {
        // If lives data is passed, use it; otherwise, set to default (e.g., 3)
        this.lives = data.lives !== undefined ? data.lives : 3;
    }

    resetSlimeState() {
        this.s1left = false;
        this.s1right = true;
        this.s1idle = false;
        this.s1jump = false;
        this.s1die = false;
        this.s1dead = false;
        this.s1walking = false;
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
    grid = 32;
    startGame;
    inCutscene = true;
    lives = 3;
    stars;
    player;
    slime;
    s1left = false;
    s1right = true;
    s1idle = false;
    s1jump = false;
    s1die = false;
    s1dead = false;
    s1walking = false;
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
    g = 500;
    create ()
    {
        this.lb1used = false;
        this.lb2used = false;
        this.lb3used = false;
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
        this.timedEvent = new Phaser.Time.TimerEvent({ delay: 500 });
        this.time.addEvent(this.timedEvent);
        this.timedEvent.paused = true;
        //  Here we create the ground.
        //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
        this.ground = this.platforms.create(0, 500, 'ground').setScale(1000, 1).refreshBody();
        this.ground.setDepth(10);
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
            key: 'cspin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 3 }),
            frameRate: 4,
            repeat: -1
        });

        //  Now let's create some ledges
        this.platforms.create((this.iw/2-(this.grid*2.5)), 400, 'ground').setScale(1, 1).refreshBody().name = "Brick";
        this.platforms.create((this.iw/2-(this.grid*0.5)), 400, 'ground').setScale(1, 1).refreshBody().name = "Brick";

        // The slime
        this.slime1 = this.physics.add.sprite(500, 450, 'slime');
        this.slime1.setSize(18,16);
        this.slime1.setScale(1.25,1.25);
        this.slime1.body.onCollide = true;
        this.slime1.setCollideWorldBounds(true);
        this.slime1.name = 'slime1';
        this.slime1.setDepth(1);
        this.s1dead = false;
        this.s1right = true;
        this.resetSlimeState();  // Reset the slime's state

        // The player and its settings
        this.player = this.physics.add.sprite(0, 450, 'dude');
        this.lbplr = this.physics.add.sprite(0, 450, 'air');
        this.playerscaley = 0;
        this.player.name = 'player';
        this.lbplr.name = 'lbplr';
        this.player.setSize(26,40);
        this.player.setOffset(3,2);
        this.lbplr.setSize(26,5);
        this.lbplr.setOffset(-5,-12);
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
            if (obj1top <= obj2btm-25 && object2.name.includes("player") && object1.name.includes("slime")) {
                this.killPlayer();
            }
            if (obj1top >= obj2btm-25 && object2.name.includes("player") && object1.name.includes("slime")) {
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
        this.player.setCollideWorldBounds(false);
        this.playerdead = false;
        
        // Start Camera Following
        this.cameras.main.startFollow(this.player);
        //alert("Camera Followed");


        //  Input Events
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setBounds(0, 0, 999999999, 0);
        this.physics.world.setBounds(0, 0, 5000, 1000);
        this.cursors = this.input.keyboard.createCursorKeys();

        this.cameras.main.followOffset.set(0, 0);

        this.cameras.main.setDeadzone(200, 350);
        this.cameras.main.setZoom(1);

        //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
        this.stars = this.physics.add.group({
            defaultKey: 'star',
            repeat: 1,
        });
        this.stars.children.iterate(child =>
        {
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0, 0.5))

        });
        this.coins = this.physics.add.group({
            defaultKey: 'coin',
            repeat: 1,
        });
        this.coins.children.iterate(child =>
        {
            //  Give each star a slightly different bounce
            child.setBounceY(Phaser.Math.FloatBetween(0, 0.5))

        });
        // Lucky Block Stuff
        this.lb1coin = this.coins.create((this.iw/2-(this.grid*1.5)), 400).setScale(1.25).anims.play('cspin', true).setOffset(0,2);
        this.lb2coin = this.coins.create((this.iw/2-(this.grid*7.5)), 400).setScale(1.25).anims.play('cspin', true).setOffset(0,2);
        this.lb3star = this.stars.create((this.iw/2-(this.grid*1.5)), 300);
        this.lb1coin.body.setAllowGravity(false);
        this.lb2coin.body.setAllowGravity(false);
        this.lb3star.body.setAllowGravity(false);
        this.lb1coin.name = "lb1coin";
        this.lb2coin.name = "lb2coin";
        this.lb3star.name = "lb3star";
        this.lb1 = this.luckyblocks.create((this.iw/2-(this.grid*1.5)), 400, 'block');
        this.lb2 = this.luckyblocks.create((this.iw/2-(this.grid*7.5)), 400, 'block');        
        this.lb3 = this.luckyblocks.create((this.iw/2-(this.grid*1.5)), 300, 'block');        
        this.lb1.name = "LuckyBlock1";
        this.lb1.body.onOverlap = true;
        this.lb2.name = "LuckyBlock2";
        this.lb2.body.onOverlap = true;
        this.lb3.name = "LuckyBlock3";
        this.lb3.body.onOverlap = true;
        this.bombs = this.physics.add.group();

        //  The score
        this.scoreText = this.add.text(this.cameras.x, 16, 'Score: 0', { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setScrollFactor(0);
        //this.livesText = this.add.text(this.cameras.x, 48, `Lives: ${this.lives}`, { fontSize: '32px', fill: '#000', fontFamily: 'cursive' }).setScrollFactor(0);

        //  Collide the player and the stars with the platforms
        this.physics.add.collider(this.stars, this.platforms);
        this.physics.add.collider(this.stars, this.luckyblocks);
        this.physics.add.collider(this.coins, this.platforms);
        this.physics.add.collider(this.coins, this.luckyblocks);
        this.playergroundcollider = this.physics.add.collider(this.player, this.platforms);
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
        this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
        console.log("create done!");
        console.log(this.slime1);
    }
    update ()
    {

        this.checkSlime1();

        if(this.player.body.touching.down){
            this.gpound = true;
            this.supersmash = false;
            this.player.setBounce(0.15);
        }
        this.lbplr.x = this.player.x;
        this.lbplr.y = this.player.y-this.playerscaley;
        //console.log(this.go2);
        if(this.player.x < 100 && this.inCutscene){
            this.player.anims.play('right', true);
            this.player.setVelocityX(320);
        }else{ 
        if(!this.playerdead){
        this.player.setCollideWorldBounds(true);
        }
        this.player.setVelocityX(0);
        this.inCutscene = false;
        //this.platforms.create(this.player.x, 500, 'ground').setScale(1).refreshBody();
        this.sky.tilePositionX += 1;
        //this.bg.tilePositionY += 1.5;
        const cam = this.cameras.main;

        if (cam.deadzone)
        {
            this.moveCam;
        }
        else if (cam._tb)
        {
            this.moveCam;
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
            if(!this.playerdead){
            this.player.setVelocityX(-320);
            this.player.anims.play('left', true);
        }
    }
        else if (this.cursors.right.isDown)
        {
            if(!this.playerdead){
            this.player.setVelocityX(320);
            this.player.anims.play('right', true);
        }
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if(this.player.body.touching.down){
            this.time.addEvent(this.timedEvent);
        }
        if (this.cursors.up.isDown)
        {
            if(!this.playerdead){
            if(!this.player.body.touching.down){
                if(this.timedEvent.getRemaining() == 0){
                    this.doublejump = true;
                    this.time.addEvent(this.timedEvent);
                    this.timedEvent.paused = true;
                }
            if(this.doublejump){
                this.player.setVelocityY(this.jp*-1);
                this.doublejump = false;
                if(this.gpound){
                    this.supersmash = true;
                }else{
                    this.gpound = true;
                }
            }
            }
            if(this.player.body.touching.down){
            this.player.setVelocityY(this.jp*-1);
            this.timedEvent.paused = false;
            }
        }
    }
        if (this.cursors.down.isDown){
            if(!this.playerdead){
            if(!this.player.body.touching.down){
                if(this.supersmash){
                    this.player.setVelocityY(this.jp*3);
                    this.player.setBounce(0);
                    this.gpound = false;
                    this.supersmash = false; 
                }
                if(this.gpound){
                this.player.setVelocityY(this.jp*1);
                this.gpound = false;
                    }
                }
        }
    }
}
}

    checkSlime1(){
        //console.log("checkslime1");
        if(this.s1die){
            this.slime1.setVelocityX(0);
        }else if(this.s1jump){

        }else if(this.s1left){
        this.slime1.setVelocityX(50);
        this.slime1.anims.play('swalk', true);
        }else if(this.s1right){
            this.slime1.setFlipX(true);
            if(!this.s1walking){
                //console.log("s1walking")
                this.s1walking = true;
            this.s1walkr();
            }
        }else{
            this.slime1.setVelocityX(0);
            this.slime1.anims.play('sidle', true);
        }
    }

    s1walkr(){
// Function to start the animation
const startAnimation = () => {
    //console.log('Starting animation');
    this.slime1.anims.play('swalk');
    this.slime1.setVelocity(-50)
};
startAnimation();
//console.log("e");
// Listen for the animation complete event
this.slime1.on('animationcomplete', () => {
    //console.log('Animation completed');
    // Stop moving the sprite
    this.slime1.setVelocityX(0);
    // Wait 500ms before starting the animation again
    this.time.delayedCall(500, startAnimation, [], this);
});
    }



    hitLuckyBlock(lbname) {
        //console.log(this.lb1used);
        this.lby = 0;
        this.player.setVelocityY(0);
        //console.log("Hit Lucky Block!!");
        if(!this.lb1used && lbname == "LuckyBlock1"){
        this.lb1.anims.play('lbup');
        this.lb1coin.body.setAllowGravity(true);
        this.lb1coin.setVelocityY(-190);
        this.lb1used = true;
        }
        if(!this.lb2used && lbname == "LuckyBlock2"){
        this.lb2.anims.play('lbup');
        this.lb2coin.body.setAllowGravity(true);
        this.lb2coin.setVelocityY(-190);
        this.lb2used = true;
        }
        if(!this.lb3used && lbname == "LuckyBlock3"){
        this.lb3.anims.play('lbup');
        this.lb3star.body.setAllowGravity(true);
        this.lb3star.setVelocityY(-190);
        this.lb3used = true;
        }
    }

    killPlayer(){
        this.playerdead = true;
        console.log("lmao");
        this.physics.world.removeCollider(this.playergroundcollider);
        this.physics.world.removeCollider(this.playerluckyblockcollider);
        this.physics.world.removeCollider(this.playerluckyblockcollider2);
        this.physics.world.removeCollider(this.playerslime1collider);
        this.player.setVelocityY(this.jp*-1.5);
        this.checkPlayerY();
    }

    checkPlayerY(){
        this.player.setVelocityX(0);
        this.player.anims.play('turn',true);
        if (this.player.y > 600) {
            // Action when the player reaches the desired y-coordinate
            console.log('Player has reached the desired y-coordinate');
            this.player.setCollideWorldBounds(false);
            // Do whatever action you need here
            if(this.lives > 1){
            this.lives--;
            this.scene.start("NextLevel", {nextScene: "WorldOneLevelOne", world:1, level:1, lives: this.lives});
            }else if(this.lives == 1){
            this.scene.start("mainMenu");
            }       
        } else {
            // Continue checking until player reaches the desired y-coordinate
            this.time.delayedCall(1, this.checkPlayerY, [], this);
        }
    }

    killSlime(slimeNum){
        slimeNum = parseInt(slimeNum.replace('slime',''));
        switch(slimeNum){
            case 1:
            if(!this.s1dead){
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
                console.log("Animation Completed");
                this.slime1.setCollideWorldBounds(false);
                this.slime1.y += 250;        
            });
        }
            break;
        }
    }
        EnemyBounce() {
            this.player.setVelocityY(this.jp*-1);
        }

        collectStar (player, star)
        {
            star.body.setAllowGravity(false);
            star.y += 500;
            //star.disableBody(true, true);
            
            //  Add and update the score
            //this.score += 1;
            //this.scoreText.setText(`Score: ${this.score}`);
            this.player.setScale(1,1.5);
            this.playerscaley = 7.5;
        }
        collectCoin (player, coin)
        {
            coin.body.setAllowGravity(false);
            coin.y += 500;
            //star.disableBody(true, true);
            
            //  Add and update the score
            this.score += 1;
            this.scoreText.setText(`Score: ${this.score}`);
        }

    hitBomb (player, bomb)
    {
        location.reload();
    }



}