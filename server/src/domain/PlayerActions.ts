import { Player } from "./Player";

type Dictionary<T> = Record<string, T | undefined>;
type Action = (player: Player) => void;

const PlayerActions: Dictionary<Action> = {
  ArrowUp(player: Player) { player.position[1] += 1; },
  ArrowDown(player: Player) { player.position[1] -= 1; },
  ArrowLeft(player: Player) { player.position[0] -= 1; },
  ArrowRight(player: Player) { player.position[0] += 1; },
  w(player: Player) { player.position[1] += 1; },
  s(player: Player) { player.position[1] -= 1; },
  a(player: Player) { player.position[0] -= 1; },
  d(player: Player) { player.position[0] += 1; }
}

export { PlayerActions };
