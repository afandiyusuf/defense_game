var Player = function(game,bullets){
	this.game = game;
	this.bullets = bullets;
	this.base = game.add.sprite(150, 200, 'player');
	this.base.width = 80;
	this.base.height = 80;
	this.base.anchor.set(0.5);
	this.game.physics.enable(this.base, Phaser.Physics.ARCADE);
	this.base.body.allowRotation = false;
	this.currentHealth = 100;
	this.maxHealth = 100;
}

Player.prototype.update = function(){
	this.base.rotation = this.game.physics.arcade.angleToPointer(this.base);
	this.fire();
	
}

Player.prototype.fire = function() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = this.bullets.getFirstDead();

        bullet.reset(this.base.x, this.base.y);

        game.physics.arcade.moveToPointer(bullet, 1000);
    }

}

Player.prototype.takeDamage = function(_damage){
	this.currentHealth -= _damage;

	if(this.currentHealth <= 0)
	{
		console.log("health 0");
		game.state.start('mainMenuState');
		
	}
}