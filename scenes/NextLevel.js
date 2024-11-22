export class NextLevel extends Phaser.Scene {
    constructor() {
        super("NextLevel");
    }

    init(data) {
        this.nextScene = data.nextScene;
        this.lives = data.lives;
        this.world = data.world;
        this.level = data.level;
    }

    create() {
        // Center of the screen
        const centerX = this.cameras.main.width / 2;
        const centerY = this.cameras.main.height / 2;

        // Add respawn text
        this.add.text(centerX, centerY - 50, `World ${this.world}, Level ${this.level}`, { 
            fontSize: '32px', 
            fill: '#fff' 
        }).setOrigin(0.5);

        // Add lives text
        this.add.text(centerX, centerY + 50, `Lives remaining: ${this.lives}`, { 
            fontSize: '24px', 
            fill: '#fff' 
        }).setOrigin(0.5);

        // After a delay, return to the previous scene
        this.time.delayedCall(500, () => {
            this.scene.start(this.nextScene, { lives: this.lives });
        }, [], this);
    }
}