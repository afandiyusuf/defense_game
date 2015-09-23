var BossAi = function(_sprite,_game)
{
	this.sprite = _sprite;
	this.game = _game;
	this.speedtop = -200;
	this.speedBot = 200;
	
	this.gotoTop = true;


}
BossAi.prototype.update = function()
{

	if(this.gotoTop)
		{
			if(this.sprite.y > 100){
				this.sprite.body.velocity.y = this.speedtop;
			}else{
				this.gotoTop = false;
			}
			
		}else if(!this.gotoTop)
		{

			if(this.sprite.y <  this.game.height-150){
				this.sprite.body.velocity.y = this.speedBot;
			}else{
				this.gotoTop = true;
			}
		}
}