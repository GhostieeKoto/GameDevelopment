export class LuckyBlockManager {
    constructor(scene) {
        this.scene = scene;
        this.LuckyBlocks = new Map();
        this.LuckyBlockItems = new Map();
        this.nextId = 0;
        this.nextItemId = 0;
        this.nextCoinId = 0;
        this.nextStarId = 0;
        this.next1upStarId = 0;
        this.nextFlowerId = 0;
        this.coinamt;
        this.coinz = 0;
        this.LuckyBlockGroup = this.scene.physics.add.staticGroup();
        this.LuckyBlockItemGroup = this.scene.physics.add.group();
    }

    createLuckyBlock(x, y, item) {
        const id = this.nextId++;
        const newLuckyBlock = this.scene.physics.add.staticGroup().create(x, y, 'block');
        newLuckyBlock.onOverlap = true;
        newLuckyBlock.name = `LuckyBlock_${id}`;
        const LuckyBlockProps = {
            id,
            sprite: newLuckyBlock,
            hit: false
        };

        this.LuckyBlocks.set(id, LuckyBlockProps);
        this.LuckyBlockGroup.add(newLuckyBlock);
        this.addColliders(LuckyBlockProps, item);
        return newLuckyBlock;
    }


    collectCoin(player, coin) {
        // 
        // coin.disableBody(true, true);
        //star.disableBody(true, true);

        //  Add and update the score

        this.scene.score += 200;
        this.scene.scoreNum.setText(`  ${this.scene.score}`);
        this.coinz++;
        if (this.coinz > 99) {
            this.lives++;
        }
    }
    
    collectItem(player, item) {
        if (!item || !item.itemProps || !item.itemProps.canCollect) {
            console.log("Item cannot be collected:", item);
            return;
        }

        console.log("Collecting item: ", item.name);
        console.log(item.texture.key);
        switch(item.texture.key) {
            case 'coin':
                console.log('coin');
                item.disableBody(true, true);
                item.y += 500;
                this.scene.collectCoin(item);
                break;
            case 'star':
                console.log('star');
                item.disableBody(true, true);
                item.y += 500;
                this.scene.collectStar(item);
                break;
        }

        // Remove the item from the LuckyBlockItems map
        if (this.LuckyBlockItems && this.LuckyBlockItems.delete) {
            this.LuckyBlockItems.delete(item.itemProps.id);
        } else {
            console.error("LuckyBlockItems is not properly initialized");
        }
    }


    addItem(x, y, item) {
        // Add item to lucky block
        let newLuckyBlockItem;
        let id;
        let itemid;
        const itemType = item;
        switch(item) {
            case 'coin':
                itemid = this.nextCoinId++;
                id = this.nextItemId++;
                newLuckyBlockItem = this.scene.physics.add.sprite(x, y, item).setScale(1.25).anims.play('cspin', true).setOffset(0, 2);
                break;
            case 'star':
                itemid = this.nextStarId++;
                id = this.nextItemId++;
                newLuckyBlockItem = this.scene.physics.add.sprite(x, y, item);
                break;
        }
        const itemProps = {
            id,
            itemType,
            canCollect: false
        };
        newLuckyBlockItem.itemProps = itemProps; // Attach itemProps to the sprite
        this.LuckyBlockItems.set(id, newLuckyBlockItem);
        this.LuckyBlockItemGroup.add(newLuckyBlockItem);
        newLuckyBlockItem.name = `${item}_${itemid}`;
        return newLuckyBlockItem;
    }
    
    hitLuckyBlock(lbname) {
        let lb = this.getLuckyBlock(lbname);
        let item = this.getLuckyBlockItem(lbname);
        if(lb && !lb.hit){
            console.log("Lucky Block Item Group: ", this.LuckyBlockItemGroup.children.entries[0].name);
            item.body.setVelocityY(-200);
            item.body.setAllowGravity(true);
            item.itemProps.canCollect = true; // Set canCollect to true
            console.log(item.itemProps);
            console.log(lbname);
            this.scene.player.setVelocityY(0);
            lb.hit = true;
        }
    }

    addColliders(LBProps, item) {
        console.log(LBProps.sprite);
        console.log(this.LuckyBlockItemGroup.children.entries);
        this.scene.physics.add.collider(this.LuckyBlockItemGroup.children.entries, this.scene.platforms);
        this.scene.physics.add.collider(LBProps.sprite, this.LuckyBlockItemGroup.children.entries);
        this.scene.physics.add.collider(LBProps.sprite, this.scene.player, null, null, this);
        this.scene.physics.add.collider(LBProps.sprite, this.scene.lbplr, null, null, this);
        this.scene.physics.add.overlap(
            this.LuckyBlockItemGroup,
            this.scene.player,
            this.collectItem.bind(this),  // Bind the method to ensure correct 'this' context
            null,
            this
        );
    }


    getLuckyBlock(id) {
        console.log(this.LuckyBlocks.get(parseInt(id)));
        return this.LuckyBlocks.get(parseInt(id));
    }
    getLuckyBlockProps(id){
        console.log(this.LuckyBlocks.get(parseInt(id)).LBProps);
        return this.LuckyBlocks.get(parseInt(id).LBProps);
 
    }

    getAllLuckyBlocks() {
        return Array.from(this.LuckyBlocks.values());
    }
    getLuckyBlockItem(id) {
        console.log(this.LuckyBlockItems.get(parseInt(id)));
        return this.LuckyBlockItems.get(parseInt(id));
    }

    getAllLuckyBlockItems() {
        return Array.from(this.LuckyBlockItems.values());
    }
}