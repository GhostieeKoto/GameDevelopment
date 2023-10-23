class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload() {
        this.load.image("background", "/assets/menu/Backgrounds/GrassyMountains/Grassy_Mountains_preview_fullcolor.png");
        this.load.image('sky', '/assets/sky.png');
        this.load.image('ground', '/assets/platform.png');
        this.load.image('star', '/assets/star.png');
        this.load.image('bomb', '/assets/bomb.png');
        this.load.spritesheet("player_run", "assets/sprites/hobbits/Run.png",{
            frameWidth: 192,
            frameHeight: 192 
        });
        this.load.spritesheet("player_idle", "assets/sprites/hobbits/Idle.png",{
            frameWidth: 192,
            frameHeight: 192 
        });
        this.load.spritesheet("player_die", "assets/sprites/hobbits/PlayerDeath.png",{
            frameWidth: 192,
            frameHeight: 192 
        });
        this.load.spritesheet("player_stop", "assets/sprites/hobbits/Stop.png",{
            frameWidth: 192,
            frameHeight: 192 
        });
        this.load.spritesheet("player_attack", "assets/sprites/hobbits/Attack.png",{
            frameWidth: 192,
            frameHeight: 192 
        });
        this.load.spritesheet("player_block", "assets/sprites/hobbits/Block.png",{
            frameWidth: 192,
            frameHeight: 192 
        });
        //We don't have a jump animation yet. I'll do that when I get home
       // this.load.spritesheet("player_jump", "assets/sprites/hobbits/Jump.png",{
  //          frameWidth: 192,
 //           frameHeight: 192 
  //      });


    
            }
    create() {
        this.add.text(20, 20, "Loading game...", {font: '25px Arial', fill: 'red'});
        setTimeout( () => {this.scene.start("playGame")} , 1000);
        
    }

}
