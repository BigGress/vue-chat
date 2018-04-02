import Koa from "koa";
import http from "http";
import socket from "socket.io";
import serve from "koa-static";
import { resolve } from "path";

import { getMessage, addUser, getUser, sendMessage, userExist } from "./actions";

const ERROR_MSGS = [{
    type: 4001,
    message: `用户已经存在`,
}]

const PORT = 3500;

const app = new Koa();
// 缓存用户数据
let users = [];

app.use(serve(resolve(__dirname, "./dist")));

const httpServer = http.Server(app.callback());
const io = socket(httpServer);

io.on("connection", function(socket) {

    socket.on(addUser, (name) => {
        let user = users.find(e => e.name === name);
        if (!user) {
            users.push({
                id: Date.now(),
                name,
                socket: socket,
            });
            users.forEach(user => {
                user.socket.emit(getUser, users.map(e => {
                    return Object.assign({}, e, { socket: undefined })
                }))
            })
        } else {
            socket.emit(userExist, ERROR_MSGS.find(e => e.type === 4001));
        }
    });

    socket.on(sendMessage, (data) => {
        let user = users.find(e => e.id === data.getter);
        user.socket.emit(getMessage, data);
    })
})

httpServer.listen(PORT);

console.log(`http://localhost:${PORT}`);