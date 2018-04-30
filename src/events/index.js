export default (io) => {
    io.on('connection', function(socket) {
        socket.on('join', (data) => {
            console.log(data)
        })

        socket.on('message', (data) => {
            console.log(data)
        })

        socket.on('disconnect', () => {
            console.log(`Disconnected: ${socket.id}`)
            Presence.remove(socket.id)
        })
    })
}