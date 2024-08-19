const socket = io("http://localhost:4000")

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("input")
    const send = document.getElementById("send")
    const msg = document.getElementById("msg")

    send.addEventListener("click", () => {
        const message = input.value.trim()
        if (message) {
            socket.emit("OnClientSendMessage", message)
            input.value = ""
        }
    })

    socket.on("RecordsCheck", (data) => {
        if (data.length === 0)
        {
            const newMsg = msg.cloneNode(true)
            newMsg.textContent = "[NO SERVER RECORDS CURRENTLY]"
            document.body.appendChild(newMsg)
        }
        else
        {
            data.forEach(element => {
                const sender = element.Sender
                const content = element.Content
                const newMsg = msg.cloneNode(true)
                newMsg.textContent = sender + ": " + content
                document.body.appendChild(newMsg)
            });
        }
    })

    socket.on("OnServerCommandMessage", (data) => {
        const sender = data.Sender
        const content = data.Content
    
        const newMsg = msg.cloneNode(true)
        if (sender == socket.id)
        {
            newMsg.textContent = "You: " + content
        }
        else
        {
            newMsg.textContent = sender + ": " + content
        }
        document.body.appendChild(newMsg)
    })
})