const express = require('express');
const http = require('http');
const io = require('socket.io')

const PORT = process.env.PORT || 3500;

app = express()
const httpServer = http.createServer(app)

httpServer.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`)
	console.log(`http://localhost:${PORT}`)
})

const ioServer = new io.Server(httpServer, {
	cors: {
		origin: ["http://localhost:5500", "http://127.0.0.1:5500"],
		methods: ["GET", "POST"]
	}
})

ioServer.on('connection', socket => {
	console.log(`User ${socket.id} connected`)

	socket.on('message', data => {
		console.log(data)
		ioServer.emit('message', `${socket.id.substring(0, 7)}: ${data}`)
	})
})