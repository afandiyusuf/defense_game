var ingameState = {
	preload : function () {

		game.load.image('player', 'assets/sprites/white.png');
		game.load.image('bullet', 'assets/sprites/black.png');
		game.load.image('enemy', 'assets/sprites/merah muda.png');
		game.load.image('hud', 'assets/sprites/white.png');
	},

	create : function () {
		this.scale.scaleMode = Phaser.ScaleManager.NO_SCALE
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.stage.backgroundColor = '#87CEEB';
		enemys = [];
		gameTime = 0;
		lvlManager = new LevelManager();
		lvlManager.enemyCalls = 0;

		for(var i=0;i<lvlManager.arrEnemy[lvlNow].length;i++)
		{
			
			var e = new Enemy(i,game,lvlManager.arrEnemy[lvlNow][i]);
			e.respaswnTime = i;
			enemys.push(e);
			lvlManager.enemyCalls++;
		}

		
		

		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(50, 'bullet');

		bullets.setAll('checkWorldBounds', true);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('width',10);
		bullets.setAll('height',10);
		


		player = new Player(game,bullets);
		hud = new Hud(game,player);
		enemyManager = new EnemyCaller(game,lvlManager.arrEnemy[lvlNow],enemys);
		

	},

	update : function () {

		gameTime += game.time.physicsElapsed;
		
		player.update();
		hud.update();
		enemyManager.update(gameTime);

		if(enemys.length !=0){
		
			for(var i=0;i<enemys.length;i++)
			{
				enemys[i].update();
				game.physics.arcade.overlap(player.bullets, enemys[i].walker, bulletHitEnemy, null, this);
			}
		}
	}

}


function bulletHitEnemy (walker, bullet) {

		bullet.kill();

		if(enemys.length == 0)
			return;

		var destroyed = enemys[walker.index].takeDamage();

		if(destroyed)
		{
			lvlManager.enemyCalls--;
			
			//game win
			if(lvlManager.enemyCalls <=0)
			{
				console.log("game win");
				game.state.start('mainMenuState',true,false);
			}
		}
	

}


