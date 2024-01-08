import GameBoard from './gameBoard.ts';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('my-canvas') as HTMLCanvasElement;
  if (!canvas) {
    console.error('Canvas element is not found');
    return;
  }
  canvas.style.backgroundColor = 'blue';
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D | null;
  if (!ctx) {
    console.error('no ctx found');
    return;
  }
  const gameBoard = new GameBoard(ctx, canvas.width, canvas.height);
  gameBoard.startGame();
});
