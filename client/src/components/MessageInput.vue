<template>
  <div class="message-input">
      <div class="control-tab">
        <!-- <button v-on:click="sendMessage">发送1</button> -->
        <button v-on:click="sendMessage" class="send-btn">发送</button>
      </div>
      <textarea cols="30" rows="10" placeholder="请输入聊天内容"
                v-model="msg" v-on:keydown.enter="sendMessage($event)"></textarea>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: null
    };
  },
  methods: {
    sendMessage(event) {
      event.stopPropagation();
      event.preventDefault();
      //   console.log(event, this.msg);
      this.$emit("send", this.msg);
      this.msg = null;
    }
  }
};
</script>
<style lang="scss" scoped>
$color: rgba(133, 200, 206, 1);
$fontColor: #222;
.message-input {
    display: flex;
    flex-direction: column;

    .control-tab {
        display: flex;

        justify-content: flex-end;
        box-shadow: 0px 0px 1px rgba(#000, 0.2);
        margin-bottom: 2px;

        padding: 4px;
    }

    .send-btn {
        border: none;
        border-radius: 2px;
        background-color: $color;

        color: #fff;
        cursor: pointer;

        outline: none;
        padding: 4px 8px;
    }

    textarea {
        flex-grow: 1;

        outline: none;
        border: none;

        color: $fontColor;
        font-size: 1rem;
    }
}
</style>
