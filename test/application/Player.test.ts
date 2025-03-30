import { describe, expect, jest, test } from '@jest/globals';
import { PlayersRepositoryInterface } from '../../src/domain/PlayersRepositoryinterface.js';
import { PlayerInformation, SexEnum } from '../../src/domain/PlayerInformation.js';
import { Country } from '../../src/domain/Country.js';
import { Player } from '../../src/domain/Players.js';
import { PlayerActions } from '../../src/application/PlayerActions.js';

describe('PlayerAction', () => {
  test('Return player information', () => {
    const expectedPlayer = new PlayerInformation(
      'John',
      'Doe',
      'JD',
      new Country('country_picture_url', 'FR'),
      'picture_url',
      SexEnum.Male,
      3,
      123,
      80000,
      180,
      42,
      []
    );

    const playerRepositoryMock: PlayersRepositoryInterface = {
      findPlayersSortedByRank: jest.fn<() => Player[]>(),
      findById: jest.fn<() => PlayerInformation>().mockReturnValue(expectedPlayer),
      findPlayersInformation: jest.fn<() => PlayerInformation[]>()
    };
    const playerAction = new PlayerActions(playerRepositoryMock);

    const result = playerAction.getPlayerInformation(1);

    expect(result).toEqual(expectedPlayer);
    expect(playerRepositoryMock.findById).toHaveBeenCalledWith(1);
  })
});