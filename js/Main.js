var IDE_HOOK = false;
        
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example');

var player;
var bullets;
var enemys = [];
var minBaseFloor = 373;
var maxBaseFloor = 550;

var nextFire = 0;
var currentGameTime = 0;
var lvlManager;
var lvlNow = 0;
var enemyManager;
var gameTime = 0;
var playerScore = 0;

var transitionPlugin;

game.state.add('ingameState',ingameState);
game.state.add('mainMenuState',mainMenuState);
game.state.add('resultState',resultState);
game.state.start('mainMenuState',true,false);