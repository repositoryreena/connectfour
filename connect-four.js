import ConnectFour from './connect-four.js'; // Replace './connect-four.js' with the correct path to the connect-four.js file

document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const cells = document.querySelectorAll('.cell');

  const numRows = 6;
  const numCols = 7;
  const player1Color = '#f44336'; // Red
  const player2Color = '#ffc107'; // Yellow

  // Create a new ConnectFour instance
  const game = new ConnectFour(numRows, numCols, player1Color, player2Color);

  function dropPiece(col) {
    if (game.isGameOver()) return;

    game.dropPiece(col);
    const currentPlayerColor = game.getCurrentPlayerColor();

    for (let row = numRows - 1; row >= 0; row--) {
      const cell = cells[row * numCols + col];
      if (cell.style.backgroundColor === '') {
        cell.style.backgroundColor = currentPlayerColor;
        cell.classList.add('fallAnimation'); // Apply the fallAnimation class

        if (game.isGameOver()) {
          displayWinMessage();
        }
        break;
      }
    }
  }

  function displayWinMessage() {
    const messageElement = document.createElement('div');
    messageElement.textContent = `Player ${game.currentPlayer} wins!`;
    messageElement.classList.add('win-message');
    board.appendChild(messageElement);
  }

  function handleCellClick(event) {
    // Get the index of the clicked cell to determine the column
    const cellIndex = Array.from(cells).indexOf(event.target);

    // Calculate the column number based on the index
    const col = cellIndex % numCols;

    // Drop the piece in the selected column
    dropPiece(col);
  }

  // Add a click event listener to each cell
  cells.forEach(cell => cell.addEventListener('click', handleCellClick));
});
