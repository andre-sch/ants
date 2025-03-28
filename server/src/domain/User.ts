import { Point } from "./Point";
import { randomUUID } from "crypto";

class User {
  public id: string;
  constructor(public position: Point) {
    this.id = randomUUID();
  }
}

export { User };
