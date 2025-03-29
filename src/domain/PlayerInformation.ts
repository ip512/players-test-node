export class PlayerInformation {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly shortname: string,
        public readonly country: Country,
        public readonly picture: string,
        public readonly sex: SexEnum,
        public readonly rank: number,
        public readonly points: number,
        public readonly weight: number,
        public readonly height: number,
        public readonly age: number
) {}
}

interface Country {
    picture: string;
    code: string;
}

export enum SexEnum {
    Male = 'M',
    Female = 'F'
};