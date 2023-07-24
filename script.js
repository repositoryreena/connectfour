function playSound(soundId) {
    const sound = document.getElementById(soundId);
    sound.currentTime = 0;
    sound.play();
}

function startGame() {
    const ROWS = 6;
    const COLS = 7;
    const PLAYER1 = "red";
    const PLAYER2 = "yellow";
    const COMPUTER = "blue"; // Color for the computer player

    let currentPlayer = PLAYER1;
    let isGameOver = false;
    let isPlayerTurn = true; // Flag to track if it's the player's turn

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

        // Remove the click event listener during the game over state
        board.removeEventListener("click", handleClick);

        // Re-add the click event listener for starting a new game
        board.addEventListener("click", handleClick);

        startGame(); // Start a new game
    }

    function checkWin(row, col, playerColor) {
        function checkDirection(direction) {
            let count = 1;
            let newRow = row + direction[0];
            let newCol = col + direction[1];

            while (
                newRow >= 0 &&
                newRow < ROWS &&
                newCol >= 0 &&
                newCol < COLS &&
                board.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`).style.backgroundColor === playerColor
            ) {
                count++;
                newRow += direction[0];
                newCol += direction[1];
            }

            return count;
        }

        const directions = [
            [1, 0], // Vertical
            [0, 1], // Horizontal
            [1, 1], // Diagonal /
            [-1, 1], // Diagonal \
        ];

        for (const direction of directions) {
            const count1 = checkDirection(direction);
            const count2 = checkDirection([-direction[0], -direction[1]]); // Opposite direction

            if (count1 + count2 - 1 >= 4) {
                return true;
            }
        }

        return false;
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
            const targetCell = board.querySelector(`[data-row="${i}"][data-col="${randomCol}"]`);
            if (targetCell.style.backgroundColor === "") {
                targetCell.style.backgroundColor = currentPlayer;

                if (checkWin(i, randomCol, currentPlayer)) {
                    isGameOver = true;
                    setTimeout(() => {
                        alert(`Player ${currentPlayer === PLAYER1 ? "1" : "2"} wins!`);
                        board.removeEventListener("click", handleClick); // Remove the event listener after the game ends
                    }, 100);
                    return;
                }

                currentPlayer = PLAYER1;
                isPlayerTurn = true; // Enable the player's turn after the computer moves
                board.addEventListener("click", handleClick); // Re-add the click event listener for player's next move
                return;
            }
        }
    }

    function handleClick(event) {
        if (isGameOver || !isPlayerTurn) return;

        const cell = event.target;
        const col = parseInt(cell.dataset.col);

        if (isColumnFull(col)) return; // Column is full, do nothing

        const cellsInColumn = document.querySelectorAll(`[data-col="${col}"]`);
        const delay = 200; // Milliseconds between showing each piece
        const showDuration = 1000; // Milliseconds to keep the piece shown before hiding
        let lastAvailableCellIndex = -1;

        for (let i = ROWS - 1; i >= 0; i--) {
            if (cellsInColumn[i].style.backgroundColor === "") {
                lastAvailableCellIndex = i;
                break;
            }
        }

        if (lastAvailableCellIndex === -1) return; // Column is full, do nothing

        let rowIndex = 0;

        function showNextPiece() {
            const targetCell = cellsInColumn[rowIndex];
            if (targetCell && targetCell.style.backgroundColor === "") {
                targetCell.style.backgroundColor = currentPlayer;

                if (checkWin(rowIndex, col, currentPlayer)) {
                    isGameOver = true;
                    setTimeout(() => {
                        alert(`Player ${currentPlayer === PLAYER1 ? "1" : "2"} wins!`);
                        board.removeEventListener("click", handleClick); // Remove the event listener after the game ends
                    }, 100);
                    return;
                }

                setTimeout(() => {
                    if (rowIndex < lastAvailableCellIndex) {
                        targetCell.style.backgroundColor = ""; // Hide the piece after showDuration
                    } else {
                        setTimeout(() => {
                            targetCell.style.backgroundColor = currentPlayer; // Show the piece in the final position
                            playSound("clinkSound"); // Play clinking sound effect when the piece lands at the bottom
                            currentPlayer = currentPlayer === PLAYER1 ? PLAYER2 : PLAYER1;
                            if (currentPlayer === PLAYER2) {
                                isPlayerTurn = false; // Disable the player's turn while the computer moves
                                setTimeout(computerMove, 500); // Make the computer move after a delay
                            } else {
                                isPlayerTurn = true; // Enable the player's turn
                                board.addEventListener("click", handleClick); // Re-add the click event listener for player's next move
                            }
                        }, showDuration);
                    }
                    rowIndex++;
                    showNextPiece();
                }, showDuration);
            }
        }

        isPlayerTurn = false; // Disable player's turn while the piece is falling
        board.removeEventListener("click", handleClick); // Remove the click event listener to prevent further player moves during the animation
        showNextPiece();
    }

    function waitForComputerMove() {
        isPlayerTurn = false;
        setTimeout(computerMove, 500); // Make the computer move after a delay
    }

    // Clear the board and attach the event listener
    board.innerHTML = "";
    createBoard();
    board.addEventListener("click", handleClick);

    // Add an event listener to the "Reset Game" button
    const resetButton = document.getElementById("resetButton");
    resetButton.addEventListener("click", () => {
        isPlayerTurn = true; // Enable the player's turn when resetting the game
        resetBoard();
        playSound("resetSound"); // Play reset sound effect
    });
}

// Call startGame() to initialize the game when the page loads
startGame();
