import { Country } from "./Country.js";

export class PlayerInformation implements PlayerMeasures, PlayerResults {
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
    public readonly age: number,
    public readonly last: number[]
  ) {}
}

export enum SexEnum {
  Male = "M",
  Female = "F",
}

export interface PlayerHeightInterface {
  height: number;
}
export interface PlayerMeasures extends PlayerHeightInterface {
  weight: number;
}

export interface PlayerResults {
  country: Country;
  last: number[];
}
