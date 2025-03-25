import { Point } from "./Point";
import { randomUUID } from "crypto";

class Player {
  public id: string = randomUUID();
  constructor(public position: Point) {}
}

export { Player };
