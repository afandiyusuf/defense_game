var Hud = function(game,player){
	
	this.healTeks = game.add.text(10, 10, "100/100");
	this.player = player;
}

Hud.prototype.update = function(){
	this.healTeks.text = ""+this.player.currentHealth+" / "+this.player.maxHealth;
}