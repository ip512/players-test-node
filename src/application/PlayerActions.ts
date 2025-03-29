import { PlayerInformation } from '../domain/PlayerInformation.js';
import { Player } from '../domain/Players.js';
import { PlayersRepositoryInterface } from '../domain/PlayersRepositoryinterface.js';
import { PlayersRepository } from '../infra/Persistence/PlayersRepository.js';

export class PlayerActions {
    playersRepository: PlayersRepositoryInterface;

    constructor() {
        this.playersRepository = new PlayersRepository();
    }

    /**
     * Get player information
     */
    getPlayerInformation(id: number): PlayerInformation
    {
        return this.playersRepository.findById(id);
    }
}