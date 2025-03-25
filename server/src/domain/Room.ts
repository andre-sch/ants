import { Grid } from "./Grid";
import { Player } from "./Player";

class Room {
  constructor(
    public grid: Grid,
    public players: Player[] = []
  ) {}

  public newPlayer(): Player {
    const random_x = Math.floor(Math.random() * this.grid.rows);
    const random_y = Math.floor(Math.random() * this.grid.columns);
    const player = new Player([random_x, random_y]);
    this.players.push(player);
    return player;
  }

  public remove(player: Player) {
    this.players = this.players.filter(p => p != player);
  }
}

export { Room };
