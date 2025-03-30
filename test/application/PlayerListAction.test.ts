import { describe, expect, jest, test } from '@jest/globals';
import { PlayerListAction } from '../../src/application/PlayerListAction.js';
import { PlayersRepositoryInterface } from '../../src/domain/PlayersRepositoryinterface.js';
import { Player } from '../../src/domain/Players.js';
import { PlayerInformation } from '../../src/domain/PlayerInformation.js';
import { Country } from '../../src/domain/Country.js';

describe('PlayerListAction', () => {
  test('Return players list', () => {
    const expectedPlayerList = [new Player(
      1,
      'John',
      'Doe',
      new Country('country_picture_url', 'FR'),
      3,
      12
    )];

    const playerRepositoryMock: PlayersRepositoryInterface = {
      findPlayersSortedByRank: jest.fn<() => Player[]>().mockReturnValue(expectedPlayerList),
      findById: jest.fn<() => PlayerInformation>(),
      findPlayersInformation: jest.fn<() => PlayerInformation[]>()
    };
    const playersListAction = new PlayerListAction(playerRepositoryMock);

    const result = playersListAction.getPlayerList();

    expect(result).toEqual(expectedPlayerList);
    expect(playerRepositoryMock.findPlayersSortedByRank).toHaveBeenCalled();
  })
});