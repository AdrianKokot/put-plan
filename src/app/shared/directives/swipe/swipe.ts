export interface SwipeCoordinates {
  x: number;
  y: number;
}

export interface SwipeVector {
  x: number;
  y: number;
  start: SwipeCoordinates,
  end: SwipeCoordinates
}

export type SwipeAxis = 'x' | 'y';

export type SwipeDirection = 'down' | 'up' | 'left' | 'right';

export class SwipeEvent {
  public direction: SwipeDirection;
  public distance: number;
  public delta: number;

  constructor(
    vector: SwipeVector,
    public axis: SwipeAxis
  ) {
    this.direction = axis === 'y' ? (vector.y < 0 ? 'down' : 'up') : (vector.x < 0 ? 'right' : 'left');
    this.distance = Math.abs(vector[axis]);
    this.delta = vector[axis];
  }

}

export class Swipe {

  public static getCoordinatesFromTouchEvent(touchEvent: TouchEvent): SwipeCoordinates {
    return {
      x: touchEvent.changedTouches[0].clientX,
      y: touchEvent.changedTouches[0].clientY
    };
  }

  public static getSwipeVector(startCoordinates: SwipeCoordinates, endCoordinates: SwipeCoordinates): SwipeVector {
    return {
      x: startCoordinates.x - endCoordinates.x,
      y: startCoordinates.y - endCoordinates.y,
      start: startCoordinates,
      end: endCoordinates
    };
  }

}
