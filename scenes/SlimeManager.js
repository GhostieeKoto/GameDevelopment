export class SlimeManager {
    constructor(scene) {
        this.scene = scene;
        this.slimes = new Map();
        this.nextId = 0;
        this.slimeGroup = this.scene.physics.add.group();
    }

    createSlime(x, y, size) {
        const id = this.nextId++;
        const slimeSize = size !== undefined ? size : 1;
        console.log(slimeSize);
        const newSlime = this.scene.physics.add.sprite(x, y, 'slime');
        newSlime.setSize(18, 16);
        newSlime.setScale(slimeSize, slimeSize);
        newSlime.name = `slime_${id}`;

        const slimeProps = {
            id,
            sprite: newSlime,
            size: slimeSize,
            isDead: false,
            isWalking: true,
            isJumping: false
        };

        this.slimes.set(id, slimeProps);
        this.slimeGroup.add(newSlime);

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
        this.scene.physics.add.collider(slimeProps.sprite, this.slimeGroup);
    }

    addPlayerColliders(slimeProps){
        this.scene.physics.add.collider(slimeProps.sprite, this.scene.player, this.scene.handleMobCollision, null, this.scene);
    }

    removeColliders(id) {
        const slimeProps = this.slimes.get(id);
        slimeProps.sprite.body.destroy();
    }

    splitSlime(id) {
        const slimeProps = this.slimes.get(id);
        const splitSize = Math.round(Math.random() * 4) + 1;
        if (slimeProps.size > 1){
            const newSize = slimeProps.size - 0.5;
            const newX = slimeProps.sprite.x +  (18 * (slimeProps.size - newSize)) / 2;
            for(let i = 0; i < splitSize; i++){
            this.createSlime((Math.round(Math.random()*20)-(Math.round(Math.random()*40)))+newX, slimeProps.sprite.y, newSize);
            }
            slimeProps.size = newSize;
            this.addColliders(slimeProps);
        }
        this.removeSlime(id);
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