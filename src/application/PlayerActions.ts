import { PlayerInformation } from '../domain/PlayerInformation.js';
import { PlayersRepositoryInterface } from '../domain/PlayersRepositoryinterface.js';

export class PlayerActions {
    constructor(
        private readonly playersRepository: PlayersRepositoryInterface
    ) {
    }

    public getPlayerInformation(id: number): PlayerInformation
    {
        return this.playersRepository.findById(id);
    }
}