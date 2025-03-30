import { describe, expect, jest, test } from '@jest/globals';
import { PlayersRepositoryInterface } from '../../src/domain/PlayersRepositoryinterface.js';
import { Player } from '../../src/domain/Players.js';
import { PlayerInformation, SexEnum } from '../../src/domain/PlayerInformation.js';
import { Country } from '../../src/domain/Country.js';
import { StatisticsAction } from '../../src/application/StatisticsAction.js';
import { MatchesRatio } from '../../src/domain/service/MatchesRatio.js';
import { Imc } from '../../src/domain/service/Imc.js';
import { Median } from '../../src/domain/service/Median.js';
import { Statistics } from '../../src/domain/Statistics.js';

describe('PlayerListAction', () => {
  test('Return players list', () => {
    const country = new Country('country_picture_url', 'FR');
    const expectedPlayerList = [new PlayerInformation(
      'John',
      'Doe',
      'JD',
      country,
      'picture_url',
      SexEnum.Male,
      3,
      12,
      80000,
      180,
      33,
      [1]
    )];

    const playerRepositoryMock: PlayersRepositoryInterface = {
      findPlayersSortedByRank: jest.fn<() => Player[]>(),
      findById: jest.fn<() => PlayerInformation>(),
      findPlayersInformation: jest.fn<() => PlayerInformation[]>().mockReturnValue(expectedPlayerList)
    };
    const imcService = new Imc();
    const matchesRatioService = new MatchesRatio();
    const medianService = new Median();
    const statisticsAction = new StatisticsAction(playerRepositoryMock, imcService, matchesRatioService, medianService);

    const expectedStatistics = new Statistics(country, 24.691358024691358, 180);

    const result = statisticsAction.getStatistics();

    expect(result).toEqual(expectedStatistics);
    expect(playerRepositoryMock.findPlayersInformation).toHaveBeenCalled();
  })
});