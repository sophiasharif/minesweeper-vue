<template>
  <div class="toolbar" :style="{ width: width }">
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
  text-align: center;
  color: white;
  padding-right: 20px;
}
</style>
