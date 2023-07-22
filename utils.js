// Function to create a 2D array with given dimensions and initial value
function create2DArray(rows, cols, initialValue) {
    return Array.from({ length: rows }, () => Array(cols).fill(initialValue));
  }
  
  // Function to get the cell element from row and column
  function getCellElement(row, col) {
    const cells = document.querySelectorAll('.cell');
    return cells[row * numCols + col];
  }
  
  // Function to check if the given row and column are within the board's bounds
  function isWithinBounds(row, col, numRows, numCols) {
    return row >= 0 && row < numRows && col >= 0 && col < numCols;
  }
  
  // Function to generate a random integer between min and max (inclusive)
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  // Add more utility functions if needed
  
  export { create2DArray, getCellElement, isWithinBounds, getRandomInt };
  