import { PlayerInformation } from './PlayerInformation.js';
import { Player } from './Players.js';

export interface PlayersRepositoryInterface {
    /**
     * Find all players
     */
    findPlayersSortedByRank(): Player[];

    /**
     * Find a player by ID
     */
    findById(id: number): PlayerInformation;
}
