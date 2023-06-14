let startButton;
let restartButton;
let gameCanvas;
let summaryCanvas;
let gameOverCanvas;
let showGame = false;
let showSummary = false;

let squareSize = 20;
let squareX;
let squareY;
let clicks = 0;
let totalClicks = 0;
let missClicks = 0;
let startTime;
let gameTime = 10;

function setup() {
  createCanvas(800, 800);
  startButton = createButton('Start Game');
  startButton.position(width / 2 - startButton.width / 2, height / 1.7);
  startButton.mousePressed(startGame);
  restartButton = createButton('Start Again');
  restartButton.position(width / 2 - restartButton.width / 2, height / 1.4);
  restartButton.mousePressed(startGame);
  restartButton.hide();

  gameCanvas = createGraphics(width, height);
  summaryCanvas = createGraphics(width, height);
  gameOverCanvas = createGraphics(width, height);
  gameOverCanvas.background(0);
  gameOverCanvas.textAlign(CENTER, CENTER);
  gameOverCanvas.textSize(32);
  gameOverCanvas.fill(255);
  gameOverCanvas.text('Game Over!', width / 2, height / 2);
}

function draw() {
  background(220);

  if (showGame) {
    updateGame();
    drawGame();

    image(gameCanvas, 0, 0);

    if (millis() >= startTime + gameTime * 1000) {
      endGame();
    }
  } else if (showSummary) {
    image(summaryCanvas, 0, 0);
  } else {
    textAlign(CENTER, CENTER);
    textSize(32);
    text('Welcome to My Game!', width / 2, height / 2 - 50);
    
  }
}

function startGame() {
  showGame = true;
  showSummary = false;
  
  initializeGame();
  startTime = millis();
  startButton.remove();
  restartButton.hide();
  
}

function endGame() {
  showGame = false;
  showSummary = true;

  let missClicks = totalClicks - clicks;

  summaryCanvas.background(220);
  summaryCanvas.fill(0);
  summaryCanvas.textAlign(CENTER, CENTER);
  summaryCanvas.textSize(24);
  summaryCanvas.text('Game Summary', width / 2, 50);
  summaryCanvas.textSize(18);
  summaryCanvas.text('total Clicks: ' + totalClicks, width / 2, height / 2 - 50);
  summaryCanvas.text('Missclicks: ' + missClicks, width / 2, height / 2);
  summaryCanvas.text('Accuracy: ' + calculateAccuracy(clicks, totalClicks).toFixed(1) + '%', width / 2, height / 2 + 50);
  
  restartButton.show();
  
}

function updateGame() {
  if (clicks === 0 && totalClicks > 0) {
    clicks = 0;
    totalClicks = 0;
  }
}

function drawGame() {
  gameCanvas.background(230);
  gameCanvas.fill(random(255, 0), random(255, 0), random(255, 0));
  gameCanvas.rect(squareX, squareY, squareSize, squareSize);
  gameCanvas.textSize(20);
  gameCanvas.fill(0);
  gameCanvas.text('Clicks: ' + clicks, 10, 30);
  gameCanvas.text('Missclicks: ' + (totalClicks - clicks), 10, 60);

  let remainingTime = max(0, (startTime + gameTime * 1000 - millis()) / 1000);
  gameCanvas.text('Time: ' + remainingTime.toFixed(1), width - 100, 30);
}

function initializeGame() {
  squareX = width / 2 - squareSize / 2;
  squareY = height / 2 - squareSize / 2;
  clicks = 0;
  totalClicks = 0;
  startTime = 0;
}

function calculateAccuracy(correctClicks, totalClicks) {
  if (totalClicks === 0) {
    return 0;
  }
  return (correctClicks / totalClicks) * 100;
}

function mousePressed() {
  totalClicks++

  if (mouseX > squareX && mouseX < squareX + squareSize && mouseY > squareY && mouseY < squareY + squareSize) {
    squareX = random(width - squareSize);
    squareY = random(height - squareSize);
    clicks++;
  }
}