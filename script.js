const ROWS = 6;
const COLS = 7;
const PLAYER1 = "red";
const PLAYER2 = "yellow";
const COMPUTER = "blue"; // Color for the computer player

let currentPlayer = PLAYER1;
let isGameOver = false;

const board = document.getElementById("board");

function createBoard() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            board.appendChild(cell);
        }
    }
}

function resetBoard() {
    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) => (cell.style.backgroundColor = "#ffffff"));
    currentPlayer = PLAYER1;
    isGameOver = false;
}

function checkWin(row, col, playerColor) {
    // Implementation of checkWin remains the same as provided in the previous response.
    // Please use the same checkWin function from the previous response.
}

function isColumnFull(col) {
    const cellsInColumn = document.querySelectorAll(`[data-col="${col}"]`);
    return cellsInColumn[0].style.backgroundColor !== "";
}

function computerMove() {
    if (currentPlayer !== PLAYER2 || isGameOver) return;

    // Implement a simple AI to choose a random valid column for the computer's move.
    let randomCol;
    do {
        randomCol = Math.floor(Math.random() * COLS);
    } while (isColumnFull(randomCol));

    for (let i = ROWS - 1; i >= 0; i--) {
        const targetCell = document.querySelector(`[data-row="${i}"][data-col="${randomCol}"]`);
        if (targetCell.style.backgroundColor === "") {
            targetCell.style.backgroundColor = currentPlayer;

            if (checkWin(i, randomCol, currentPlayer)) {
                isGameOver = true;
                setTimeout(() => {
                    alert(`Player ${currentPlayer === PLAYER1 ? "1" : "2"} wins!`);
                }, 100);
                return;
            }

            currentPlayer = PLAYER1;
            return;
        }
    }
}

function handleClick(event) {
    if (isGameOver) return;

    const cell = event.target;
    const col = parseInt(cell.dataset.col);

    if (isColumnFull(col)) return; // Column is full, do nothing

    const cellsInColumn = document.querySelectorAll(`[data-col="${col}"]`);
    for (let i = ROWS - 1; i >= 0; i--) {
        const targetCell = cellsInColumn[i];
        if (targetCell.style.backgroundColor === "") {
            targetCell.style.backgroundColor = currentPlayer;

            if (checkWin(i, col, currentPlayer)) {
                isGameOver = true;
                setTimeout(() => {
                    alert(`Player ${currentPlayer === PLAYER1 ? "1" : "2"} wins!`);
                }, 100);
                return;
            }
        }
    }

    currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
    if (currentPlayer === PLAYER2) {
        setTimeout(computerMove, 500);
    }
}




function resetGame() {
    resetBoard();
}

createBoard();
board.addEventListener("click", handleClick);