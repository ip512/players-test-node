import { PlayerMeasures } from '../PlayerInformation.js';

export class Imc {
    public getPlayersAverageImc(players: PlayerMeasures[]): number
    {
        const imcList = players.map((player) => this.caculate(player.weight, player.height));

        return imcList.reduce((sum, imc) => sum + imc) / imcList.length;
    }

    /**
     * @param weight in grams
     * @param height in centimeters
     */
    private caculate(weight: number, height: number): number
    {
        const heightInMeters = height / 100;

        return weight / 1000 / (heightInMeters * heightInMeters);
    }
}
