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

  // Keyboard events
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

  /**  
    *  Creates an array of the x and y coordinates of each cell in the snake
    *
    *  Based on these coordinates the snake will be positioned at the top
    *  left of the canvas
    *  
    *  paintCell function will use these coordinates to draw the snake on the canvas
    */
  const createSnake = () => {
    const length = 4;
    snakeArray = [];
    for(let i = length-1; i >= 0; i--) {
      snakeArray.push({x: i, y: 0});
    }
  }

  /**
    *  Generate random x and y coordinates for the food 
    *
    *  paintCell will use these coordinates to draw food on the canvas
    */
  const createFood = () => {
    foodX = Math.round(Math.random() * (w - cellSize)/cellSize);
    foodY = Math.round(Math.random() * (h - cellSize)/cellSize);
  }

 /**
   *  Generates a random color for each new snake game
   */
  const generateRandomColor = () => {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
  }

 /**
   *  Uses the x and y coordinates provided by createSnake or createFood
   *  to draw a cell on the canvas
   */
  const paintCell = (x, y, w, h) => {
    ctx.fillStyle = color; 
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x, y, w, h);
  }

/**  
  *  Checks if the provided x and y coordinates are found in a given array
  *  
  *  Used in the paintGame function to check if the head of the snake has
  *  overlapped with any of the cells in the body of the snake
  */
  const checkCollision = (x, y, arr) => {
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].x == x && arr[i].y == y)
        return true;
      }
    return false;
  }

/**
  *  Starts the game or resets if a current game is in progress
  */
  const initGame = () => {
    createSnake();
    createFood();
    direction = 'right';
    color = generateRandomColor();
    score = 0;
    if(gameLoop) {
      clearInterval(gameLoop);
    }
  /**
    *  paintGame is looped to simulate movement
    */   
    gameLoop = setInterval(paintGame, 80);
  }

 /**
   *  Draws game on canvas
   */  
  const paintGame = () => {
  /**
    *  To "move" the snake, the head of the snake is being repositioned and 
    *  redrawn every time paintGame is looped over
    *  
    *  Redraw the background to cover up the previous thereby erasing the trail
    *  left behind as the snake moves
    */
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, w, h);
    
  /**
    *  To move the snake:  
    *  
    *  Each time we loop paintGame create a new head by removing
    *  the tail of the snake
    *  
    *  Give the tail a new x or y coordinate depending on the direction of movement
    *  
    *  Then make it the head of the snake by adding it back to the array as the first index
    *  
    *  Every index in the array will be looped from the last index the first index, this is 
    *  how movement is simulated
    */
    let snakeX = snakeArray[0].x;
    let snakeY = snakeArray[0].y;
    
  /**
    *  Determine the direction of movement
    *  If the movement is right or left move the head positively or negatively 
    *  along the x axis
    *  
    *  If the movement is up or down move the head negatively or positively 
    *  along the y axis
    */
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

  /**
    * If the snake hits the walls or collides with its own body, restart the game
    */
    if(snakeX === -1 || snakeY === -1 || snakeX === w/cellSize || snakeY === h/cellSize || checkCollision(snakeX, snakeY, snakeArray)) {
      initGame();
      return;
    }
    
  /**  
    *  If the snake hits food, create a new head and add it to the snake array
    *  Create new food, increase the score
    */
    if(snakeX === foodX && snakeY === foodY) {
      let head = {x: snakeX, y: snakeY};
      snakeArray.unshift(head);
      createFood();
      score++;
    }
  /**  
    *  Otherwise, pop tail of snake array, give it new x or y coordinate,
    *  depending on direction of movement, and make it the new head of the snake 
    */ 
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