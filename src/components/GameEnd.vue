<template>
  <div class="toolbar" :style="{ width: width }">
    <p>{{ endMessage }}</p>
    <button @click="playAgain">Play Again</button>
  </div>
</template>

<script>
export default {
  props: ["type", "width"],
  computed: {
    endMessage() {
      if (this.type === "win") {
        return "Congratulations!";
      } else {
        return "Game Over!";
      }
    },
  },
  methods: {
    playAgain() {
      this.$emit("playAgain");
    },
  },
};
</script>

<style scoped>
.toolbar {
  background-color: #4a752c;
  height: 30px;
  line-height: 30px;
  width: 300px;
}
p {
  text-align: center;
  color: white;
}
button {
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  display: block;
  margin: 0 auto;
}
</style>
