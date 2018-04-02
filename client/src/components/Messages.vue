<template>
    <!-- <ul class="message-list" v-if="all && all.length">
        <li v-for="msg in all" v-bind:key="msg.id">
            <h5>{{msg.sender.name}} | {{msg.sendTime}}</h5>
            <p>{{msg.message}}</p>
        </li>
    </ul> -->
    <div class="message-list" v-if="all && all.length">
        <Message v-for="msg in all"
                 v-bind:key="msg.id"
                 v-bind:data="msg" />
    </div>
    <p class="no-message" v-else>
        暂无消息
    </p>
</template>

<script>
import { mapState } from "vuex";
import { copy } from "../util";

import Message from "./Message";

export default {
  props: ["messages"],
  components: {
      Message,
  },
  computed: {
    ...mapState({
      allMessages: "messages",
      users: 'users'
    }),
    all() {
        return this.messages.map(e => {
            let msgObj = copy(this.allMessages.find(message => message.id == e));
            msgObj.sender = this.users.find(user => user.id == msgObj.sender);
            msgObj.getter = this.users.find(user => user.id == msgObj.getter);
            return msgObj;
        })
    }
  },
  beforeCreate() {
    console.log(this);
  },
};
</script>

<style lang="scss" scoped>
    $color: #ccc;
    .no-message {
        color: $color;
        text-align: center;
    }
</style>
