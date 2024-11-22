import { WorldOneLevelOne } from './scenes/WorldOneLevelOne.js';
import { MainMenu } from './scenes/MainMenu.js';
import { Preload } from './scenes/Preload.js';
import { NextLevel } from './scenes/NextLevel.js';
import { GameStartCutscene } from './scenes/GameStartCutscene.js';

var gameSettings = {
    playerSpeed: 0.25,
}

var config = {
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x000000,
    scene: [Preload, MainMenu, GameStartCutscene, WorldOneLevelOne, NextLevel],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade:{
            debug: true,
            gravity: { y: 500}
        },
    }
}
var game = new Phaser.Game(config);
let platforms;
let StartGame;
let player;
let cursors;
let playerx;
let playery;
