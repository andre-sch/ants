interface Game {
  room: {
    grid: Grid;
    players: Player[];
  };
  user: Player;
}

interface Grid {
  rows: number;
  columns: number;
}

interface Player {
  id: string;
  position: Point;
}

type Point = [number, number];

export type {
  Game,
  Player
};
