<template>
    <div class="user-box"
        v-bind:class="{show: showUser}">
        <header class="tab-box">
            <button class="tab-btn">用户</button>
            <button class="close" v-on:click="toggleUser">
            <img src="/images/close.png" alt="close"/>
            </button>
        </header>
        <List class="user-list" v-on:item="chatUser($event)" v-bind:list="users"/>
        <button class="open" v-on:click="toggleUser"
                v-bind:class="{show: !showUser}">
        <img src="/images/user.png" alt="user"/>
        </button>
    </div>
</template>

<script>
import List from "./List";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      user: "self",
      users: "users"
    })
  },
  components: {
    List
  },
  data() {
    return {
      showUser: true
    };
  },
  methods: {
    toggleUser() {
      this.showUser = !this.showUser;
    },
    chatUser(user) {
      if (this.user.id != user.id) {
        this.$store.dispatch("getRoom", user.id);
        if (!this.room || !this.room.users.find(e => e == user.id)) {
          this.$store.dispatch("addRoom", user.id);
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$color: rgba(133, 200, 206, 1);
$fontColor: #222;
.user-box {
  width: 0;
  transition: width 0.2s ease;
  overflow: hidden;

  box-shadow: 2px 0 2px rgba(#000, 0.1);
  border-right: 1px solid rgba($color, 0.4);

  &.show {
    width: 24%;
  }
}

.open {
  width: 3rem;
  height: 3rem;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 100;
  background-color: $color;

  cursor: pointer;

  border: none;
  outline: none;
  border-radius: 0 0% 100% 0;

  transform: translate(-100%, -100%);
  transition: all 0.2s ease;
  pointer-events: none;

  &.show {
    transform: translate(0, 0);
    pointer-events: auto;
  }

  img {
    width: 1.4rem;
    margin-top: -6px;
    margin-left: -6px;
  }
}
.tab-box {
  box-shadow: 0 2px 2px rgba(#000, 0.1);

  display: flex;
  justify-content: space-between;

  img {
    width: 1rem;
  }

  .close {
    background: transparent;
    border: none;
    cursor: pointer;
    outline: none;
    margin-right: 4px;
  }
}
.tab-btn {
  border: none;
  outline: none;
  border-bottom: 1px solid $color;
  box-sizing: content-box;

  white-space: nowrap;

  color: $fontColor;
  font-size: 1.2rem;
  padding: 8px 16px;
}
</style>
