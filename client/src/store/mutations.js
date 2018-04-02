import store from "./index";

// import req from '../service/fetch';

const mutations = {
    toggleUserBox(state) {
        state.showUser = !state.showUser;
    },
    // 添加用户
    addUser(state, users) {
        users.forEach(user => {
            if (!state.users.find(e => e.id === user.id)) {
                // state.users = [...state.users, user];
                state.users.push(user);
            };
        })
        return state.users;
    },
    // 删除用户
    deleteUser(state, user) {
        let index = state.users.find(e => e.id === user.id)
        if (index >= 0) {
            state.users = [...state.users.slice(0, index), ...state.users.slice(index + 1, state.users.length)];
        }

        return state.users;
    },
    // 找到用户
    findUser(state, id) {
        let user = state.users.find(e => e.id === id);
        return Promise.resolve(user);
    },
    // 发消息
    // sendMessage(state, roomId, txt) {
    //     let body = {
    //         // isRead: true,
    //         roomId,
    //         message: txt,
    //         sender: state.self
    //     };
    //     this.getMessage(state, Object.assign({}, body, {isRead: true}))

    //     return req.sendMessage(body);
    // },

    // 收到消息
    getMessage(state, data) {
        let msgId = state.messages.length;
        let self = store.getters.self;

        state.messages.push(Object.assign({
            id: state.messages.length,
            isRead: false,
        }, data))


        let users;
        if (self.id === data.sender) {
            users = [data.getter, data.sender];
        } else {
            users = [data.sender, data.getter];
        }
        let room = state.rooms.find(e => {
            return e.users.join(",") === users.join(",");
        })

        if (!room) {
            console.log(`活动中的房间:`, store.getters.activeRoom)
            room = mutations.addRoom(
                state,
                self.id === data.sender ? data.getter : data.sender,
                !store.getters.activeRoom,
            );
        }

        

        room.messages.push(msgId);

        return state.messages;
    },
    // 读消息
    readMessage(state, roomId) {
        let room = state.rooms.find(e => e.id === roomId);
        
        state.messages.forEach(e => {
            let index = room.findIndex(msg => msg.id === e.id);
            if (index >= 0) {
                state.messages = [
                    ...state.messages.slice(0, index),
                    Object.assign({}, state.messages[index], {isRead: true}),
                    ...state.messages.slice(index + 1, state.messages.length),
                ]
            }
        });
        return state.messages;
    },
    // 添加房间
    addRoom(state, userId, isChatting = true) {
        let users = [userId, store.getters.self.id];
        if (!state.rooms.find(e => e.users.join(",") === users.join(","))) {
            let room = {
                id: state.rooms.length,
                isChatting: isChatting,
                users: users,
                messages: [],
            };
            if (isChatting) {
                state.rooms.forEach(e => {
                    e.isChatting = false
                })
            }
            state.rooms.push(room);
            
            return room;
        } else {
            return null;
        }
    },
    // 删除房间
    deleteRoom(state, roomId) {
        // let index = state.room[roomId]
        if (roomId in state.rooms) {
            delete state.rooms[roomId];
            let index = state.rooms.findIndex(e => e.id == roomId);
            if (index >= 0) {
                state.rooms.splice(index, 1);
            }
        }
    },
    // 获取房间
    getRoom(state, userId) {
        let users = [userId, store.getters.self.id];
        state.rooms.forEach(e => {
            e.isChatting = false
        })

        let room = state.rooms.find(e => {
            // return e.users.find(user => user == userId) 
            return e.users.join(",") === users.join(",");
        })
        if (room) {
            room.isChatting = true;
        }
        return room;
    }
}

export default mutations;