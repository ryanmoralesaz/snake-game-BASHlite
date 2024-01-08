import GameBoard from './gameBoard.ts';

function runSnakeGame() {
  let gameBoard = null;

  return {
    score: 0,
    gameOver: false,

    init(canvasId) {
      const canvas = document.getElementById('my-canvas');
      if (!canvas) {
        console.error('Canvas element is not found');
        return;
      }
      canvas.style.backgroundColor = 'blue';
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        console.error('no ctx found');
        return;
      }

      gameBoard = new GameBoard(ctx, canvas.width, canvas.height);
      this.startGame();
    },

    startGame() {
      this.gameOver = false;
      console.log(gameBoard);
      gameBoard.startGame();
      this.syncScore();
    },

    syncScore() {
      this.score = gameBoard.score;
      requestAnimationFrame(() => this.syncScore());
    },

    endGame() {

      return this.gameOver = true;
      // this.$nextTick(() => { this.score = 0 });
      // console.log(this.gameOver);
      // this.score = 0;
      // this.$nextTick(() => { });
      // if (gameBoard) {
      //   // gameBoard.endGame();
      // } else {
      //   console.error('GameBoard is not initialized');
      // }
    },

    restartGame() {
      gameBoard.restartGame();
      this.score = 0;
      this.startGame();
    }
  };
}

window.runSnakeGame = runSnakeGame;
