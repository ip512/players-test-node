import { PlayerNotFound } from '../../domain/Exception/PlayerNotFound.js';
import { Player } from '../../domain/Players.js';
import { PlayerInformation, SexEnum } from '../../domain/PlayerInformation.js';
import { PlayersRepositoryInterface } from '../../domain/PlayersRepositoryinterface.js';
import database from "./headtohead.json" with { type: "json" };

export class PlayersRepository implements PlayersRepositoryInterface {
  findPlayersSortedByRank(): Player[] {
    const sortedPlayers = database.players.sort((a, b): number => a.data.rank - b.data.rank);

    return sortedPlayers.map((row): Player => new Player(
      row.id,
      row.firstname,
      row.lastname,
      row.country,
      row.data.rank,
      row.data.points
    ));
  }

  findById(id: number): PlayerInformation {
    const foundPlayer = database.players.find((player) => player.id === id);

    if (foundPlayer === undefined) {
      throw new PlayerNotFound();
    }

    return new PlayerInformation(
      foundPlayer.firstname,
      foundPlayer.lastname,
      foundPlayer.shortname,
      foundPlayer.country,
      foundPlayer.picture,
      foundPlayer.sex as SexEnum,
      foundPlayer.data.rank,
      foundPlayer.data.points,
      foundPlayer.data.weight,
      foundPlayer.data.height,
      foundPlayer.data.age
    );
  }
}
