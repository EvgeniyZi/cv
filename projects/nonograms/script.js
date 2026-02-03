const bodyElement = document.querySelector("body");
const headerElement = document.createElement("header");
headerElement.classList.add("header", "wrapper");
bodyElement.append(headerElement);

const gameNameElement = document.createElement("h1");
gameNameElement.textContent = "NONOGRAMS";
gameNameElement.classList.add("game-name");
headerElement.append(gameNameElement);

const timerConteinerElement = document.createElement("div");
timerConteinerElement.classList.add("timer-container", "wrapper");
timerConteinerElement.id = "timer";
timerConteinerElement.textContent = "Time: 00:00";
bodyElement.append(timerConteinerElement);

const gameConteinerElement = document.createElement("section");
gameConteinerElement.id = "game-container";
gameConteinerElement.classList.add("game-container", "wrapper");
bodyElement.append(gameConteinerElement);

const boxGridElement = document.createElement("div");
boxGridElement.classList.add("box-grid");
gameConteinerElement.append(boxGridElement);

const topHintsElement = document.createElement("div");
topHintsElement.classList.add("top-hints");
boxGridElement.append(topHintsElement);

const mainGridContainer = document.createElement("div");
mainGridContainer.classList.add("main-grid-container");
boxGridElement.append(mainGridContainer);

const leftHintsElement = document.createElement("div");
leftHintsElement.classList.add("left-hints");
mainGridContainer.append(leftHintsElement);

const gameGridElement = document.createElement("div");
gameGridElement.classList.add("game-grid");
mainGridContainer.append(gameGridElement);

const gameMessageElement = document.createElement("div");
gameMessageElement.classList.add("game-message", "wrapper");
bodyElement.append(gameMessageElement);

const winMessageElement = document.createElement('div');
winMessageElement.classList.add("win-message");
winMessageElement.style.display = "none";
winMessageElement.textContent = `Great! You have solved the nonogram!`;
gameMessageElement.append(winMessageElement);

const gameControlsElement = document.createElement("div");
gameControlsElement.classList.add("game-controls", "wrapper");
bodyElement.append(gameControlsElement);

const restartButtonElement = document.createElement("button");
restartButtonElement.classList.add("button-restart");
restartButtonElement.id = "buttonRestart";
restartButtonElement.style.display = "block";
restartButtonElement.textContent = "Reset game";
gameControlsElement.append(restartButtonElement);

const pattern = [
  [1, 0, 1, 0, 1],
  [1, 1, 0, 1, 0],
  [0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0],
  [0, 1, 0, 1, 1]
];

let playerGrid = pattern.map(row => row.map(() => 0));

function createGameGrid() {
  gameGridElement.innerHTML = "";
  topHintsElement.innerHTML = "";
  leftHintsElement.innerHTML = "";
  
  const rowsCount = pattern.length;
  const columnsCount = pattern[0].length;
  
  gameGridElement.style.gridTemplateColumns = `repeat(${columnsCount}, 30px)`;
  gameGridElement.style.gridTemplateRows = `repeat(${rowsCount}, 30px)`;
  topHintsElement.style.gridTemplateColumns = `repeat(${columnsCount}, 30px)`;
  leftHintsElement.style.gridTemplateRows = `repeat(${rowsCount}, 30px)`;
  
  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    for (let colIndex = 0; colIndex < columnsCount; colIndex++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;
      gameGridElement.append(cell);      
    }
  }
  
  for (let colIndex = 0; colIndex < columnsCount; colIndex++) {
    const hintCell = document.createElement("div");
    hintCell.classList.add("hint", "vertical-hint");
    topHintsElement.append(hintCell);
  }
  
  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const hintCell = document.createElement("div");
    hintCell.classList.add("hint", "horizon-hint");
    leftHintsElement.append(hintCell);
  }
  
  updateHints();
}

function enableCells() {
  document.querySelectorAll(".cell").forEach(cell => {

    cell.removeEventListener("click", toggleCell);

    cell.addEventListener("click", toggleCell);
  });
}

function toggleCell(event) {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;
  
  playerGrid[row][col] = playerGrid[row][col] === 1 ? 0 : 1;
  event.target.classList.toggle("active");
  
  checkWin();
}

function calculateHints(grid) {
  return grid.map(row => {
    let hints = [];
    let count = 0;
    
    row.forEach(cell => {
      if (cell === 1) {
        count++;
      } else if (count > 0) {
        hints.push(count);
        count = 0;
      }
    });
    if (count > 0) hints.push(count);
    return hints.length ? hints : [0];
  });
}

function updateHints() {
  const rowHints = calculateHints(pattern);
  const columnHints = calculateHints(pattern[0].map((_, colIndex) => pattern.map(row=> row[colIndex])));
  
  topHintsElement.childNodes.forEach((hintCell, index) => {
    hintCell.textContent = columnHints[index].join("\n");
  });
  
  leftHintsElement.childNodes.forEach((hintCell, index) => {
    hintCell.textContent = rowHints[index].join(" ");
  });
}

function checkWin() {
  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < pattern[row].length; col++) {
      if (playerGrid[row][col] !== pattern[row][col]) {
        return;
      }
    }
  }
  handleWin();
}

let timerStarted = null;

function handleWin() {
  winMessageElement.style.display = "block";
  clearInterval(timerStarted);
  disableCells();
}

function disableCells() {
    document.querySelectorAll(".cell").forEach(cell => {
    cell.removeEventListener("click", toggleCell);
  });
}

let seconds = 0;
let minutes = 0;

function formatTime(num) {
  return num < 10 ? "0" + num : num;
}

function updateTimer() {
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
    }

    timerConteinerElement.textContent = `Time: ${formatTime(minutes)}:${formatTime(seconds)}`;
}

function startGame(event) {
  if(!timerStarted) {
    enableCells();
    timerStarted = setInterval(updateTimer, 1000);
    toggleCell(event);
  }
}

function restartGame() {
  playerGrid = pattern.map(row => row.map(() => 0));
  createGameGrid();
  
  clearInterval(timerStarted);
  timerStarted = null;
  seconds = 0;
  minutes = 0;
  timerConteinerElement.textContent = "Time: 00:00";
  winMessageElement.style.display = "none";

  gameGridElement.removeEventListener("click", startGame);
  gameGridElement.addEventListener("click", startGame);
}

createGameGrid();
gameGridElement.addEventListener("click", startGame);
restartButtonElement.addEventListener("click", restartGame);
