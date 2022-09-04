<template>
  <minesweeper-game :width="10" :height="10" :num-bombs="10"></minesweeper-game>
</template>

<script>
import MinesweeperGame from "./components/MinesweeperGame.vue";
export default {
  components: { MinesweeperGame },
  data() {
    return {
      helloWorld: "heelo wordl1!!",
    };
  },
  methods: {},
};
</script>

<style></style>
