var Player = function(game,bullets,bulletsHit){
	this.game = game;
	this.bullets = bullets;
	this.hitBullet = bulletsHit;
	this.baseSprite = game.add.sprite(60, 110, 'player');

	this.base = game.add.sprite(83, 153, 'playerAnim');

	
	//this.base.width = 120;
	//this.base.height = 80;
	this.base.anchor.set(0.5);
	this.game.physics.enable(this.base, Phaser.Physics.ARCADE);
	this.base.body.allowRotation = false;
	this.currentHealth = 100;
	this.maxHealth = 100;
	this.fireRate = 300;
	this.nextFire = 0;
	this.currentTimer = 0;


	this.base.animations.add('attack', [
        'tanggan (1).png',
        'tanggan (2).png',
        'tanggan (3).png',
        'tanggan (4).png',
        'tanggan (5).png',
        'tanggan (6).png',
    ], 2, true, false);

    this.base.animations.play('attack',10,true);


}

Player.prototype.update = function(){
	this.base.rotation = this.game.physics.arcade.angleToPointer(this.base);
	this.fire();
	

	this.currentTimer += game.time.physicsElapsed;
	
	for(var i=0;i<bullets.children.length;i++)
	{
		if(bullets.children[i].y > bullets.children[i].maxY && bullets.children[i].state == "meluncur")
		{
			bullets.children[i].body.velocity.x = 0;
			bullets.children[i].body.velocity.y = 0;
		
			var bulletHit = this.hitBullet.getFirstDead();
			bulletHit.reset(bullets.children[i].x, bullets.children[i].y);
			bulletHit.dieTimer = this.currentTimer+1;
			bulletHit.state = "called";
			
			bulletHit.rotation =  bullets.children[i].rotation;
			bullets.children[i].kill();
		}
	}

	for(i =0;i<this.hitBullet.children.length;i++)
	{
		if(this.hitBullet.children[i].state == "called"){
			if(this.currentTimer>this.hitBullet.children[i].dieTimer)
			{
				this.hitBullet.children[i].kill();
				this.hitBullet.children[i].state = "called";
			}
		}
	}

	
}

Player.prototype.fire = function() {


	
    if (game.time.now > this.nextFire && bullets.countDead() > 0)
    {
        this.nextFire = game.time.now + this.fireRate;

        var bullet = this.bullets.getFirstDead();

        if(game.input.mousePointer.y < minBaseFloor)
        {
        	bullet.maxY = minBaseFloor;	
        }else{
        	bullet.maxY = game.input.mousePointer.y;
        }

        bullet.state = "meluncur";
        bullet.reset(this.base.x, this.base.y);

        game.physics.arcade.moveToPointer(bullet, 1000);
        bullet.rotation = this.game.physics.arcade.angleToPointer(bullet);
    }

}


Player.prototype.takeDamage = function(_damage){
	this.currentHealth -= _damage;

	if(this.currentHealth <= 0)
	{
		transitionPlugin.to("resultState");
		
	}
}