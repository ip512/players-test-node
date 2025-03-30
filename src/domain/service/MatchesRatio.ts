import { Country } from "../Country.js";
import { PlayerResults } from "../PlayerInformation.js";

export class MatchesRatio {

  public getMatchesRatioTopCountry(players: PlayerResults[]): Country {
    const { resultsAggregatedByCountry, countriesMap } = this.aggregateResults(players);

    return this.getTopCountry(resultsAggregatedByCountry, countriesMap);
  }

  private aggregateResults(players: PlayerResults[]) {
    let resultsAggregatedByCountry: Map<string, number[]> = new Map();
    let countriesMap: Map<string, Country> = new Map();

    for (const player of players) {
      const results = resultsAggregatedByCountry.get(player.country.code);

      if (results === undefined) {
        resultsAggregatedByCountry.set(player.country.code, player.last);
        countriesMap.set(player.country.code, player.country);
      } else {
        resultsAggregatedByCountry.set(
          player.country.code,
          results.concat(player.last)
        );
      }
    }

    return {
      resultsAggregatedByCountry,
      countriesMap,
    };
  }

  private getTopCountry(
    resultsAggregatedByCountry: Map<string, number[]>,
    countriesMap: Map<string, Country>
  ): Country {
    let topCountryCode: string | undefined;
    let topCountryRatio: number = 0;

    for (const [countryCode, countryResults] of resultsAggregatedByCountry) {
      if (countryResults === undefined) {
        throw new Error(`Unable to get results for ${countryCode}`);
      }

      const countryResultsRatio = countryResults.reduce((sum, result) => sum + result) / countryResults.length;

      if (topCountryRatio < countryResultsRatio) {
        topCountryRatio = countryResultsRatio;
        topCountryCode = countryCode;
      }
    }

    const topCountry = topCountryCode !== undefined && countriesMap.get(topCountryCode);
    if (!topCountry) {
      throw new Error(`Unable to get country for ${topCountryCode}`);
    }

    return topCountry;
  }
}
