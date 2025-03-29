import { Player } from '../domain/Players.js';
import { PlayersRepositoryInterface } from '../domain/PlayersRepositoryinterface.js';
import { PlayersRepository } from '../infra/Persistence/PlayersRepository.js';

export class PlayersListAction {
    playersRepository: PlayersRepositoryInterface;

    constructor() {
        this.playersRepository = new PlayersRepository();
    }

    /**
     * Get players list sorted by rank
     */
    getPlayersList(): Player[]
    {
        return this.playersRepository.findPlayersSortedByRank();
    }
}