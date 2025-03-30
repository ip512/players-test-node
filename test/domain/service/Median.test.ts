import { describe, expect, test } from "@jest/globals";
import {
  PlayerInformation,
  SexEnum,
} from "../../../src/domain/PlayerInformation.js";
import { Country } from "../../../src/domain/Country.js";
import { Median } from '../../../src/domain/service/Median.js';
import { EmptyArray } from '../../../src/domain/exception/EmptyArray.js';

describe("Median", () => {
  const createPlayerInformations = (heights: number[]): PlayerInformation[] =>
    heights.map((height) => {
      return new PlayerInformation(
        "John",
        "Doe",
        "JD",
        new Country("country_picture_url", "fr"),
        "picture_url",
        SexEnum.Male,
        3,
        123,
        78000,
        height,
        42,
        []
      );
    });

  test("Find median for odd list", () => {
    const playerInformations = createPlayerInformations([160, 180, 170]);

    const median = new Median();

    const result = median.getPlayersHeightMedian(playerInformations);

    expect(result).toEqual(170);
  });

  test("Find median for even list", () => {
    const playerInformations = createPlayerInformations([180, 160]);

    const median = new Median();

    const result = median.getPlayersHeightMedian(playerInformations);

    expect(result).toEqual(170);
  });

  test("Throw exception if data source is empty", () => {
    const median = new Median();

    expect(() => {
      median.getPlayersHeightMedian([]);
    }).toThrow(EmptyArray);
  });
});
