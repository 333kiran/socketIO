const express = require('express');
const app = express();
const path = require('path');

const http = require('http').Server(app);
const PORT = process.env.PORT || 8080;

//attached http server to the socket.io
const io = require('socket.io')(http);

//route
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'src/index.html'));
})

//create a new connection 
io.on('connection',socket =>{
    console.log('a user connected');

    socket.on('disconnect',() => {
        console.log('user disconnected');
    })

    socket.on("message",msg=>{
        console.log("client message:" + msg)
    })

    //emit event
    socket.emit("server" ,"Receive from server")
    socket.emit("server1" ,"Receive from server1")
    socket.emit("server2" ,"Receive from server2")
})


http.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`);
})
