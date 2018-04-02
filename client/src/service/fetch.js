import io from 'socket.io-client';

import {getMessage, addUser, getUser, sendMessage, userExist} from "../../../actions";

// import store from '../store/index';

const BASE_URL = `http://localhost:3500`;

let socket = new Promise((res, rej) => {
    let theSocket = io(BASE_URL);
    res(theSocket);
});

function request(url, options = {}) {
    let reqOpt = Object.assign({
        method: 'GET',
        mode: 'cors',
        cache: 'default',
    }, options);
    return fetch(`${BASE_URL}/${url}`, reqOpt).then((e) => e, (e) => {
        return e;
    })
}

const requests = {
    // 添加自己
    // addSelf(name) {
    //     return socket.then((scoket) => {
    //         socket.emit(addSelf, name);
    //     })
    // },
    userExist(cb) {
        return socket.then((s) => {
            s.on(userExist, cb);
        })
    },
    // 添加用户, 基本只能添加自己
    addUser(name) {
        return socket.then((s) => {
            // console.log(name, s);
            s.emit(addUser, name);
        })
    },
    // 发送消息发送用户
    getUser(cb) {
        // return request(`user/${id}`);
        return socket.then((s) => {
            s.on(getUser, cb)
        })
    },
    // 发送消息
    sendMessage(body) {
        return socket.then((s) => {
            s.emit(sendMessage, body);
        })
    },
    // 接收消息
    getMessage(cb) {
        // return new io(BASE_URL);
        return socket.then((s) => {
            s.on(getMessage, cb);
        })
    }
}

export default requests;