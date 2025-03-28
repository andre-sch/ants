type Point = [x: number, y: number];

function distance(a: Point, b: Point) {
  return Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
}

export {
  Point,
  distance
};
