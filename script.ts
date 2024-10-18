const rows = 6;
const cols = 7;
let board: (string | null)[][] = Array.from({ length: rows }, () => Array(cols).fill(null));
let currentPlayer: string = 'red';
let redWins: number = 0;
let yellowWins: number = 0;

const boardElement = document.getElementById('board')!;
const redWinsElement = document.getElementById('redWins')!;
const yellowWinsElement = document.getElementById('yellowWins')!;
const resetGameButton = document.getElementById('resetGame')!;
const resetScoreButton = document.getElementById('resetScore')!;

function drawBoard() {
    boardElement.innerHTML = ''; 
    for (let row = 0; row < rows; row++) {
        const rowElement = document.createElement('div');
        rowElement.className = 'flex'; 
        for (let col = 0; col < cols; col++) {
            const cellElement = document.createElement('div');
            cellElement.className = `w-20 h-20 border border-gray-200 flex justify-center items-center cursor-pointer ${
                board[row][col] === 'red' ? 'bg-red-500' :
                board[row][col] === 'yellow' ? 'bg-yellow-400' : 
                'bg-gray-600'
            }`; 
            cellElement.addEventListener('click', () => dropPiece(col));
            rowElement.appendChild(cellElement);
        }
        boardElement.appendChild(rowElement);
    }
}

function dropPiece(col: number) {
    for (let row = rows - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            if (checkWinner(currentPlayer)) {
                if (currentPlayer === 'red') {
                    redWins++;
                    alert('Red wins!');
                } else {
                    yellowWins++;
                    alert('Yellow wins!');
                }
                updateScore();
            }
            currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
            drawBoard();
            break;
        }
    }
}

function checkWinner(player: string): boolean {
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols - 3; col++) {
            if (board[row][col] === player &&
                board[row][col + 1] === player &&
                board[row][col + 2] === player &&
                board[row][col + 3] === player) {
                return true;
            }
        }
    }

   
    for (let col = 0; col < cols; col++) {
        for (let row = 0; row < rows - 3; row++) {
            if (board[row][col] === player &&
                board[row + 1][col] === player &&
                board[row + 2][col] === player &&
                board[row + 3][col] === player) {
                return true;
            }
        }
    }

   
    for (let row = 0; row < rows - 3; row++) {
        for (let col = 0; col < cols - 3; col++) {
            if (board[row][col] === player &&
                board[row + 1][col + 1] === player &&
                board[row + 2][col + 2] === player &&
                board[row + 3][col + 3] === player) {
                return true;
            }
        }
    }

   
    for (let row = 3; row < rows; row++) {
        for (let col = 0; col < cols - 3; col++) {
            if (board[row][col] === player &&
                board[row - 1][col + 1] === player &&
                board[row - 2][col + 2] === player &&
                board[row - 3][col + 3] === player) {
                return true;
            }
        }
    }

    return false;
}

function resetGame() {
    board = Array.from({ length: rows }, () => Array(cols).fill(null));
    currentPlayer = 'red';
    drawBoard();
}

function resetScore() {
    redWins = 0;
    yellowWins = 0;
    updateScore();
}

function updateScore() {
    redWinsElement.textContent = redWins.toString();
    yellowWinsElement.textContent = yellowWins.toString();
}

resetGameButton.addEventListener('click', resetGame);
resetScoreButton.addEventListener('click', resetScore);

drawBoard();
