/* eslint-disable no-plusplus */
// Module stores the board
const gameBoard = (function tictactoeGameBoard() {
  const board = new Array(9).fill(null);

  const getBoard = function returnBoard() {
    return board;
  };

  const clear = function clearBoard() {
    board.fill(null);
  };

  const markCell = function markSelectedCell(position, mark) {
    board[position] = mark;
  };

  return { getBoard, clear, markCell };
})();

const playerFactory = (designation, symbol) => {
  let marker = symbol;
  let name = designation;
  const getName = () => name;
  const setName = (newName) => {
    name = newName;
  };
  const getMarker = () => marker;
  const setMarker = (newMarker) => {
    marker = newMarker;
  };
  return { getName, setName, getMarker, setMarker };
};

// eslint-disable-next-line no-unused-vars
const gameLogic = (function tictactoeGameLogic() {
  const nameP1 = "Player 1";
  const nameP2 = "Player 2";
  const markP1 = "X";
  const markP2 = "O";
  const player1 = playerFactory(nameP1, markP1);
  const player2 = playerFactory(nameP2, markP2);
  const nameInputs = document.querySelectorAll("form input");
  let activePlayer = player1;

  const cells = document.querySelectorAll("#board > button");

  let result;
  const modal = document.querySelector("#result-modal");
  const resultText = document.querySelector("#result-text-container > h1");
  const resetButton = document.querySelector("#reset");

  const changeName = function changePlayerName() {
    if (this.id === "name-p1") {
      player1.setName(this.value || "Player 1");
    } else {
      player2.setName(this.value || "Player 2");
    }
  };

  const reset = function resetGame() {
    cells.forEach((cell) => {
      // eslint-disable-next-line no-param-reassign
      cell.textContent = "";
    });
    result = null;
    activePlayer = player1;
    gameBoard.clear();
    resultText.textContent = "";
    modal.classList.toggle("hidden");
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

  const displayVictor = function displayVictoryOverlay(victor) {
    result = victor;
    resultText.textContent = result;
    modal.classList.toggle("hidden");
  };

  const checkDraw = function checkBoardForDraw(board) {
    if (board.every((cell) => cell !== null)) {
      displayVictor("Tie Game");
    }
  };

  const checkWinner = function checkBoardForWinningCombo() {
    const boardState = gameBoard.getBoard();
    if (checkRow(boardState) || checkCol(boardState) || checkDiag(boardState)) {
      const victoryText = `${activePlayer.getName()} Wins!`;
      displayVictor(victoryText);
    } else {
      checkDraw(boardState);
    }
  };

  cells.forEach((cell) => {
    // eslint-disable-next-line no-param-reassign
    cell.textContent = "";
  });

  const setCell = function setCellToPlayerMark(position) {
    if (!cells[position].textContent) {
      const mark = activePlayer.getMarker();
      cells[position].textContent = mark;
      gameBoard.markCell(position, mark);
      checkWinner();
      swapCurrentPlayer();
    }
  };

  const addCellEvents = function addMarkEventToCellButtons() {
    for (let i = 0; i < cells.length; i++) {
      const boundMarkcell = setCell.bind(cells[i], i);
      cells[i].addEventListener("click", boundMarkcell);
    }
  };

  addCellEvents();

  resetButton.addEventListener("click", reset);

  nameInputs.forEach((input) => {
    input.addEventListener("change", changeName);
  });
})();
