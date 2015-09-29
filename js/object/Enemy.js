
var Enemy = function(_index,game,enemyIndex){
	this.isCalled = false;
	this.state = "moving";
	this.game = game;
	this.timer = new Phaser.Timer(game);
	this.attackRange = 250;
	if(enemyIndex["type"] == "1"){
			
		if(enemyIndex["pos"] == 1)
			this.initialPositionY = game.height-210;
		if(enemyIndex["pos"] == 2)
			this.initialPositionY = game.height-170;
		if(enemyIndex["pos"] == 3)
			this.initialPositionY = game.height-130;

		this.initialPositionX =game.width+50;
		
		this.score = 50;

		this.walker = this.game.add.sprite(this.initialPositionX,this.initialPositionY,'enemy');
		
		this.walker.width = 30;
		this.walker.height = 30;
		this.maxHealth = 4;
	
		this.speed = -50;

		this.game.physics.enable(this.walker,Phaser.Physics.ARCADE);
		
	}else if(enemyIndex["type"] == "1b")
	{
		
		this.initialPositionY = game.height-120;
		this.isBos = true;
		this.initialPositionX =game.width+100;

		this.walker = this.game.add.sprite(this.initialPositionX,this.initialPositionY,'enemy');
		

		this.bossAI = new BossAi(this.walker,game);

		this.walker.width = 100;
		this.walker.height = 100;
		this.maxHealth = 50;

		this.attackRange = 100;
		this.speed = -20;
		
		this.score = 300;

		this.game.physics.enable(this.walker,Phaser.Physics.ARCADE);
	}else {
		
		this.initialPositionX =game.width+50;
		this.initialPositionY = 100;
		
		this.walker = this.game.add.sprite(this.initialPositionX,this.initialPositionY,'enemy');
		

		this.walker.width = 30;
		this.walker.height = 30;
		this.maxHealth = 5;
		
		this.speed = -50;
		this.score = 80;
		this.game.physics.enable(this.walker,Phaser.Physics.ARCADE);
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
	this.initScore = this.score;
	
	

	
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
	
	this.textstyle = { font: "20px Arial", fill: "white", wordWrap: true,align: "center" };
}

Enemy.prototype.update = function(){
	
	if(this.state == "dead")
		return;
	game.world.bringToTop(this.walker);
	this.currentTik += this.game.time.physicsElapsed;
	this.score -= this.game.time.physicsElapsed * this.initScore/100;
	
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

	//enemy nyampe benteng
	if(this.walker.x < this.attackRange)
	{
		this.state = "attack";
		this.walker.body.velocity.x = 0;
	}else{
		if(this.isBos){
			
			this.bossAI.update();
		}else{
		//enemy baru nongol
			this.walker.body.velocity.x = this.speed;
		}
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
		game.plugins.screenShake.shake(10);
		this.state = "dead";
		return true;
	}

	game.plugins.screenShake.shake(2);
	return false;
}

Enemy.prototype.showDamage = function(damage,parent){
	this.textDamage = game.add.text(parent.x, parent.y - 20, damage, this.textstyle);
	this.textDamage.strokeThickness = 2;
	this.game.add.tween(this.textDamage).to( { y: this.textDamage.y-100,alpha:0}, 1000, Phaser.Easing.linear, true);
}


