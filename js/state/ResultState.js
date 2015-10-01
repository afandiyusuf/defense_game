var resultState = {
	preload : function () {
		game.load.image('background', 'assets/sprites/background.jpg');
		game.load.spritesheet('button', 'assets/button/button_sprite_sheet.png', 193, 71);
		game.load.bitmapFont('fonts', 'font/font.png', 'font/font.xml');
    
	},
	create :function(){
		game.add.sprite(0, 0, 'background');
		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
		
		var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: game.width - 100, align: "center" };

		var text = game.add.bitmapText(0, 0,"fonts", "GAME END your score is " + playerScore , 32);

		text.x = game.world.centerX;
		text.y = 300;
		text.anchor.set(0.5);
	},

	update : function(){
	
	}
}

function actionOnClick () {
	transitionPlugin.to("ingameState");
}