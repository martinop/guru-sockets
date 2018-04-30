import express from 'express'
import http from 'http'
import logger from 'morgan'
import socketIO from 'socket.io'
import initEvents from './events'


const PORT = process.env.PORT || 58954
const app = express()

app.use(logger('dev'))  
app.set('port', PORT)

const server = http.createServer(app)
const io = socketIO(server, {
    handlePreflightRequest: (req, res) => {
      const headers = {
        'Access-Control-Allow-Origin': '*',
      }
      res.writeHead(200, headers)
      res.end()
    }
})

initEvents(io)

server.listen(PORT, () => console.log(`Running on PORT ${PORT}`))