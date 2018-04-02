<template>
  <div id="app">
    <Login v-if="!user"/>
    <div v-else class="main">
      <!-- 用户 -->
      <Users />
      <div class="message-room">
        <header class="chatter-header">
          <button v-on:click="toggleMenu" class="menu-btn"
                  v-bind:class="{close: showUser}">
            <img v-bind:src="showUser ? '/images/close.png' : '/images/menu.png'" alt="">
          </button>
          <h5>{{chatter}}</h5>
        </header>
        <div class="messages">
          <Messages v-bind:messages="room ? room.messages : []" />
        </div>
        <MessageInput v-on:send="sendMessage($event)" />
      </div>
    </div>
  </div>

</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import { mapGetters, mapState } from "vuex";

import Login from "./components/Login";
import Users from "./components/Users";
import Messages from "./components/Messages";
import MessageInput from "./components/MessageInput";

import store from "./store/index";

export default {
  name: "app",
  components: {
    Login,
    Users,
    Messages,
    MessageInput
  },
  store,
  computed: {
    ...mapGetters({
      user: "self",
      users: "users",
      room: "activeRoom",
      rooms: "rooms"
    }),
    ...mapState(["showUser"]),
    chatter() {
      if (this.room) {
        let chatter = this.users.find(e => e.id === this.room.users[0]);
        return chatter.name;
      } else {
        return null;
      }
    }
  },
  data() {
    return {
      abc: false
    };
  },
  // beforeCreate() {
  //   this.$store.subscribe((action, state) => {
  //     console.log(action, state);
  //   });
  // },
  methods: {
    async clickTest() {
      let data = await this.$store.dispatch("addUser", `我是测试名称`);
    },
    sendMessage(msg) {
      if (this.room && msg) {
        let getter = this.users.find(e => e.id === this.room.users[0]);
        let msgObj = {
          sender: this.$store.getters.self.id,
          getter: getter.id,
          message: msg,
          sendTime: Date.now()
        };
        this.$store.dispatch("sendMessage", msgObj);
        this.$store.dispatch("getMessage", msgObj);
      }
    },
    toggleMenu() {
      this.$store.dispatch("toggleMenu");
    }
  }
};
</script>

<style lang="scss">
$color: rgba(133, 200, 206, 1);
$fontColor: #222;
html,
body {
  font-size: 14px;
  color: $fontColor;
}
html,
body,
ul {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.main {
  display: flex;
  height: 100vh;

  .chatter-header {
    display: flex;

    padding: 8px 0;
    box-shadow: 0 1px 1px lighten(#000, 90);

    .menu-btn {

      border: none;
      outline: none;
      cursor: pointer;
      background: transparent;

      &.close {
        img {
          width: 1.1rem;
        }
      }

      img {
        width: 1.5rem;
      }
    }

    h5 {
      font-weight: normal;
      font-size: 1.4rem;
      margin: 0;

      flex: 1;

      text-align: center;
    }
  }
}

.message-room {
  flex-grow: 1;

  display: flex;
  flex-direction: column;

  justify-content: space-between;

  .messages {
    flex-grow: 1;
    // border-bottom: 1px solid $color;
    padding: 0 8px;
  }
}

// 动画

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
