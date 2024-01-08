import GameBoard from './gameBoard.ts';
import Alpine from 'alpinejs';

class RunSnakeGame {
  private gameBoard: GameBoard | null = null;
  public score: number = 0;
  public gameOver: boolean = false;
  init(canvasId: string): void {
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
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

    this.gameBoard = new GameBoard(ctx, canvas.width, canvas.height);
    this.startGame();
  }

  startGame(): void {
    this.gameOver = false;
    this.gameBoard?.startGame();
    this.syncScore();
  }

  syncScore(): void {
    if (this.gameBoard) {
      this.score = this.gameBoard.score;
      console.log("rsg:", this.score);
      requestAnimationFrame(() => this.syncScore());
    }
  }

  endGame(): void {
    this.gameOver = true;
    console.log("it's over");
    // Additional logic for handling game over state
  }

  restartGame(): void {
    this.gameBoard?.restartGame();
    this.score = 0;
    this.startGame();
  }
}
const runSnakeGame = new RunSnakeGame();
window.runSnakeGame = runSnakeGame;
Alpine.start();
export default runSnakeGame;
// import { RunSnakeGame } from '/public/dist/js/runSnakeGame.js';
// document.addEventListener('alpine:init', () => {
//   window.runSnakeGame = new RunSnakeGame();

//   console.log(window.runSnakeGame);
// });

// export RunSnakeGame;
// document.addEventListener("DOMContentLoaded", () => {
//   // console.log(window.runSnakeGame);
// })
