// Configurações do jogo
const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");
const box = 20;
let snake = [{ x: 0, y: 0 }];
let foods = [];
let score = 0;
let direction = "right";
let foodVisible = true;
let foodBlinkCounter = 0;
let game;

// Função para desenhar a cobra e os alimentos
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cores disponíveis para a cobra
  const colors = ["#ff0000", "#000"];

  // Desenha a cobra
  snake.forEach((segment, index) => {
    const colorIndex = index % colors.length; // Índice da cor baseado no índice do segmento
    const color = colors[colorIndex]; // Cor correspondente ao índice

    ctx.fillStyle = color; // Cor de preenchimento
    ctx.strokeStyle = "#e4ec46"; // Cor do contorno
    ctx.fillRect(segment.x, segment.y, box, box); // Desenha o retângulo preenchido
    ctx.strokeRect(segment.x, segment.y, box, box); // Desenha o contorno do retângulo
  });

  // Desenha os alimentos
  if (foodVisible) {
    ctx.fillStyle = "#ff0000";
    foods.forEach((food) => {
      ctx.fillRect(food.x, food.y, box, box);
    });
  }

  // Desenha a pontuação
  ctx.fillStyle = "#fff";
  ctx.font = "25px Arial black regular";
  ctx.fillText("PONTUAÇÃO: " + score, 10, 20);
}

// Função para movimentar a cobra
function move() {
  const head = { x: snake[0].x, y: snake[0].y };
  let foodEaten = false;

  if (direction === "right") head.x += box;
  if (direction === "left") head.x -= box;
  if (direction === "up") head.y -= box;
  if (direction === "down") head.y += box;

  snake.unshift(head);

  // Verifica colisão com os alimentos
  foods.forEach((food, index) => {
    if (head.x === food.x && head.y === food.y) {
      score++;
      foods.splice(index, 1); // Remove o alimento do array
      foodEaten = true;
    }
  });

  // Gera novos alimentos se todos foram comidos
  if (foodEaten) {
    generateFoods();
  } else {
    snake.pop();
  }
}

// Função para gerar os alimentos
function generateFoods() {
  while (foods.length < 2) {
    const food = {
      x: Math.floor(Math.random() * (canvas.width / box)) * box,
      y: Math.floor(Math.random() * (canvas.height / box)) * box,
    };
    foods.push(food);
  }
}

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
  document.getElementById("startButton").disabled = false;
  document.getElementById("gameOverMessage").textContent = "GAME OVER!";
}

// Função para atualizar o jogo a cada intervalo de tempo
function updateGame() {
  checkCollision();
  move();
  draw();

  // Controla o piscar da comida
  foodBlinkCounter++;
  if (foodBlinkCounter >= 3) {
    // Ajuste o valor para alterar a frequência do piscar
    foodVisible = !foodVisible;
    foodBlinkCounter = 0;
  }
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

// Event listener para o botão de início de jogo
document.getElementById("startButton").addEventListener("click", startGame);

// Inicializa o jogo
function startGame() {
  snake = [{ x: 0, y: 0 }];
  foods = [];
  score = 0;
  direction = "right";
  foodVisible = true;
  foodBlinkCounter = 0;
  generateFoods();
  game = setInterval(updateGame, 150);
  document.getElementById("startButton").disabled = true;
  document.getElementById("gameOverMessage").textContent = "";
}