class Snake {
  private segments: { x: number; y: number }[]; // the array of snake segments
  private direction: string; // direction of the movement ('up', 'down', 'left', 'right')
  private directionQueue: string[] = [];
  public readonly size: number; // size of each segment

  constructor() {
    this.segments = [{ x: 100, y: 100 }]; // starting segment
    this.direction = "right";
    this.size = 20;
  }

  getHeadCoords() {
    return this.segments[0];
  }
  getSegments() {
    return this.segments;
  }
  move() {
    // Update direction based on the first item in the queue
    if (this.directionQueue.length > 0) {
      this.direction = this.directionQueue.shift()!;
    }
    // logic for moving the snake
    let head = { ...this.segments[0] }; // copy the head segment
    switch (this.direction) {
      case "right":
        head.x += this.size;
        break;
      case "left":
        head.x -= this.size;
        break;
      case "up":
        head.y -= this.size;
        break;
      case "down":
        head.y += this.size;
        break;
    }
    this.segments.unshift(head);
    this.segments.pop();
  }
  setDirection(newDirection: string) {
    const lastDirection =
      this.directionQueue.length > 0
        ? this.directionQueue[this.directionQueue.length - 1]
        : this.direction;
    if (
      (newDirection === "right" && lastDirection !== "left") ||
      (newDirection === "left" && lastDirection !== "right") ||
      (newDirection === "up" && lastDirection !== "down") ||
      (newDirection === "down" && lastDirection !== "up")
    ) {
      this.directionQueue.push(newDirection);
    }
  }
  draw(ctx: CanvasRenderingContext2D) {
      let segmentCount = 0;
      for (const segment of this.segments) {
        if (segmentCount === 0) {
            ctx.fillStyle = "green";
        } else {
            ctx.fillStyle = "yellow";
        }
      ctx.fillRect(segment.x, segment.y, this.size, this.size);
      segmentCount++;
    }
  }
  grow() {
    // Get the last segment of the snake
    const lastSegment = this.segments[this.segments.length - 1];

    // Create a new segment. Initially, it will be positioned exactly
    // like the last segment. The exact position will be adjusted
    // based on the snake's current direction.
    const newSegment = { x: lastSegment.x, y: lastSegment.y };

    // Depending on the direction, adjust the position of the new segment
    if (this.segments.length > 1) {
      const secondLastSegment = this.segments[this.segments.length - 2];
      if (secondLastSegment.x === lastSegment.x) {
        // Moving vertically
        newSegment.y +=
          lastSegment.y > secondLastSegment.y ? this.size : -this.size;
      } else {
        // Moving horizontally
        newSegment.x +=
          lastSegment.x > secondLastSegment.x ? this.size : -this.size;
      }
    }

    // Add the new segment to the snake's body
    this.segments.push(newSegment);
  }
}

export default Snake; // export to the gameboard.ts
