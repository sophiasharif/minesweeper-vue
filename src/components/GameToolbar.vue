<template>
  <div class="toolbar" :style="{ width: width }">
    <div>
      <button @click="setUpGame('easy')">Easy</button>
      <button @click="setUpGame('medium')">Medium</button>
      <button @click="setUpGame('hard')">Hard</button>
    </div>
    <p>Mines Left: {{ numFlags }}</p>
  </div>
</template>

<script>
export default {
  props: {
    numMines: {
      type: Number,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      numFlags: this.numMines,
    };
  },
  methods: {
    updateFlags(value) {
      this.numFlags = this.numFlags + value;
    },
    setUpGame(difficulty) {
        this.$emit('setUpGame', difficulty)
    }
  },
};
</script>

<style scoped>
.toolbar {
  background-color: #4a752c;
  height: 30px;
  line-height: 30px;
}
p {
  text-align: right;
  color: white;
  padding-right: 20px;
}
button {
  float: left;
}
</style>
