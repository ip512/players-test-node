import { EmptyArray } from "../exception/EmptyArray.js";
import { PlayerHeightInterface } from "../PlayerInformation.js";

export class Median {
  public getPlayersHeightMedian(players: PlayerHeightInterface[]): number {
    if (players.length === 0) {
      throw new EmptyArray("Median can't be calculated from empty array");
    }

    const medianFloorIndex = Math.floor(players.length / 2);
    const sortedPlayers = players.sort((a, b) => a.height - b.height);

    if (players.length % 2 === 0) {
      return (
        (sortedPlayers[medianFloorIndex - 1].height + sortedPlayers[medianFloorIndex].height) /
        2
      );
    }

    return sortedPlayers[medianFloorIndex].height;
  }
}
