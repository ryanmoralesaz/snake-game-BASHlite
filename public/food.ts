class Food {
  private readonly size: number; // size of the food
  public location: { x: number; y: number }; // current location

  constructor(canvasWidth: number, canvasHeight: number, gridSize: number) {
    this.size = 20;
    this.location = { x: 20, y: 20 };
    this.spreadFood(canvasWidth, canvasHeight, gridSize);
  }

  spreadFood(canvasWidth: number, canvasHeight: number, gridSize: number) {
    const maxX = Math.floor(canvasWidth / gridSize);
    const maxY = Math.floor(canvasHeight / gridSize);
    this.location.x = Math.floor(Math.random() * maxX) * gridSize;
    this.location.y = Math.floor(Math.random() * maxY) * gridSize;
    console.log(this.location.x);
    console.log("y", this.location.y);
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.location.x, this.location.y, this.size, this.size);
  }
}
export default Food; // export to the gameboard.ts
