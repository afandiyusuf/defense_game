var Hud = function(game,player){
	this.margin = 10;
	
	
	//scoreHud.anchor.set(1,1);
	//graphic ui
	var scoreHud = game.add.sprite(0,0,'scoreHud');
	scoreHud.width = 160;
	scoreHud.height = 48;

	scoreHud.x = game.width - (scoreHud.width+this.margin) -10;
	scoreHud.y = this.margin + 10;

	

	this.scoreText = game.add.text(10, 60, playerScore);
	this.scoreText.x = game.width - 110;
	this.scoreText.y = 28;
	this.scoreText.style.fill = "white";
	this.scoreText.strokeThickness = 2;
	this.player = player;

	//create hud health
	this.bgHealth = game.add.sprite(50,20,'bg_healthBar');
	this.bgHealth.width = 200;
	this.bgHealth.height = 28;

	this.fillHealth = this.bgHealth = game.add.sprite(50,20,'fill_healthBar');
	this.fillHealth.width = 200;
	this.fillHealth.height = 28;

	this.bgMana = game.add.sprite(50,49,'bg_manaBar');
	this.bgMana.width = 182;
	this.bgMana.height = 28;

	this.fillMana = game.add.sprite(50,49,'fill_manaBar');
	this.fillMana.width = 182;
	this.fillMana.height = 28;


	this.Avatar = game.add.sprite(20,15,'Avatar');
	this.Avatar.width = 62;
	this.Avatar.height = 63;


	this.baseWidthHealth = this.fillHealth.width;
	this.expethWidthHealth = 0;
	this.introText = game.add.text(game.width/2, 10, "LEVEL "+lvlNow);

	this.head = game.add.sprite(20,2,'head');
	this.head.width = 50;
	this.head.height = 67;
}

Hud.prototype.update = function(){
	
	this.expethWidthHealth =this.baseWidthHealth * (this.player.currentHealth/this.player.maxHealth);

	if(this.fillHealth.width > this.expethWidthHealth)
	{
		this.fillHealth.width -= 5;
	} 
	this.scoreText.text = playerScore;
}

Hud.prototype.removeIntro = function(){
	game.world.remove(this.introText);
}