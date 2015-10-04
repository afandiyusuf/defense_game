var mobilePlay = {
	preload : function () {
		game.load.spritesheet('button', 'assets/button/button_sprite_sheet.png', 193, 71);
    	game.load.image('background', 'assets/sprites/background.jpg');
    	game.load.image('phone', 'assets/button/phone.png');
    	game.load.bitmapFont('fonts', 'font/fonts.png', 'font/fonts.xml');
	},
	create :function(){		
		game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

		var button = game.add.button(10, 10, 'button', mobilestart, this, 2, 1, 0);

		var textbutton = game.add.bitmapText(60, 20,"fonts", "play",25);
	
	


	},

	update : function(){
		
	}
}

function mobilestart () {
	//console.log("goto ingame");
	//and later on
	if (game.scale.isFullScreen) {
		game.scale.stopFullScreen();
	}
	else {
		game.scale.startFullScreen(false);
	}	
	game.state.start("mainMenuState");

    //game.state.start("ingameState",true,false);
}