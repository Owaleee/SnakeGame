// Configurações do jogo
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let snake = [{ x: 0, y: 0 }];
let food = { x: 0, y: 0 };
let score = 0;
let direction = "right";

// Função para desenhar a cobra e os alimentos
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha a cobra
  snake.forEach((segment) => {
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(segment.x, segment.y, box, box);
  });

  // Desenha o alimento
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(food.x, food.y, box, box);

  // Desenha a pontuação
  ctx.fillStyle = "#fff";
  ctx.font = "20px Arial";
  ctx.fillText("Pontuação: " + score, 10, 20);
}

// Função para movimentar a cobra
function move() {
  const head = { x: snake[0].x, y: snake[0].y };

  if (direction === "right") head.x += box;
  if (direction === "left") head.x -= box;
  if (direction === "up") head.y -= box;
  if (direction === "down") head.y += box;

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop();
  }
}

// Função para gerar um novo alimento
function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / box)) * box;
    food.y = Math.floor(Math.random() * (canvas.height / box)) * box;

  }
  // Função para gerar a cobra no centro do mapa
function generateSnake() {
    const canvasCenterX = Math.floor(canvas.width / 2 / box) * box;
    const canvasCenterY = Math.floor(canvas.height / 2 / box) * box;
  
    snake = [
      { x: canvasCenterX, y: canvasCenterY },
    ];
  }
  
  // Inicializa a cobra no centro do mapa
  generateSnake();
  
  
// Função para verificar colisões
function checkCollision() {
  const head = snake[0];

  // Verifica colisão com a parede
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    gameOver();
  }

  // Verifica colisão com a própria cauda
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
    }
  }
}

// Função para encerrar o jogo
function gameOver() {
  clearInterval(game);
  alert("Game Over!");
}

// Função para atualizar o jogo a cada intervalo de tempo
function updateGame() {
  checkCollision();
  move();
  draw();
}

// Função para definir a direção da cobra
function changeDirection(event) {
  const key = event.keyCode;

  if (key === 37 && direction !== "right") direction = "left";
  if (key === 38 && direction !== "down") direction = "up";
  if (key === 39 && direction !== "left") direction = "right";
  if (key === 40 && direction !== "up") direction = "down";
}

// Event listener para capturar as teclas pressionadas
document.addEventListener("keydown", changeDirection);

// Inicializa o jogo
generateFood();
const game = setInterval(updateGame, 150);

//Função para direcionar a partir do click

function redirecionar() {
  window.location.href = "https://linktr.ee/owalee";
}