/**
 * Manages initialization.
 */

function setup() {
	/**
	 * Set up canvas and context global variables.
	 */
	canvas = document[GET_ELEMENT_BY_ID]("canvas");
	canvas[WIDTH] = canvasWidth * tileSize;
	canvas[HEIGHT] = canvasHeight * tileSize;
	context = canvas.getContext("2d");
	/**
	 * Set up functions that run once per tile. Refer to map.js/mapLoop.
	 * @param  {Object} tile  Tile data.
	 * @param  {Object} tower Tower data. 0 if there is no tower.
	 */
	tileFunction.push(function(tile, tower) {
		context.drawImage(tile.image, centerSymmetrical(tile.x, tileSize), centerSymmetrical(tile.y, tileSize));
	});
	afterTileFunction.push(function(tile, tower) {
		if (tower !== 0) {
			context.drawImage(tower.image, centerSymmetrical(tower.x, tower.width), centerTower(tower.y, tower.height));
			if (tower.weapon.name) {
				aim(tower);
			}
		}
	})
	/**
	 * Set up functions that run once per frame. Refer to map.js/mapLoop.
	 */
	perFrameFunction.push(function() {
		setScore();
		cursorColor();
		drawCursor();
		drawEnemies();
		drawBullets();
		moveEnemies();
		explode();
		timer++;
		timeLasted++;
		if (waves[1]) {
			timeBeforeNextWave--;
		} else if (!waves[1]) {
			document[GET_ELEMENT_BY_ID]("nextWave").setAttribute("disabled", true);
			timeBeforeNextWave = 0;
		}
		if (!waves[0].length && !waves[1] && !onScreen.length) {
			gameWon();
		} else if (waves[0].length && timer === (60 * 2)) {
			timer = 0;
			for (var i = 0; i < round(wave / 2); i++) {
				spawnEnemy();
			}
		} else if ((timer === 600 || advanceWave) && waves[1]) {
			advanceWave = false;
			if (!waves[1]) {
				document[GET_ELEMENT_BY_ID]("nextWave").setAttribute("disabled", true);
				timeBeforeNextWave = 0;
			} else {
				timeBeforeNextWave = ((waveLength * (60 * 2)) + 600);
			}
			wave++;
			waves.splice(0, 1);
			waveLength = waves[0].length;
			timer = 0;
		}
	});

	/**
	 * Initialize turrets, enemies, waves, and tiles.
	 */
	// designWeapon(name, amount, speed, damage, delay, range, life, radius, rgb)
	designWeapon("cannon", 1, 15, 1, 10, 6, 50, 3, rgb(random(200, 255), random(0, 100), random(0, 100)), function(direction) {
		return direction;
	});
	designWeapon("spread", 5, 20, 1, 50, 4, 25, 3, rgb(random(0, 100), random(0, 100), random(100, 255)), function(direction) {
		return randomFloat(direction - (direction / 2), direction + (direction / 2));
	});
	designWeapon("gatling", 1, 15, 1, 1, 4, 25, 3, rgb(random(0, 100), random(100, 255), random(0, 100)), function(direction) {
		return randomFloat(direction - (direction / 2), direction + (direction / 2));
	});
	designWeapon("explode", 25, 120, 5, 50, 5.5, 35, 3, rgb(random(0, 100), random(100, 255), random(100, 255)), function(direction) {
		return randomFloat(-2, 2) / 60;
	});
	// defineTower(name, weapon, type, cost, health, dimensions, colors)
	towers[PUSH](defineTower("Base", "none", "special", 1000000, 1000, [
		[10, 15],
		[20, 30],
		[10, 15]
	], [rgb(225, 0, 0), rgb(darken(225), 0, 0)]));
	towers[PUSH](defineTower("Cannon", "cannon", "basic", 50, 10, [
		[10, 15],
		[10, 15],
		[5, 10]
	], [rgb(200, 0, 0), rgb(darken(200), 0, 0)]));
	towers[PUSH](defineTower("Shotgun", "spread", "basic", 250, 10, [
		[15, 20],
		[15, 20],
		[10, 15]
	], [rgb(125, 0, 0), rgb(darken(125), darken(125), 0)]));
	towers[PUSH](defineTower("Explode", "explode", "basic", 500, 10, [
		[20, 25],
		[20, 25],
		[15, 20]
	], [rgb(125, 0, 0), rgb(0, darken(125), darken(125))]));
	towers[PUSH](defineTower("Gatling", "gatling", "basic", 1000, 10, [
		[25, 30],
		[25, 30],
		[20, 25]
	], [rgb(125, 0, 0), rgb(0, 0, 125)]));

	// makeTile(name, type, priority, speed, dataArray, tileSize)
	tiles.push(makeTile("grass", PATH, 7, 1, pixelData([
		[32 * 32, 175, 230, 1.3, 1, 2],
		[50, 200, 245, 1, 1.3, 1.5],
		[100, 125, 175, 2, 1, 2]
	])));
	tiles.push(makeTile("darkGrass", PATH, 7, 1, pixelData([
		[32 * 32, 150, 205, 1.3, 1, 2],
		[50, 175, 220, 1, 1.3, 1.5],
		[100, 100, 150, 2, 1, 2]
	])));
	tiles.push(makeTile("road", "fast", 4, 0.5, pixelData([
		[32 * 32, 0, 0, 1, 1, 1],
		[600, 0, 50, 1, 1, 1]
	])));
	tiles.push(makeTile("water", "slow", 3, 1.5, pixelData([
		[32 * 32, 100, 200, 1.5, 1.5, 1],
		[600, 100, 200, 1.5, 1.5, 1]
	])));
	defineEnemies(13);
	makeWaves(13);
	waveLength = waves[0].length;
	timeBeforeNextWave = ((waveLength * (60 * 2)) + 600);
}

WINDOW.addEventListener("DOMContentLoaded", function() {
	setup();
	fillBuildMenu();
	makeMap(canvasWidth, canvasHeight);
	addMoney(500);
	addEvent(canvas, "mousemove", moveHandler);
	addEvent(canvas, "mousedown", clickHandler);
	addEvent(canvas, "contextmenu", doNothing);
	addEvent(document.getElementById("startGame"), "click", startGame)
	addEvent(document.getElementById("nextWave"), "click", nextWave)
	addEvent(document.getElementById("nextWave"), "click", nextWave)
	hideLoading();
	keyListener();
	// spriteTest();
});

function gameOver() {
	selectedStructure = null;
	money = 0;
	checkAffordable();
	money = 0;
	document.getElementById("gameOver").querySelector(".timeLasted").innerText = round(timeLasted / 60);
	document.getElementById("gameOver").querySelector(".tryAgain").onclick = function() {
		window.location.reload();
	}
	document.getElementById("gameOver").classList.add("show");
}

function gameWon() {
	selectedStructure = null;
	money = 0;
	checkAffordable();
	money = 0;
	document.getElementById("gameWon").querySelector(".timeLasted").innerText = round(timeLasted / 60);
	document.getElementById("gameWon").querySelector(".tryAgain").onclick = function() {
		window.location.reload();
	}
	document.getElementById("gameWon").classList.add("show");
}