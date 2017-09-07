/**
  *  AUTHOR:    Melanie P. Williams
  *  CREATED:   2017-09-03
  *  PURPOSE:   Snake game with essential features. The game can be played by using the arrow
  *             keys to move the snake. There is a snake and a food cell on the canvas. The goal
  *             of the game is to have the snake "eat the food". When the snake collides with food 
  *             it grows in length and the users score is increased. If the snake crashes into a 
  *             wall or collides with its own body the game is reset.
  *
  *             The core functionality of the game is in paintGame(). This function 
  *             is looped over at short intervals to simulate movement of the snake. The 
  *             snake is represented as an array, snakeArray, of x and y coordinates 
  *             for each cell in the array. Movement is created at each iteration of paintGame
  *             by removing the last cell of snakeArray, updating the x or y coordinate based on
  *             direction given by user input, and redrawing the snake at the given coordinates.
  */

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


  /**************************************************************************  
   ** Keyboard events
   ** 
   ** Description: Sets the direction of movement for the snake based on 
   ** user input. Determines what the x and y coordinates of the snake will
   ** be when it moves. Space bar resets the game.         
   ** 
   ** Input: Keypress (up, down, left, right, spacebar)
   ** 
   ** Output: Sets the direction the snake will move in
   ** 
   *************************************************************************/
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

  /**************************************************************************  
    ** CreateSnake()
    ** 
    ** Description: Creates an array of x and y coordinates.
    ** paintCell() will use these coordinates to draw the snake 
    ** on the canvas             
    ** 
    ** Input: none
    **
    ** Output: An array of the x and y coordinates of each cell in the snake
    ** 
    *************************************************************************/
  const createSnake = () => {
    const length = 4;
    snakeArray = [];
    for(let i = length-1; i >= 0; i--) {
      snakeArray.push({x: i, y: 0});
    }
    return snakeArray;
  }

  /**************************************************************************  
    ** CreateFood()
    ** 
    ** Description: Generates random x and y coordinates to position food on
    ** the canvas.           
    ** 
    ** Input: none
    ** 
    ** Output: An x and a y coordinate to be used by paintCell() to draw the food 
    ** on the canvas.
    ** 
    *************************************************************************/
  const createFood = () => {
    foodX = Math.round(Math.random() * (w - cellSize)/cellSize);
    foodY = Math.round(Math.random() * (h - cellSize)/cellSize);
  }

  /**************************************************************************  
    ** GenerateRandomColor()
    ** 
    ** Description: Generates a random number between 0 and 255 for r, g, and b
    ** color values              
    ** 
    ** Input: none
    ** 
    ** Output: A random rgb value. initGame() uses this to determine the color of
    ** the snake and food for each new game
    ** 
    *************************************************************************/
  const generateRandomColor = () => {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`;
  }

  /**************************************************************************  
    ** PaintCell()
    ** 
    ** Description: Draws a cell on the canvas based on provided x, y coordinates 
    ** and width, height specifications            
    ** 
    ** Input: x, y coordinates, width and height specifications
    ** 
    ** Output: Draws a new cell on the canvas
    ** 
    *************************************************************************/
  const paintCell = (x, y, w, h) => {
    ctx.fillStyle = color; 
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = 'white';
    ctx.strokeRect(x, y, w, h);
  }

/**************************************************************************  
    ** CheckCollision()
    ** 
    ** Description: Checks if the provided x and y coordinates are found in a
    ** given array. Used by paintGame() to check if the head of the snake has
    ** overlapped with any of the cells in the body of the snake. paintGame() uses
    ** this function in its collision detection to determine if the game should be 
    ** restarted              
    ** 
    ** Input: x, y coorinates of some cell on the canvas, array of cells
    ** 
    ** Output: true if the provided x and y coordinates overlap with the x and y 
    ** coordinates of some index in the array, false otherwise 
    ** 
    *************************************************************************/
  const checkCollision = (x, y, arr) => {
    for(var i = 0; i < arr.length; i++) {
      if(arr[i].x == x && arr[i].y == y)
        return true;
      }
    return false;
  }

/**************************************************************************  
    ** InitGame()
    ** 
    ** Description: Starts the game or resets the game if a current game is in progress
    ** Can be called when the user presses the spacebar or when a collision is detected              
    ** 
    ** Input: none
    ** 
    ** Output: A new snake array repositioned at the top-left of the canvas,
    ** a new food cell, a new color for the game cells, sets the default direction 
    ** of movement to "right", resets score to 0 
    ** paintGame() is looped to draw game and simulate movement
    ** If a game is in progress, clearInterval() clears the timer for the gameLoop
    *************************************************************************/
  const initGame = () => {
    createSnake();
    createFood();
    direction = 'right';
    color = generateRandomColor();
    score = 0;
    if(gameLoop) {
      clearInterval(gameLoop);
    }

    gameLoop = setInterval(paintGame, 80);
  }

/**************************************************************************  
    ** paintGame()
    ** 
    ** Description: This function provides the core functionality of the game.
    ** Draws the snake and the food on the canvas. Uses the default direction or input 
    ** provided by user to move the snake at every iteration. Detects if the snake has 
    ** collided with the walls of the canvas or with itself to reset the game,  
    ** or with food to grow the snake and increase the score.              
    **
    ** Input: none
    ** 
    ** Output: Repositions and redraws the snake on the canvas based on movement direction.
    ** Draws food on the canvas if snake hit last food cell
    ** or draws the canvas from scratch if a collision has been detected
    **
    *************************************************************************/
  const paintGame = () => {
  
    // To "move" the snake, the head of the snake is being repositioned and 
    // redrawn every time paintGame is looped over
    // Redraw the background to cover up the previous tail cell thereby erasing the trail
    // left behind as the snake moves

    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, w, h);

 
    // To move the snake:   
    // Each time we loop paintGame create a new head by removing
    // the tail of the snake  
    // Give the tail a new x or y coordinate depending on the direction of movement
    // Then make it the head of the snake by adding it back to the array as the first index  

    let snakeX = snakeArray[0].x;
    let snakeY = snakeArray[0].y;
    
    //  Determine the direction of movement:
    //  If the movement is right or left move the head positively or negatively 
    //  along the x axis  
    //  If the movement is up or down move the head negatively or positively 
    //  along the y axis

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


    // If the snake hits the walls or collides with its own body, restart the game

    if(snakeX === -1 || snakeY === -1 || snakeX === w/cellSize || snakeY === h/cellSize || checkCollision(snakeX, snakeY, snakeArray)) {
      initGame();
      return;
    }
    
    // If the snake hits food, create a new head and add it as the first index of the snake array

    if(snakeX === foodX && snakeY === foodY) {
      let head = {x: snakeX, y: snakeY};
      snakeArray.unshift(head);
      createFood();
      score++;
    }
    // Otherwise, pop tail of snake array, give it new x or y coordinate,
    // depending on direction of movement, and make it the new head of the snake  
    else {
      let tail = snakeArray.pop();
      tail.x = snakeX;
      tail.y = snakeY;
      snakeArray.unshift(tail);
    }

    //  Draw snake and food based on given x and y coordinates

    for(let i = 0; i < snakeArray.length; i++) {
      const cell = snakeArray[i];
      paintCell(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    }

    paintCell(foodX * cellSize, foodY * cellSize, cellSize, cellSize);

    // Draw score
    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.fillText(`Score: ${score}`, 10, 580);

  }

})