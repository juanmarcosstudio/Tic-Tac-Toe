const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;
    const updateBoard = (index, mark) => {
        if (board[index] === "") {
            board[index] = mark;
            return true;
        }
        return false;
    };
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, updateBoard, resetBoard };
})();

const Player = (name, marker) => {
    return{ name, marker };
};

const Game = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let isGameOver = false;

    const addPlayers = (player1, player2) => {
        players = [player1, player2];
    };

    const playTurn = (index) => {
        if (isGameOver || !Gameboard.updateBoard(index, players[currentPlayerIndex].marker)) return;
        if (checkWin(players[currentPlayerIndex].marker)) {
            isGameOver = true;
            console.log(`${players[currentPlayerIndex].name} wins!`);   
        } else if (Gameboard.getBoard().every(cell => cell !== "")) {
            isGameOver = true;
            console.log("It's a tie!");
        } else {
            currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
        }
    };

    const checkWin = (marker) => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        return winPatterns.some(pattern =>
            pattern.every(index => Gameboard.getBoard()[index] === marker)
        );
    };

    const resetGame = () => {
        isGameOver = false;
        Gameboard.resetBoard();
        currentPlayerIndex = 0;
    };

    return { addPlayers, playTurn, resetGame };
})();