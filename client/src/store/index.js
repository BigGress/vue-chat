import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import actions from './actions';
import req from "../service/fetch";

import {getMessage} from "../../../actions";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters: {
        self: (state) => {
            let self = state.users.find(e => e.isSelf);
            console.log(`自己: `, self);
            return self;
        },
        users: (state) => state.users,
        activeRoom: (state) => {
            return state.rooms.find(e => e.isChatting);
        },
        rooms: (state) => state.rooms,
    },
    strict: false,
})

req.getMessage((data) => {
    console.log(`信息`, data);
    store.dispatch('getMessage', data);
})

req.getUser((data) => {
    let selfName = localStorage.getItem('name');
    data.forEach(e => {
        if (e.name === selfName) {
            e.isSelf = true;
        }
    });

    store.dispatch('setUser', data);
})

req.userExist((data) => {
    window.alert(`用户已经存在`);
})

export default store;