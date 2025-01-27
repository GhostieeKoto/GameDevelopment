export class WellManager {
    constructor(scene) {
        this.scene = scene;
        this.Wells = new Map();
        this.nextId = 0;
        this.WellGroup = this.scene.physics.add.staticGroup();
        this.wellProps = null;
    }

    addWell(x, y, canEnter) {
        const id = this.nextId++;
        let tid = canEnter ? 'Well2' : 'Well1';
        // Wait if type id is tid, does that mean type id directory would be tiddy?
        const newWell = this.WellGroup.create(this.scene.grid * x, this.scene.grid * y, tid);
        newWell.name = `Well_${id}`;
        newWell.setDepth(10);
        
        const WellProps = {
            id,
            sprite: newWell,
            canEnter: canEnter
        };
        this.Wells.set(id, WellProps);
        this.WellGroup.add(newWell);
        this.addColliders(WellProps);
        return newWell;
    }
    
    addColliders() {
        console.log("Player:", this.scene.player);
        console.log("WellGroup children:", this.WellGroup.getChildren());
        if (this.scene.player && this.WellGroup.getChildren().length > 0) {
            let wellcollider = this.scene.physics.add.collider(this.scene.player, this.WellGroup, this.scene.handleWellCollision, null, this);
            console.log("Collider added between player and WellGroup");
            console.log(wellcollider);
        } else {
            console.log("Failed to add collider. Player or WellGroup not ready.");
        }
    }


handleWellCollision(player, well) {
    console.log('Player collided with well:', well.name);
    this.scene.onOpenWell = true;
    // Add any specific collision handling logic here
}
    PlayerOnWell(){
    }
    enterWell(){
        console.log("Entering well...");
        // Add any specific well entering logic here
    }

    getWell(id) {
        console.log(this.Wells.get(parseInt(id)));
        return this.Wells.get(parseInt(id));
    }

    getAllWells() {
        return Array.from(this.Wells.values());
    }
}