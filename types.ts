export interface Coordinate {
  x: number;
  y: number;
}

export interface LedPoint {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  alpha: number;
  targetAlpha: number;
}

export interface MouseState {
  x: number;
  y: number;
  isHovering: boolean;
}