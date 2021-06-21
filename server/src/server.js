import express from 'express'
import enableWs from 'express-ws'
import path from 'path'
import { getDirname } from './util/getDirname.js'

import { GameManager } from './game.js'
import { getWordList, getWordsWithTypes } from './actions.js'
import WebSocket from 'ws'

const PORT = process.env.PORT || 3001

const expressWs = enableWs(express())
const app = expressWs.app


const gameManager = new GameManager()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(getDirname(), '../../client/build')))

// WEBSOCKETS

// @ts-ignore
app.ws('/game', (ws, req) => {
    ws.on('message', (res) => {
        // res comes through as a string, but the linter thinks it's an object.
        // toString fixes the linter error.
        const data = JSON.parse(res.toString())
        try {
            gameManager.joinGame(data.gameId, data.player)
        } catch (e) {
            ws.close(1011, e)
        }
    })
})

// REST

app.post('/api/player/join', (req, res, next) => {
    const data = req.body
    try {
        gameManager.joinGame(data.gameId, data.player)
        res.sendStatus(200)
    } catch (e) {
        res.sendStatus(500)
    }
})

app.get('/api/game/make', (req, res) => {
    const gameState = gameManager.makeGame()
    res.send(gameState)
})

app.get('/api/game/list', (req, res) => {
    res.send(gameManager.games)
})

// gets a board of random words in the form of an array
app.get('/api/get/words', (req, res) => {
    res.send(getWordsWithTypes());
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(getDirname(), '../../client/build', 'index.html'))
})

app.listen(PORT, () => console.log('Listening on', PORT))