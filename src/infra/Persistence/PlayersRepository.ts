import { PlayerNotFound } from '../../domain/exception/PlayerNotFound.js';
import { Player } from '../../domain/Players.js';
import { PlayerInformation, SexEnum } from '../../domain/PlayerInformation.js';
import { PlayersRepositoryInterface } from '../../domain/PlayersRepositoryinterface.js';
import database from "./headtohead.json" with { type: "json" };

export class PlayersRepository implements PlayersRepositoryInterface {
  public findPlayersSortedByRank(): Player[] {
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

  public findById(id: number): PlayerInformation {
    const foundPlayer = database.players.find((player) => player.id === id);

    if (foundPlayer === undefined) {
      throw new PlayerNotFound();
    }

    return this.buildPlayerInformation(foundPlayer);
  }

  public findPlayersInformation(): PlayerInformation[] {
    return database.players.map((playerData) => this.buildPlayerInformation(playerData));
  }

  private buildPlayerInformation(playerData: any): PlayerInformation
  {
    return new PlayerInformation(
      playerData.firstname,
      playerData.lastname,
      playerData.shortname,
      playerData.country,
      playerData.picture,
      playerData.sex as SexEnum,
      playerData.data.rank,
      playerData.data.points,
      playerData.data.weight,
      playerData.data.height,
      playerData.data.age,
      playerData.data.last
    );
  }
}
