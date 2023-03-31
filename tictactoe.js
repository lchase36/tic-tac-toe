const personFactory = (name, symbol) => {
  let marker = symbol;
  const getName = () => name;
  const getMarker = () => marker;
  const setMarker = (newMarker) => {
    marker = newMarker;
  };
  return { getName, getMarker, setMarker };
};

// Module stores the board
const gameBoard = (function tictactoeGameBoard() {
  const board = new Array(9);
  const cells = document.querySelectorAll("#board > div");

  const getBoard = function returnBoard() {
    return board;
  };

  const markCell = function markSelectedCell(position, player) {
    const mark = player.getMarker();
    board[position] = mark;
    cells[position].textContent = mark;
  };

  return { getBoard, markCell };
})();

gameBoard();
