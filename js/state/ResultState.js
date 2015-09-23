var resultState = {
	preload : function () {
		
		game.load.spritesheet('button', 'assets/button/button_sprite_sheet.png', 193, 71);
    
	},
	create :function(){
		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick, this, 2, 1, 0);
		
		var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: game.width - 100, align: "center" };
		var text = game.add.text(0, 0, "GAME END your score is " + playerScore, style);

		text.x = game.world.centerX;
		text.y = 300;
		text.anchor.set(0.5);
	},

	update : function(){
	
	}
}

function actionOnClick () {
	
    game.state.start("ingameState",true,false);
}