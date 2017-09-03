document.addEventListener('DOMContentLoaded', function() {
  console.log('Content Loaded')
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const snakeArray = [];

  ctx.fillStyle = 'lightgrey';
  ctx.fillRect(0, 0, w, h);
 
  // Create an array of the x and y coordinates of our snake 
  function createSnake() {
    const length = 4;
    for(let i = 0; i < length; i++) {
      snakeArray.push({x: i, y: 0});
    }
  }

  createSnake();

  function paintSnake() {
    for(let i = 0; i < snakeArray.length; i++) {
      const cell = snakeArray[i];
      ctx.fillStyle = 'pink';
      ctx.fillRect(cell.x * 20, cell.y * 20, 20, 20);
      ctx.strokeStyle = 'white';
      ctx.strokeRect(cell.x * 20, cell.y * 20, 20, 20);
    }
  }

  paintSnake()
})