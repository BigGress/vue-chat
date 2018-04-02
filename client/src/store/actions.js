import req from '../service/fetch';
import { addSelf } from '../../../actions';

const actions = {
    toggleMenu(context) {
        return context.commit('toggleUserBox');
    },
    setUser(context, users) {
        // console.log(users);
        return context.commit('addUser', users);
    },
    addUser(context, ...args) {
        return req.addUser(args[0])
    },
    deleteUser(context, ...args) {
        context.commit('deleteUser', ...args);
    },
    findUser(context, ...args) {
        let user = context.commit('findUser', ...args);
        // return context.commit('findUser', ...args)
        if (user) {
            return user;
        } else {
            return req.getUser(args[0]).then((data) => {
                context.commit('addUser', data);
                return data;
            })
        }
    },
    sendMessage(context, ...args) {
        return req.sendMessage(args[0])
    },
    getMessage(context, ...args) {
        // console.log(args);
        return context.commit('getMessage', ...args);
    },
    readMessage(context, ...args) {
        return context.commit('readMessage', ...args);
    },
    // 添加房间
    addRoom(context, userId) {
        return context.commit('addRoom', userId);
    },
    // 删除房间
    deleteRoom(context, roomId) {
        return context.commit('deleteRoom', roomId);
    },
    // 获取房间
    getRoom(context, userId) {
        return context.commit('getRoom', userId);
    }
}

export default actions;