<style scoped lang="scss">
$color: rgba(133, 200, 206, 1);
.list {
  width: 100%;
  height: 100%;
  padding-top: 8px;
}

ul {
  width: 100%;
  overflow: hidden;
}

li {
  cursor: pointer;
  padding: 6px 0px 6px 8px;
  transition: all 0.2s ease;

  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.active {
  background: rgba(233, 233, 233, 1);
}
</style>

<template>
  <div class="list">
      <ul v-if="list">
          <transition-group name="fade">
            <li v-for="item in list" v-bind:key="item.id"
                v-on:click="clickItem(item)" v-bind:class="{active: activeId == item.id}">
                {{self.id === item.id ? `(自己)` : ''}}
                {{item.name}}
            </li>
          </transition-group>
      </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "List",
  props: ["list"],
  computed: {
    ...mapGetters({
      room: "activeRoom",
      self: "self"
    }),
    activeId() {
      if (this.room) {
        return this.room.users[0];
      } else {
        return null;
      }
    }
  },
  methods: {
    clickItem(item) {
      this.$emit("item", item);
    }
  },
};
</script>


