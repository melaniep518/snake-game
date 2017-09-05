document.addEventListener('DOMContentLoaded', function() {
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

  // Start and reset game
  function initGame() {
    createSnake();
    createFood();
    direction = 'right';
    color = randomizeColors()
    if(gameLoop) {
      clearInterval(gameLoop)
    }
    gameLoop = setInterval(paintSnake, 200)
  }

  initGame()

  // Create an array of the x and y coordinates of our snake 
  function createSnake() {
    const length = 4;
    snakeArray = [];
    for(let i = 0; i < length; i++) {
      snakeArray.push({x: i, y: 0});
    }
  }

  // Draw the snake
  function paintSnake() {
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
    if(snakeX === -1 || snakeY === -1 || snakeX === w/cellSize || snakeY === h/cellSize) {
      initGame();
      return;
    }

    if(snakeX === foodX && snakeY === foodY) {
      let tail = {x: snakeX, y: snakeY}
      snakeArray.unshift(tail)
      createFood()
    }
    else {
      // Pop tail of snake array and move it to the "head" of the snake, update x or y coordinate to generate movement
      let tail = snakeArray.pop();
      tail.x = snakeX;
      tail.y = snakeY;
      snakeArray.unshift(tail)
    }

    for(let i = 0; i < snakeArray.length; i++) {
      const cell = snakeArray[i];
      paintCell(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    }

    // Paint food
    paintCell(foodX * cellSize, foodY * cellSize, cellSize, cellSize);
  }

  document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 39: 
        if(direction !== 'left') {
          direction = 'right'; 
        }
        break;
      case 37:
        if(direction !== 'right') {
          direction = 'left';  
        }
        break;
      case 40: 
        if(direction !== 'up') {
          return direction = 'down';
        }
        break;
      case 38: 
        if(direction !== 'down') {
          return direction = 'up';
        }
        break;
    } 
  }

  // Generate random X and Y coordinate for food
  function createFood() {
    foodX = Math.round(Math.random() * (w - cellSize)/cellSize);
    foodY = Math.round(Math.random() * (h - cellSize)/cellSize);
  }

  function paintCell(x, y, w, h) {
    ctx.fillStyle = color; 
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x, y, w, h);
  }

  function randomizeColors() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`
  }

})