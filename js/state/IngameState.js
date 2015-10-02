var map;
var ingameState = {
	preload : function () {

		//game.load.image('player', 'assets/sprites/white.png');
		game.load.image('player', 'assets/sprites/Char badan.png');
		game.load.image('background', 'assets/sprites/background.jpg');
		game.load.image('bullet', 'assets/sprites/Black Arrow S.png');
		game.load.image('bullet_hit', 'assets/sprites/Black Mancep.png');
		game.load.image('enemy', 'assets/sprites/merah muda.png');
		game.load.image('hud', 'assets/sprites/white.png');
		game.load.image('scoreHud','assets/sprites/Score.png');


		game.load.image('head', 'assets/sprites/Head.png');
		game.load.image('bg_healthBar','assets/sprites/Health Bar.png');
		game.load.image('fill_healthBar','assets/sprites/Darah isi.png');

		game.load.image('bg_manaBar','assets/sprites/Mana Bar.png');
		game.load.image('fill_manaBar','assets/sprites/Mana isi.png');

		game.load.image('Avatar','assets/sprites/Bunder.png');

		game.load.bitmapFont('fonts', 'font/font.png', 'font/font.xml');
   		 game.load.atlasJSONHash('playerAnim', 'assets/animation/PlayerAnimation.png', 'assets/animation/playerAnimation.json');

	},

	create : function () {

		game.plugins.screenShake = game.plugins.add(Phaser.Plugin.ScreenShake);
		
		game.add.sprite(0, 0, 'background');
		

		game.plugins.screenShake.setup({
		 shakeX: true,
		 shakeY: true,
		 sensCoef : 0.01
		});



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

		playerScore = 0;
		
		this.bulletsHit = game.add.group();
		this.bulletsHit.enableBody = false;

		this.bulletsHit.createMultiple(200, 'bullet_hit');
		this.bulletsHit.setAll('width',47);
		this.bulletsHit.setAll('height',7);

		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(50, 'bullet');

		bullets.setAll('checkWorldBounds', true);
		bullets.setAll('outOfBoundsKill', true);
		
		player = new Player(game,bullets,this.bulletsHit);
		hud = new Hud(game,player);
		enemyManager = new EnemyCaller(game,lvlManager.arrEnemy[lvlNow],enemys);
		
		this.longIntro = 3;
		this.longEndGame = 3;
		this.eventTimer = 0;

		this.isStart  = false;
		this.isGameEnd = false;



	

	},

	update : function () {

		if(!this.isStart && this.eventTimer < this.longIntro){
			this.eventTimer += game.time.physicsElapsed;
			return;
		}

		else{
			if(!this.isStart){
				hud.removeIntro();
				this.isStart = true;
			}
		}
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

		if(bullet.state == "dead")
			return;

		bullet.kill();

		if(enemys.length == 0)
			return;

		var destroyed = enemys[walker.index].takeDamage();

		if(destroyed)
		{

			lvlManager.enemyCalls--;
			playerScore += Math.floor(enemys[walker.index].score);
			

			if(lvlManager.enemyCalls <=0)
			{
				this.isGameEnd = true;
				console.log("game win");
				transitionPlugin.to("resultState");
				//game.state.start('resultState',true,false);
			}
		}
	

}


