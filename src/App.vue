<template>
  <div id="game">
    <minesweeper-game class="game"></minesweeper-game>
  </div>
</template>

<script>
import MinesweeperGame from "./components/MinesweeperGame.vue";
export default {
  components: { MinesweeperGame },
};
</script>

<style>
body {
  background-color: #c5e1a5;
  margin: auto;
}
#game {
  display: block;
  margin-left: 25%;
  margin-top: 5vh;
}
</style>
