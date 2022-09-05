<template>
  <minesweeper-game :width="13" :height="15" :num-bombs="50"></minesweeper-game>
</template>

<script>
import MinesweeperGame from "./components/MinesweeperGame.vue";
export default {
  components: { MinesweeperGame },
};
</script>

<style></style>
