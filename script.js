document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const cellSize = 20;
  let snakeArray;
  let color;
  let direction = 'right';
  let gameLoop;
  let foodX;
  let foodY;
  let score;

  document.onkeydown = (e) => {
    switch (e.code) {
      case 'ArrowRight': 
        if(direction !== 'left') {
          direction = 'right'; 
        }
        break;
      case 'ArrowLeft':
        if(direction !== 'right') {
          direction = 'left';  
        }
        break;
      case 'ArrowDown': 
        if(direction !== 'up') {
          return direction = 'down';
        }
        break;
      case 'ArrowUp': 
        if(direction !== 'down') {
          return direction = 'up';
        }
        break;
      case 'Space':
        initGame();
        break;
    } 
  }

  // Create an array of the x and y coordinates of our snake 
  const createSnake = () => {
    const length = 4;
    snakeArray = [];
    for(let i = length-1; i >= 0; i--) {
      snakeArray.push({x: i, y: 0});
    }
  }

  // Generate random X and Y coordinate for food
  const createFood = () => {
    foodX = Math.round(Math.random() * (w - cellSize)/cellSize);
    foodY = Math.round(Math.random() * (h - cellSize)/cellSize);
  }

  const generateRandomColor = () => {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
  }

  const paintCell = (x, y, w, h) => {
    ctx.fillStyle = color; 
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x, y, w, h);
  }

  // Check if the snake has collided into its own body
  const checkCollision = (x, y, arr) => {
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].x == x && arr[i].y == y)
        return true;
      }
    return false;
  }

  // Start or reset game
  const initGame = () => {
    createSnake();
    createFood();
    direction = 'right';
    color = generateRandomColor();
    score = 0;
    if(gameLoop) {
      clearInterval(gameLoop);
    }
    // Paint function is looped to simulate movement
    gameLoop = setInterval(paintGame, 80);
  }

  // Draw the game
  const paintGame = () => {
    // Redraw background in every loop to hide trail
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, w, h);

    let snakeX = snakeArray[0].x;
    let snakeY = snakeArray[0].y;
    
    // Determine the direction of movement
    if(direction === 'right') {
      snakeX++;
    }
    else if(direction === 'left') {
      snakeX--;
    }
    else if(direction === 'up') {
      snakeY--;
    }
    else if(direction === 'down') {
      snakeY++;
    }

    // If the snake hits the walls or collides with itself reset the game
    if(snakeX === -1 || snakeY === -1 || snakeX === w/cellSize || snakeY === h/cellSize || checkCollision(snakeX, snakeY, snakeArray)) {
      initGame();
      return;
    }

    // If the snake hits food, increment snakeArray by creating a new head
    if(snakeX === foodX && snakeY === foodY) {
      let tail = {x: snakeX, y: snakeY};
      snakeArray.unshift(tail);
      createFood();
      score++;
    }
    // Otherwise, pop tail of snake array and move it to the "head" of the snake, update x or y coordinate to move snake
    else {
      let tail = snakeArray.pop();
      tail.x = snakeX;
      tail.y = snakeY;
      snakeArray.unshift(tail);
    }

    // Paint snake
    for(let i = 0; i < snakeArray.length; i++) {
      const cell = snakeArray[i];
      paintCell(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    }

    // Paint food
    paintCell(foodX * cellSize, foodY * cellSize, cellSize, cellSize);

    // Paint score
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillText(`Score: ${score}`, 10, 580);

  }

})