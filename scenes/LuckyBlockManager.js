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
        this.LuckyBlockGroup = this.scene.physics.add.staticGroup();
        this.LuckyBlockItemGroup = this.scene.physics.add.group();
    }

    createLuckyBlock(x, y) {
        const id = this.nextId++;
        const newLuckyBlock = this.scene.physics.add.staticGroup().create(x, y, 'block');
        newLuckyBlock.onOverlap = true;
        newLuckyBlock.name = `LuckyBlock_${id}`;
        const LuckyBlockProps = {
            id,
            sprite: newLuckyBlock
        };

        this.LuckyBlocks.set(id, LuckyBlockProps);
        this.LuckyBlockGroup.add(newLuckyBlock);
        return newLuckyBlock;
    }

    addItem(x, y, item) {
        // Add item to lucky block
        let newLuckyBlockItem;
        let id;
        let itemid;
        console.log(item);
        switch(item) {
            case 'coin':
                console.log('coin');
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
        this.LuckyBlockItems.set(id, LuckyBlockProps);
        this.LuckyBlockItemGroup.add(newLuckyBlockItem);
        newLuckyBlockItem.name = `${item}_${itemid}`;
        console.log(newLuckyBlockItem);
        return newLuckyBlockItem;
    }


    getLuckyBlock(id) {
        return this.LuckyBlocks.get(id);
    }

    getAllLuckyBlocks() {
        return Array.from(this.LuckyBlocks.values());
    }
    getLuckyBlockItem(id) {
        return this.LuckyBlockItems.get(id);
    }

    getAllLuckyBlockItems() {
        return Array.from(this.LuckyBlockItems.values());
    }
}