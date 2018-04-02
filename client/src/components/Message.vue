<template>
    <transition name="fade">
        <div class="message" v-if="data"
            v-bind:class="{self: isSelf}">
            <h5>{{data.sender.name}} | {{data.sendTime | date}}</h5>
            <p>{{data.message}}</p>
        </div>
    </transition>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["data"],
  computed: {
    ...mapGetters(["self"]),
    isSelf() {
      return this.self.id === this.data.sender.id;
    }
  }
};
</script>

<style lang="scss" scoped>
.message {

  h5,
  p {
    margin: 8px 0;
  }

  p {
    font-size: 1.2rem;
  }

  &.self {
    // justify-content: flex-end;
    text-align: right;
  }
}
</style>
