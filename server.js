const express = require("express")
const app = express()
app.use(express.static("public"))
const expressServer = app.listen(4000)

const socketio = require("socket.io")
const io = socketio(expressServer, {
    
})

let connectedClients = 0
let records = []

io.on("connect", (socket) => {
    connectedClients++
    
    socket.on("disconnect", () => {
        connectedClients--
        if (connectedClients === 0)
        {
            records = []
        }
    })

    socket.emit("RecordsCheck", records)

    socket.on("OnClientSendMessage", (data) => {
        records.push({Sender: socket.id, Content: data})
        io.emit("OnServerCommandMessage", {Sender: socket.id, Content: data})
    })
})