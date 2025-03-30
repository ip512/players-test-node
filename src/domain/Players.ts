import { Country } from './Country.js';

export class Player {
    constructor(
        public readonly id: number,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly country: Country,
        public readonly rank: number,
        public readonly points: number
    ) {}
}
