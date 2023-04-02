/* eslint-disable no-plusplus */
// Module stores the board
const gameBoard = (function tictactoeGameBoard() {
  const board = new Array(9);

  const getBoard = function returnBoard() {
    return board;
  };

  const clear = function clearBoard() {
    board.fill();
  };

  const markCell = function markSelectedCell(position, mark) {
    board[position] = mark;
  };

  return { getBoard, clear, markCell };
})();

const playerFactory = (name, symbol) => {
  let marker = symbol;
  let score = 0;
  const getName = () => name;
  const getMarker = () => marker;
  const setMarker = (newMarker) => {
    marker = newMarker;
  };
  const getScore = () => score;
  const increaseScore = function incrementPlayerScore() {
    score += 1;
  };
  return { getName, getMarker, setMarker, getScore, increaseScore };
};

// eslint-disable-next-line no-unused-vars
const gameLogic = (function tictactoeGameLogic() {
  const nameP1 = "Player 1";
  const nameP2 = "Player 2";
  const markP1 = document.querySelector("#mark-p1").textContent || "X";
  const markP2 = markP1 === "X" ? "O" : "X";
  const cells = document.querySelectorAll("#board > button");

  const player1 = playerFactory(nameP1, markP1);
  const player2 = playerFactory(nameP2, markP2);
  let activePlayer = player1;
  let victor;

  const getCurrentPlayer = function getActivePlayer() {
    return activePlayer;
  };

  const swapCurrentPlayer = function setActivePlayer() {
    if (activePlayer === player1) {
      activePlayer = player2;
    } else {
      activePlayer = player1;
    }
  };

  const checkEqual = function checkCellEquality(cell1, cell2, cell3) {
    if (cell1 && cell1 === cell2 && cell1 === cell3) {
      return true;
    }
    return false;
  };

  const checkRow = function checkForWinningRow(board) {
    const startCells = [0, 3, 6];
    const win = startCells.some((cell) => {
      const cell1 = board[cell];
      const cell2 = board[cell + 1];
      const cell3 = board[cell + 2];
      return checkEqual(cell1, cell2, cell3);
    });
    return win;
  };

  const checkCol = function checkForWinningColumn(board) {
    const startCells = [0, 1, 2];
    const win = startCells.some((cell) => {
      const cell1 = board[cell];
      const cell2 = board[cell + 3];
      const cell3 = board[cell + 6];
      return checkEqual(cell1, cell2, cell3);
    });
    return win;
  };

  const checkDiag = function checkForWinningDiaganol(board) {
    const cellsToCheck = [
      [0, 4, 8],
      [2, 4, 6],
    ];
    const win = cellsToCheck.some((array) => {
      const cell1 = board[array[0]];
      const cell2 = board[array[1]];
      const cell3 = board[array[2]];
      return checkEqual(cell1, cell2, cell3);
    });
    return win;
  };

  const reset = function resetGame() {
    cells.forEach((cell) => {
      // eslint-disable-next-line no-param-reassign
      cell.textContent = "";
    });
    victor = null;
    gameBoard.clear();
  };

  const checkWinner = function checkBoardForWinningCombo() {
    const boardState = gameBoard.getBoard();
    if (checkRow(boardState) || checkCol(boardState) || checkDiag(boardState)) {
      victor = activePlayer.getName();
      console.log(victor);
      reset();
    }
  };

  cells.forEach((cell) => {
    // eslint-disable-next-line no-param-reassign
    cell.textContent = "";
  });

  const setCell = function setCellToPlayerMark(position) {
    const mark = activePlayer.getMarker();
    cells[position].textContent = mark;
    gameBoard.markCell(position, mark);
    checkWinner();
    console.log(`active: ${activePlayer.getName()} \nvictor: ${victor}`);
    swapCurrentPlayer();
  };

  // bind action to cell marking
  for (let i = 0; i < cells.length; i++) {
    const boundMarkcell = setCell.bind(cells[i], i);
    cells[i].addEventListener("click", boundMarkcell, { once: true });
  }

  return { getCurrentPlayer, swapCurrentPlayer, checkWinner };
})();
