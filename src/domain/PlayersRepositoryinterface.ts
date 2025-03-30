import { PlayerInformation } from './PlayerInformation.js';
import { Player } from './Players.js';

export interface PlayersRepositoryInterface {
    findPlayersSortedByRank(): Player[];

    findById(id: number): PlayerInformation;

    findPlayersInformation(): PlayerInformation[];
}
