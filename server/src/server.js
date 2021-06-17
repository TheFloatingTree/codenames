import express from 'express'
import enableWs from 'express-ws'
import path from 'path'
import { getDirname } from './util/getDirname.js'
import words from '../words.json'

const PORT = process.env.PORT || 3001

const app = express()
enableWs(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(getDirname(), '../../client/build')))

app.ws('/echo', (ws, req) => {
    ws.on('message', (msg) => {
        console.log(msg)
        ws.send(msg)
    })
})

app.get('/api/ping', (req, res) => {
    res.send("pong")
})

// gets a board of random words in the form of an array
app.get('/api/get/words', (req, res) => {
    let wordlist = [...words.classic_words];
    let clientWords = [];
    const NUM_TILES = 25;

    // fill array with words from words JSON
    for (let i = 0; i < NUM_TILES; i++) {
        let randomNum = Math.floor(Math.random() * wordlist.length);
        clientWords.push(wordlist.splice(randomNum, 1)[0]);
    }

    res.send(clientWords);
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(getDirname(), '../../client/build', 'index.html'))
})

app.listen(PORT, () => console.log('Listening on', PORT))