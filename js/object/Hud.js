var Hud = function(game,player){
	
	this.healTeks = game.add.text(10, 10, "100/100");

	this.scoreText = game.add.text(10, 50, "Score is " + playerScore);

	this.player = player;
}

Hud.prototype.update = function(){
	this.healTeks.text = ""+this.player.currentHealth+" / "+this.player.maxHealth;
	this.scoreText.text = "Score is " + playerScore;
}