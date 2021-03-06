const app   = require('express')()
const http  = require('http').Server(app)
const io    = require('socket.io')(http)

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>')
})

io.on('connection', socket => {
  console.log('a user connected')

  socket.on('show movie', (id, uuid) => {
    socket.join(id)
    io.to(id).emit('danime joined', uuid)

    console.log('receive: ' + id + '/' + uuid)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

http.listen(3000, () => {
  console.log('listening on *:3000')
})