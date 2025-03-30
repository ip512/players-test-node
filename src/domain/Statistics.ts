import { Country } from './Country.js';

export class Statistics {
    constructor (
        public readonly countryWithMostWonMatchesRatio: Country | undefined,
        public readonly averageImc: number,
        public readonly playersHeightMedian: number
    ) {}
}