import { describe, expect, test } from "@jest/globals";
import {
  PlayerInformation,
  SexEnum,
} from "../../../src/domain/PlayerInformation.js";
import { Country } from "../../../src/domain/Country.js";
import { Imc } from "../../../src/domain/service/Imc.js";

describe("Imc", () => {
  const createPlayerInformations = (
    sourceData: { weight: number; height: number }[]
  ): PlayerInformation[] =>
    sourceData.map(({ weight, height }) => {
      return new PlayerInformation(
        "John",
        "Doe",
        "JD",
        new Country("country_picture_url", "FR"),
        "picture_url",
        SexEnum.Male,
        3,
        123,
        weight,
        height,
        42,
        []
      );
    });

  test("Calculate IMC", () => {
    const playerInformations = createPlayerInformations([
      { weight: 80000, height: 160 },
      { weight: 75000, height: 180 },
    ]);

    const imc = new Imc();

    const result = imc.getPlayersAverageImc(playerInformations);

    expect(result).toEqual(27.19907407407407);
  });
});
