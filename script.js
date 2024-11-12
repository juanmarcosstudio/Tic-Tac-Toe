const Player = (name, marker) => {
    return { name, marker };
  };

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
  
  const Game = (() => {
    let players = [];
    let currentPlayerIndex = 0;
    let isGameOver = false;
  
    const addPlayers = (name1, name2) => {
      players = [Player(name1, "X"), Player(name2, "O")];
    };
  
    const playTurn = (index) => {
      if (isGameOver || !Gameboard.updateBoard(index, players[currentPlayerIndex].marker)) return;
  
      if (checkWin(players[currentPlayerIndex].marker)) {
        isGameOver = true;
        DisplayController.showResult(`${players[currentPlayerIndex].name} wins!`);
      } else if (Gameboard.getBoard().every(cell => cell !== "")) {
        isGameOver = true;
        DisplayController.showResult("It's a tie!");
      } else {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
      }
      DisplayController.renderBoard();
    };
  
    const checkWin = (marker) => {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
      ];
      return winPatterns.some(pattern => 
        pattern.every(index => Gameboard.getBoard()[index] === marker)
      );
    };
  
    const resetGame = () => {
      isGameOver = false;
      Gameboard.resetBoard();
      currentPlayerIndex = 0;
      DisplayController.clearResult();
      DisplayController.renderBoard();
    };
  
    return { addPlayers, playTurn, resetGame };
  })();
  
  const DisplayController = (() => {
    const boardCells = document.querySelectorAll('.board-cell');
    const resultDisplay = document.getElementById('result-display');
    const startButton = document.getElementById('start-game');
    const resetButton = document.getElementById('reset-game');
  
    const renderBoard = () => {
      Gameboard.getBoard().forEach((mark, index) => {
        boardCells[index].textContent = mark;
      });
    };
  
    const setupEventListeners = () => {
      boardCells.forEach((cell, index) => {
        cell.addEventListener('click', () => Game.playTurn(index));
      });
  
      startButton.addEventListener('click', () => {
        const player1 = document.getElementById('player1').value || "Player 1";
        const player2 = document.getElementById('player2').value || "Player 2";
        Game.addPlayers(player1, player2);
        Game.resetGame();
      });
  
      resetButton.addEventListener('click', Game.resetGame);
    };
  
    const showResult = (message) => {
      resultDisplay.textContent = message;
    };
  
    const clearResult = () => {
      resultDisplay.textContent = "";
    };
  
    return { renderBoard, setupEventListeners, showResult, clearResult };
  })();
  
  DisplayController.setupEventListeners();
  