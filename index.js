const board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let player = 0;

// 0 -> game not finished
// 1 -> winner player 1
// 2 -> winner player 2
// 3 -> draw‚
const gameOver = () => {
  let winner = 0;
  //checkRows
  for (let i = 0; i < 3; i++) {
    winner = board[3 * i];
    for (let j = 1; j < 3; j++) {
      if (board[3 * i + j] !== winner) {
        winner = 0;
      }
    }
    console.log("checkRows Winner:", winner);
    if (winner) {
      return winner;
    }
  }
  //checkColumns
  for (let i = 0; i < 3; i++) {
    winner = board[i];
    for (let j = 1; j < 3; j++) {
      if (board[3 * j + i] !== winner) {
        winner = 0;
      }
    }
    console.log("checkCols Winner:", winner);

    if (winner) {
      return winner;
    }
  }
  //checkDiagonals
  if (board[0] > 0 && board[0] === board[4] && board[4] === board[8])
    return board[0];
  if (board[2] > 0 && board[2] === board[4] && board[4] === board[6])
    return board[2];

  // check for draw
  winner = 3;
  for (const value of board) {
    if (value === 0) {
      winner = 0;
      break;
    }
  }
  // continue game
  return winner;
};

const drawBoard = () => {
  for (let i = 0; i < board.length; i++) {
    const box = document.getElementById(`${i + 1}`);
    box.innerHTML = board[i] === 0 ? "" : board[i] === 1 ? "X" : "O";
  }
  const stateDiv = document.getElementById("game-state");
  const newGameButton = document.getElementById("new-game");
  const gameState = gameOver();
  switch (gameState) {
    case 0:
      stateDiv.innerHTML = `Player ${player + 1}`;
      newGameButton.disabled = true;
      break;
    case 1:
    case 2:
      stateDiv.innerHTML = `🏅 Player ${gameState} 🏅`;
      newGameButton.disabled = false;
      break;
    case 3:
      stateDiv.innerHTML = `Draw!`;
      newGameButton.disabled = false;
      break;
    default:
      break;
  }
};

const resetGame = () => {
  console.log("reset");
  for (let i = 0; i < board.length; i++) {
    board[i] = 0;
  }
  player = 0;
  drawBoard();
};

const onRectClick = (e) => {
  if (board[e.target.id - 1] !== 0) {
    return;
  }
  board[e.target.id - 1] = 1 + player;
  player = player === 0 ? 1 : 0;
  drawBoard();
};

window.addEventListener("DOMContentLoaded", () => {
  drawBoard();
  const cells = document.querySelectorAll(".cell");
  console.log(cells);
  cells.forEach((cell) => {
    cell.addEventListener("click", onRectClick);
  });
  const newGameButton = document.getElementById("new-game");
  newGameButton.addEventListener("click", resetGame);
});
