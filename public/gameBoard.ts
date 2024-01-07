import Snake from "./snake.ts";
import Food from "./food.ts";

class GameBoard {
  private ctx: CanvasRenderingContext2D;
  private snake: Snake;
  private food: Food;
  private gameInterval: number | undefined;
  private lastRenderTime: number;
  private score: number = 0;
  private animationFrameId: number | null = null;
  private readonly canvasWidth: number;
  private readonly canvasHeight: number;
  private readonly snakeSpeed: number;

  constructor(
    ctx: CanvasRenderingContext2D,
    canvasWidth: number,
    canvasHeight: number
  ) {
    this.ctx = ctx;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.snake = new Snake();
    this.food = new Food(canvasWidth, canvasHeight, this.snake.size);
    this.lastRenderTime = 0;
    this.snakeSpeed = 5;
    this.handleKeydown();
  }

  startGame() {
    const gameLoop = (currentTime: number) => {
      this.animationFrameId = window.requestAnimationFrame(gameLoop);
      const secondsSinceLastRender = (currentTime - this.lastRenderTime) / 1000;
      if (secondsSinceLastRender < 1 / this.snakeSpeed) return;
      this.lastRenderTime = currentTime;
      this.updateGameState();
      this.draw();
    };

    this.animationFrameId = window.requestAnimationFrame(gameLoop);
  }

  updateGameState() {
    // make the snake move directions
    this.snake.move();

    // check for food collisions
    if (this.checkFoodCollision()) {
      this.food.spreadFood(
        this.canvasWidth,
        this.canvasHeight,
        this.snake.size
      );
      this.snake.grow();
      this.score += 1;
    }

    // check for snake collision with wall or tail
    if (this.checkSelfCollision() || this.checkWallCollision()) {
      this.endGame();
    }
  }

  checkFoodCollision(): boolean {
    const head = this.snake.getHeadCoords();
    return head.x === this.food.location.x && head.y === this.food.location.y;
  }

  checkSelfCollision(): boolean {
    const head = this.snake.getHeadCoords();
    return this.snake.getSegments().some((segment, index) => {
      index != 0 && segment.x === head.x && segment.y === head.y;
    });
  }

  checkWallCollision(): boolean {
    const head = this.snake.getHeadCoords();
    return (
      head.x < 0 ||
      head.x >= this.canvasWidth ||
      head.y < 0 ||
      head.y >= this.canvasHeight
    );
  }

  endGame() {
    // Stop the current game loop
    if (this.animationFrameId !== null) {
      window.cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    window.alert("You lose");
    this.restartGame();
  }
  restartGame() {
    this.snake = new Snake();
    this.food = new Food(this.canvasWidth, this.canvasHeight, this.snake.size);
    this.score = 0;
    this.lastRenderTime = 0;

    this.startGame();
  }
  draw() {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.snake.draw(this.ctx);
    this.food.draw(this.ctx);
  }

  private handleKeydown() {
    document.addEventListener("keydown", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.snake.setDirection("up");
          break;
        case "ArrowDown":
          this.snake.setDirection("down");
          break;
        case "ArrowRight":
          this.snake.setDirection("right");
          break;
        case "ArrowLeft":
          this.snake.setDirection("left");
          break;
      }
    });
  }
}

export default GameBoard; // export to the client.ts
