// Function to check for a win in the horizontal direction
function checkHorizontal(board, numRows, numCols, player, row, col) {
    let count = 1;
    let left = col - 1;
    let right = col + 1;
  
    // Check left
    while (left >= 0 && board[row][left] === player) {
      count++;
      left--;
    }
  
    // Check right
    while (right < numCols && board[row][right] === player) {
      count++;
      right++;
    }
  
    return count >= 4;
  }
  
  // Function to check for a win in the vertical direction
  function checkVertical(board, numRows, numCols, player, row, col) {
    let count = 1;
    let up = row - 1;
    let down = row + 1;
  
    // Check up
    while (up >= 0 && board[up][col] === player) {
      count++;
      up--;
    }
  
    // Check down
    while (down < numRows && board[down][col] === player) {
      count++;
      down++;
    }
  
    return count >= 4;
  }
  
  // Function to check for a win in both diagonal directions
  function checkDiagonal(board, numRows, numCols, player, row, col) {
    let count = 1;
    let i = 1;
  
    // Check top-left to bottom-right
    while (row + i < numRows && col + i < numCols && board[row + i][col + i] === player) {
      count++;
      i++;
    }
  
    i = 1;
    // Check bottom-left to top-right
    while (row - i >= 0 && col + i < numCols && board[row - i][col + i] === player) {
      count++;
      i++;
    }
  
    return count >= 4;
  }
  
  // Function to check for a win in any direction
  function checkWin(board, numRows, numCols, player, row, col) {
    return (
      checkHorizontal(board, numRows, numCols, player, row, col) ||
      checkVertical(board, numRows, numCols, player, row, col) ||
      checkDiagonal(board, numRows, numCols, player, row, col)
    );
  }
  
  export { checkWin };
  