import { distance, Point } from "./Point";

class PathGenerator {
  public generate(start: Point, end: Point): Point[] {
    // generate a bezier curve between start and end points
    const curve: Point[] = [];
    const controlPoint = this.controlPoint(start, end);
    const numberOfSamples = 100 + Math.floor(0.5 * distance(start, end));

    for (let i = 0; i < numberOfSamples; i++) {
      const t = i / (numberOfSamples - 1);
      curve.push(this.bezier(start, controlPoint, end, t));
    }

    // evenly distribute the points along the curve
    const arcLengths: number[] = [0];
    for (let i = 1; i < numberOfSamples; i++) {
      arcLengths.push(
        arcLengths[i - 1] +
        distance(curve[i - 1], curve[i])
      );
    }

    const path: Point[] = [start];

    let step = 1;
    for (let i = 1; i < numberOfSamples; i++) {
      if (arcLengths[i] < step) continue;
      path.push(curve[i-1]);
      step++;
    }

    path.push(end);
    return path;
  }

  private controlPoint(p0: Point, p1: Point): Point {
    const [x0, y0] = p0;
    const [x1, y1] = p1;

    const cx = this.randomInt(Math.min(x0, x1), Math.max(x0, x1));
    const cy = this.randomInt(Math.min(y0, y1), Math.max(y0, y1));

    return [cx, cy];
  }
  
  private bezier(p0: Point, p1: Point, p2: Point, t: number): Point {
    const a = this.linearInterpolation(p0, p1, t);
    const b = this.linearInterpolation(p1, p2, t);
    return this.linearInterpolation(a, b, t);
  }

  private randomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private linearInterpolation(p0: Point, p1: Point, t: number): Point {
    return [p0[0] * (1 - t) + p1[0] * t, p0[1] * (1 - t) + p1[1] * t];
  }
}

const pathGenerator = new PathGenerator();
export { pathGenerator };
