import { Player } from '../domain/Players.js';
import { PlayersRepositoryInterface } from '../domain/PlayersRepositoryinterface.js';

export class PlayerListAction {
    constructor(
        private readonly playersRepository: PlayersRepositoryInterface
    ) {
    }

    /**
     * Get players list sorted by rank
     */
    public getPlayerList(): Player[]
    {
        return this.playersRepository.findPlayersSortedByRank();
    }
}