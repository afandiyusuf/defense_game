
var Enemy = function(_index,game,enemyIndex){
	this.isCalled = false;
	this.state = "moving";
	this.game = game;
	this.timer = new Phaser.Timer(game);
	
	if(enemyIndex["type"] == 1){
		
		if(enemyIndex["pos"] == 1)
			this.initialPositionY = game.height-30;
		if(enemyIndex["pos"] == 2)
			this.initialPositionY = game.height-75;
		if(enemyIndex["pos"] == 3)
			this.initialPositionY = game.height-120;

		this.initialPositionX =game.width+50;
		

		this.walker = this.game.add.sprite(this.initialPositionX,this.initialPositionY,'enemy');

		this.walker.width = 30;
		this.walker.height = 30;
		this.maxHealth = 2;
		this.attackRange = 100;
		
	}else {
		
		this.initialPositionX =game.width+50;
		this.initialPositionY = 100;
		
		this.walker = this.game.add.sprite(this.initialPositionX,this.initialPositionY,'enemy');

		this.walker.width = 30;
		this.walker.height = 30;
		this.maxHealth = 5;
		this.attackRange = 300;
	}
	
	this.walker.index = _index;
	this.walker.anchor.x = 0.5;

	this.walker.hud = this.game.add.sprite(this.initialPositionX,this.initialPositionY-10,'hud');
	this.walker.hud.initWidth = this.walker.width;
	this.walker.hud.width = this.walker.hud.initWidth;
	this.walker.hud.height = 10;
	this.walker.hud.anchor.x = 0.5;
	this.walker.hud.x = this.initialPositionX;
	this.walker.hud.alpha = 0;
	this.walker.hud.appearTime = 3;

	this.speed = -100;
	this.game.physics.enable(this.walker,Phaser.Physics.ARCADE);

	
	this.currentHealth = this.maxHealth;
	this.bullets = bullets;
	this.fireRate = 1000;
	this.alive = false;
	this.walker.body.velocity.x = this.speed;
	
	this.walker.hud.kill();
	this.walker.kill();

	this.isTimed = false;

	this.currentTik = 0;
	
	this.attackSpeed = 1;
	this.currentAttackTimer = 0;
	

	this.damage = 10;
	
	this.textstyle = { font: "12px Arial", fill: "#ff0044", wordWrap: true,align: "center" };
}

Enemy.prototype.update = function(){
	this.currentTik += this.game.time.physicsElapsed;

	if(this.state == "attack")
	{
		this.currentAttackTimer += this.game.time.physicsElapsed;
		
		//Attack
		if(this.currentAttackTimer > this.attackSpeed)
		{
			console.log("enemy attacked");
			this.currentAttackTimer = 0;
			player.takeDamage(this.damage);
			this.showDamage(10,player.base);
		}
	}
	
	if(this.currentTik>this.walker.hud.appearTime)
	{
		this.currentTik = 0;
		this.walker.hud.alpha = 0;
	}

	
	

	this.walker.hud.x = this.walker.x;
	this.walker.hud.y = this.walker.y-10;

	//Simple AI

	//enemy nyampe benteng
	if(this.walker.x < this.attackRange)
	{
		this.state = "attack";
		this.walker.body.velocity.x = 0;
	}else{
		//enemy baru nongol
		this.walker.body.velocity.x = this.speed;
	}
}

Enemy.prototype.call= function(){
	this.walker.reset(this.initialPositionX,this.initialPositionY);
	this.walker.hud.reset();
	
	this.currentHealth = this.maxHealth;
	this.walker.body.velocity.x = this.speed;
	this.alive = true;
	this.isCalled = true;
}

Enemy.prototype.takeDamage = function(){

	this.currentHealth--;
	this.walker.hud.alpha = 1;
	this.game.add.tween(this.walker.hud).to( { width: (this.currentHealth/this.maxHealth)*this.walker.hud.initWidth }, 100, Phaser.Easing.linear, true);
	this.currentTik = 0;
	this.showDamage(11,this.walker);
	if(this.currentHealth == 0)
	{
		this.alive = false;
		this.walker.hud.kill();
		this.walker.kill();
		return true;
	}

	return false;
}

Enemy.prototype.showDamage = function(damage,parent){
	this.textDamage = game.add.text(parent.x, parent.y+parent.height/2, damage, this.textstyle);
	this.game.add.tween(this.textDamage).to( { y: this.textDamage.y-100,alpha:0}, 1000, Phaser.Easing.linear, true);
}


