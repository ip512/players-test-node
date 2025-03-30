import { describe, expect, test } from "@jest/globals";
import {
  PlayerInformation,
  SexEnum,
} from "../../../src/domain/PlayerInformation.js";
import { Country } from "../../../src/domain/Country.js";
import { MatchesRatio } from "../../../src/domain/service/MatchesRatio.js";

describe("MatchesRatio", () => {
  const createPlayerInformations = (
    sourceData: { country: Country; last: number[] }[]
  ): PlayerInformation[] =>
    sourceData.map(({ country, last }) => {
      return new PlayerInformation(
        "John",
        "Doe",
        "JD",
        country,
        "picture_url",
        SexEnum.Male,
        3,
        123,
        180,
        78000,
        42,
        last
      );
    });

  test("Find country with best matches ratio (based on 'last' array)", () => {
    const playerInformations = createPlayerInformations([
      { country: new Country("country_picture_url", "FR"), last: [1, 0, 0] },
      { country: new Country("country_picture_url", "UK"), last: [1, 1, 0] },
    ]);

    const matchesRatio = new MatchesRatio();

    const result = matchesRatio.getMatchesRatioTopCountry(playerInformations);

    expect(result.code).toEqual("UK");
  });

  test("Throw exception if data source is empty", () => {
    const matchesRatio = new MatchesRatio();

    expect(() => {
      matchesRatio.getMatchesRatioTopCountry([]);
    }).toThrow(Error);
  });
});
