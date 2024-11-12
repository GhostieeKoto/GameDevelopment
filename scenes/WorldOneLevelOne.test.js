import Phaser from 'phaser';
import WorldOneLevelOne from '../scenes/WorldOneLevelOne';

describe('WorldOneLevelOne', () => {
    let scene;

    beforeEach(() => {
        scene = new WorldOneLevelOne();
    });
});
it('should play bhit animation when height is 1', () => {
    const scene = new WorldOneLevelOne();
    scene.height = 1;
    
    const mockBrick = {
        name: 'TestBrick',
        anims: {
            play: jest.fn()
        }
    };
    
    scene.breakBrick(mockBrick);
    
    expect(mockBrick.anims.play).toHaveBeenCalledWith('bhit', true);
});