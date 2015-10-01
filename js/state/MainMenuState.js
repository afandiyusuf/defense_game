var mainMenuState = {
	preload : function () {
		game.load.spritesheet('button', 'assets/button/button_sprite_sheet.png', 193, 71);
    	game.load.image('background', 'assets/sprites/background.jpg');
    	game.load.bitmapFont('fonts', 'font/fonts.png', 'font/fonts.xml');
	},
	create :function(){
		transitionPlugin = game.plugins.add(Phaser.Plugin.StateTransition);

		//define new properties to be tweened, duration, even ease
		transitionPlugin.settings({

		    //how long the animation should take
		    duration: 1000,

		    //ease property
		    ease: Phaser.Easing.Exponential.InOut, /* default ease */

		    //what property should be tweened
		    properties: {
		        alpha: 0
		    }
		});

		game.add.sprite(0, 0, 'background');
		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		button = game.add.button(game.world.centerX - 95, 400, 'button', actionOnClick2, this, 2, 1, 0);
		//var style = { font: "32px fonts", fill: "#ff0044", wordWrap: true, wordWrapWidth: game.width - 100, align: "center" };

		var text = game.add.bitmapText(0, 0,"fonts", "THIS IS TITLE",64);
		text.x = game.world.centerX;
		text.y = 300;
		text.anchor.set(0.5);
	},

	update : function(){
		
	}
}

function actionOnClick2 () {
	//console.log("goto ingame");
	//and later on
	transitionPlugin.to("ingameState");

    //game.state.start("ingameState",true,false);
}