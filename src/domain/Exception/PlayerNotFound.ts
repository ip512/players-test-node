export class PlayerNotFound extends Error {
    constructor(message: string = 'Player not found') {
        super(message);
    }
}