import request from 'request-promise'

export default (io) => {
    io.on('connection', (socket) => {
        socket.on('join', (data) => {
            const { id_subject } = JSON.parse(data)
            socket.join(id_subject)
        })

        socket.on('message', (data) => {
            const { id_subject, username, id_user, message } = JSON.parse(data)
            io.in(id_subject).emit('message', { message, username, id_user: id_user.toString() })
            request('http://localhost:59954/messages', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    message, id_subject, id_user
                })
            })
            .then(data => console.log(data))
            .catch(err => console.log(err))
        })

        socket.on('disconnect', () => {
            console.log(`Disconnected: ${socket.id}`)
        })
    })
}