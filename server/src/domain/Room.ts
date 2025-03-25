import { Grid } from "./Grid";
import { Player } from "./Player";

class Room {
  constructor(
    public grid: Grid,
    public players: Player[] = []
  ) {}

  public new_player(): Player {
    const random_x = Math.floor(Math.random() * this.grid.rows);
    const random_y = Math.floor(Math.random() * this.grid.columns);
    const player = new Player([random_x, random_y]);
    this.players.push(player);
    return player;
  }
}

export { Room };
