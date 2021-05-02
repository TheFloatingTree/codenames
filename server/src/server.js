import express from 'express'
import expressWs from 'express-ws'
import path from 'path'
import { getDirname } from './util/getDirname.js'

const PORT = process.env.PORT || 3001

const app = express()
expressWs(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(getDirname(), '../../client/build')))

app.get('/api/ping', (req, res) => {
    res.send("pong")
})

// All remaining requests return the React app, so it can handle routing.
app.get('*', (req, res) => {
    res.sendFile(path.resolve(getDirname(), '../../client/build', 'index.html'))
})

// app.ws('/', (ws, req) => {
//     ws.on('message', (msg) => {
//         console.log(JSON.parse(msg))
//     })
//     console.log('socket')
// })

app.listen(PORT, () => console.log('Listening on', PORT))