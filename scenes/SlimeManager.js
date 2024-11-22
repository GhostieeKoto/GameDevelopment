export class SlimeManager {
    constructor(scene) {
        this.scene = scene;
        this.slimes = new Map();
        this.nextId = 0;
    }

    createSlime(x, y) {
        const id = this.nextId++;
        const newSlime = this.scene.physics.add.sprite(x, y, 'slime');
        newSlime.setSize(18, 16);
        newSlime.name = `slime_${id}`;

        const slimeProps = {
            id,
            sprite: newSlime,
            isDead: false,
            isWalking: true,
            isJumping: false
        };

        this.slimes.set(id, slimeProps);

        this.addColliders(slimeProps);
        return id;
    }
    addColliders(slimeProps) {
        if (this.scene.platforms) {
            this.scene.physics.add.collider(slimeProps.sprite, this.scene.platforms);
        }
        if (this.scene.ground) {
            this.scene.physics.add.collider(slimeProps.sprite, this.scene.ground);
        }
        // Add collision with the player
        if (this.scene.player) {
            this.scene.physics.add.collider(slimeProps.sprite, this.scene.player, this.scene.handleMobCollision, null, this.scene);
        }
    }


    getSlime(id) {
        return this.slimes.get(id);
    }

    removeSlime(id) {
        const slime = this.slimes.get(id);
        if (slime) {
            slime.sprite.destroy();
            this.slimes.delete(id);
        }
    }

    getAllSlimes() {
        return Array.from(this.slimes.values());
    }
}