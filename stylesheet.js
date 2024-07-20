const o_Class = "o";
const x_Class = "x";
const winner = [
  //winning ways
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const cellElements = document.querySelectorAll("[data-cell]"); //all cells
const gameBoard = document.getElementById("gameBoard"); //board
const winStatementElement = document.getElementById("winStatement"); //displays whe there is a winner
const restartGame = document.getElementById("restartGame"); // button
const winStatementTextElement = document.querySelector(
  // message changes depending on who wins
  "[data-winning-message-text]"
);

let xTurn;
startGame();
restartGame.addEventListener("click", reset); // click to restart

function reset() {
  restartGame.setAttribute("hidden", true);
  winStatementElement.classList.remove("winStatement");
  cellElements.forEach((cell) => {
    cell.classList.remove(x_Class);
    cell.classList.remove(o_Class);

    cell.removeEventListener("click", fillCell);
    cell.addEventListener("click", fillCell, { once: true });
  });
}

function startGame() {
  console.log("click");
  xTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(x_Class);
    cell.classList.remove(o_Class);

    cell.removeEventListener("click", fillCell);
    cell.addEventListener("click", fillCell, { once: true });
  });
}

function fillCell(e) {
  const cell = e.target;
  const currentClass = xTurn ? x_Class : o_Class;
  takeTurn(cell, currentClass);
  if (checkWinner(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    switchTurns();
  }
}

function endGame(draw) {
  if (draw) {
    winStatementTextElement.innerText = "Draw!";
  } else {
    winStatementTextElement.innerText = `${!xTurn ? "O's" : "X's"} Wins!`;
  }
  restartGame.removeAttribute("hidden");
  winStatementElement.classList.add("winStatement");
}
function isDraw() {
  return [...cellElements].every((cell) => {
    return cell.classList.contains(x_Class) || cell.classList.contains(o_Class);
  });
}
function takeTurn(cell, currentClass) {
  cell.classList.add(currentClass);
}
function switchTurns() {
  xTurn = !xTurn;
}

function checkWinner(currentClass) {
  return winner.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}
