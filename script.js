var rows = 6;
var cols = 7;
var board = [];
for (var i = 0; i < rows; i++) {
    board[i] = [];
    for (var j = 0; j < cols; j++) {
        board[i][j] = null;
    }
}
var currentPlayer = 'red';
var redWins = 0;
var yellowWins = 0;
var boardElement = document.getElementById('board');
var redWinsElement = document.getElementById('redWins');
var yellowWinsElement = document.getElementById('yellowWins');
var resetGameButton = document.getElementById('resetGame');
var resetScoreButton = document.getElementById('resetScore');
function drawBoard() {
    boardElement.innerHTML = '';
    for (var row = 0; row < rows; row++) {
        var rowElement = document.createElement('div');
        rowElement.className = 'flex';
        var _loop_1 = function (col) {
            var cellElement = document.createElement('div');
            cellElement.className = "w-20 h-20 border border-gray-200 flex justify-center items-center cursor-pointer ".concat(board[row][col] === 'red' ? 'bg-red-500' :
                board[row][col] === 'yellow' ? 'bg-yellow-400' :
                    'bg-gray-600');
            cellElement.addEventListener('click', function () { return dropPiece(col); });
            rowElement.appendChild(cellElement);
        };
        for (var col = 0; col < cols; col++) {
            _loop_1(col);
        }
        boardElement.appendChild(rowElement);
    }
}
function dropPiece(col) {
    for (var row = rows - 1; row >= 0; row--) {
        if (!board[row][col]) {
            board[row][col] = currentPlayer;
            if (checkWinner(currentPlayer)) {
                if (currentPlayer === 'red') {
                    redWins++;
                    alert('Red wins!');
                }
                else {
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
function checkWinner(player) {
    for (var row = 0; row < rows; row++) {
        for (var col = 0; col < cols - 3; col++) {
            if (board[row][col] === player &&
                board[row][col + 1] === player &&
                board[row][col + 2] === player &&
                board[row][col + 3] === player) {
                return true;
            }
        }
    }
    for (var col = 0; col < cols; col++) {
        for (var row = 0; row < rows - 3; row++) {
            if (board[row][col] === player &&
                board[row + 1][col] === player &&
                board[row + 2][col] === player &&
                board[row + 3][col] === player) {
                return true;
            }
        }
    }
    for (var row = 0; row < rows - 3; row++) {
        for (var col = 0; col < cols - 3; col++) {
            if (board[row][col] === player &&
                board[row + 1][col + 1] === player &&
                board[row + 2][col + 2] === player &&
                board[row + 3][col + 3] === player) {
                return true;
            }
        }
    }
    for (var row = 3; row < rows; row++) {
        for (var col = 0; col < cols - 3; col++) {
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
    board = [];
    for (var i = 0; i < rows; i++) {
        board[i] = [];
        for (var j = 0; j < cols; j++) {
            board[i][j] = null;
        }
    }
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
