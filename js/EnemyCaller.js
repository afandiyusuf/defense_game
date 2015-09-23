var EnemyCaller = function(game,_ArrEnemys,_ObjEnemy) {
	this.ArrEnemys = _ArrEnemys;
	this.ObjEnemy = _ObjEnemy;
	currentGameTime = 0;
}

EnemyCaller.prototype.update = function(_gameTime)
{
	for(var i=0;i<this.ArrEnemys.length;i++)
	{
		
		if(_gameTime > this.ArrEnemys[i]["timeSpawn"] && !this.ObjEnemy[i].isCalled)
		{
			this.ObjEnemy[i].call();
		}
	}
}
