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

  // Start and reset game
  function initGame() {
    createSnake();
    direction = 'right';
    color = randomizeColors()
    if(gameLoop) {
      clearInterval(gameLoop)
    }
    gameLoop = setInterval(paintSnake, 200)
    console.log(gameLoop)
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
    console.log(snakeY)
    if(snakeX === -1 || snakeY === -1 || snakeX === w/cellSize || snakeY === h/cellSize) {
      initGame()
      return
    }

    // Pop tail of snake array and move it to the "head" of the snake, update x or y coordinate to generate movement
    const tail = snakeArray.pop();
    tail.x = snakeX;
    tail.y = snakeY;
    snakeArray.unshift(tail)


    for(let i = 0; i < snakeArray.length; i++) {
      const cell = snakeArray[i];
      ctx.fillStyle =  color; 
      ctx.fillRect(cell.x * 20, cell.y * 20, 20, 20);
      ctx.strokeStyle = 'white';
      ctx.strokeRect(cell.x * 20, cell.y * 20, 20, 20);
    }
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
          console.log(direction)
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

  function randomizeColors() {
    let r = Math.round(Math.random() * 255);
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 255);

    return `rgb(${r}, ${g}, ${b})`
  }

})