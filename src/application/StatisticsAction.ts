import { PlayersRepositoryInterface } from '../domain/PlayersRepositoryinterface.js';
import { Imc } from '../domain/service/Imc.js';
import { MatchesRatio } from '../domain/service/MatchesRatio.js';
import { Median } from '../domain/service/Median.js';
import { Statistics } from '../domain/Statistics.js';

export class StatisticsAction {
    constructor (
        private readonly playersRepository: PlayersRepositoryInterface,
        private readonly imcService: Imc,
        private readonly matchesRatioService: MatchesRatio,
        private readonly medianService: Median
    ) {}

    public getStatistics(): Statistics
    {
        const players = this.playersRepository.findPlayersInformation();

        return new Statistics(
            this.matchesRatioService.getMatchesRatioTopCountry(players),
            this.imcService.getPlayersAverageImc(players),
            this.medianService.getPlayersHeightMedian(players)
        )
    }
}