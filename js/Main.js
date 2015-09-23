var IDE_HOOK = false;
        
var game = new Phaser.Game(1000, 600, Phaser.CANVAS, 'phaser-example');

var player;
var bullets;
var enemys = [];

var fireRate = 300;
var nextFire = 0;
var currentGameTime = 0;
var lvlManager;
var lvlNow = 0;
var enemyManager;
var gameTime = 0;


game.state.add('ingameState',ingameState);
game.state.add('mainMenuState',mainMenuState);
game.state.start('mainMenuState',true,false);