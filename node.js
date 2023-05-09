var score = 0;
		var snakeX = 10;
		var snakeY = 10;
		var gridSize = 20;
		var foodX;
		var foodY;
		var direction = "right";
		var snakeTrail = [];
		var tailLength = 5;

		// Generate random coordinates for the food
		function spawnFood() {
			foodX = Math.floor(Math.random() * (canvas.width/gridSize)) * gridSize;
			foodY = Math.floor(Math.random() * (canvas.height/gridSize)) * gridSize;
		}

		// Game loop function
		function gameLoop() {

			// Move the snake in the current direction
			switch(direction) {
				case "up":
					snakeY -= gridSize;
					break;
				case "down":
					snakeY += gridSize;
					break;
				case "left":
					snakeX -= gridSize;
					break;
				case "right":
					snakeX += gridSize;
					break;
			}

			// Check if the snake has collided with the walls
			if (snakeX < 0 || snakeX >= canvas.width || snakeY < 0 || snakeY >= canvas.height) {
				alert("Game over! Your score was " + score);
				document.location.reload();
			}

			// Check if the snake has collided with itself
			for (var i = 0; i < snakeTrail.length; i++) {
				if (snakeX == snakeTrail[i].x && snakeY == snakeTrail[i].y) {
					alert("Game over! Your score was " + score);
					document.location.reload();
				}
			}

			// Add the current position to the snake trail
			snakeTrail.push({x: snakeX, y: snakeY});

			// Remove the oldest element(s) of the snake trail if it's longer than the tail length
			while (snakeTrail.length > tailLength) {
				snakeTrail.shift();
			}

			// Check if the snake has eaten the food
			if (snakeX == foodX && snakeY == foodY) {
				score++;
				tailLength++;
				spawnFood();
			}

			// Clear the canvas and draw the snake, food, and score
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillStyle = "#ff0000";
			for (var i = 0; i < snakeTrail.length; i++) {
				context.fillRect(snakeTrail[i].x, snakeTrail[i].y, gridSize, gridSize);
			}
			context.fillStyle = "#00ff00";
			context.fillRect(foodX, foodY, gridSize, gridSize);
			context.fillStyle = "#000000";
			context.fillText("Score: " + score, 5, 15);

			// Call the game loop function again after a short delay
			setTimeout(gameLoop, 100);
		}

		// Handle key press events to change the snake's direction
		document.addEventListener("keydown", function(event) {
			switch(event.keyCode) {
				case 37:
					direction = "left";
					break;
				case 38:
					direction = "up";
					break;
				case 39:
					direction = "right";
					break;
				case 40:
					direction = "down";
					break;
			}
		});

		// Start the game loop and spawn the initial food
		spawnFood();
		gameLoop();