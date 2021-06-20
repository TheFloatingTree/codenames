import { nanoid } from "nanoid"
import { getWordsWithTypes } from "./actions"

export class GameState {
    constructor() {
        this.id = nanoid(12)
        this.words = getWordsWithTypes()
        this.players = []
    }

    join(player) {
        this.players.push(player)
    }
}

export class GameManager {
    constructor() {
        this.games = []
    }

    makeGame() {
        const gameState = new GameState()
        this.games.push(gameState)
        return gameState
    }

    joinGame(gameId, player) {
        const game = this.games.find(game => game.id === gameId)

        if (!game) throw new Error("Game does not exist")

        game.join(player)
    }
}