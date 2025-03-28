import { Point } from "./Point";

class PathGenerator {
  public generate(start: Point, end: Point): Point[] {
    const path: Point[] = [];
    
    const cp1 = this.controlPoint(start, end);
    const cp2 = this.controlPoint(start, end);
    
    const numberOfPoints = 5 + 0.75 * this.distance(start, end);
    for (let i = 0; i < numberOfPoints; i++) {
      const t = i / (numberOfPoints - 1);
      path.push(this.cubicBezier(start, cp1, cp2, end, t));
    }

    return path;
  }

  private controlPoint(p0: Point, p1: Point): Point {
    const [x0, y0] = p0;
    const [x1, y1] = p1;

    const cx = this.randomInt(Math.min(x0, x1), Math.max(x0, x1));
    const cy = this.randomInt(Math.min(y0, y1), Math.max(y0, y1));

    return [cx, cy];
  }
  
  private cubicBezier(p0: Point, p1: Point, p2: Point, p3: Point, t: number): Point {
    const a = this.linearInterpolation(p0, p1, t);
    const b = this.linearInterpolation(p1, p2, t);
    const c = this.linearInterpolation(p2, p3, t);
    const d = this.linearInterpolation(a, b, t);
    const e = this.linearInterpolation(b, c, t);
    return this.linearInterpolation(d, e, t);
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private linearInterpolation(p0: Point, p1: Point, t: number): Point {
    return [p0[0] * (1 - t) + p1[0] * t, p0[1] * (1 - t) + p1[1] * t];
  }

  private distance(p0: Point, p1: Point) {
    return Math.sqrt((p1[0] - p0[0]) ** 2 + (p1[1] - p0[1]) ** 2);
  }
}

const pathGenerator = new PathGenerator();
export { pathGenerator };
