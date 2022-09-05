<template>
  <p>numMines: {{ numMines }}</p>
  <game-toolbar ref="toolbar" :num-mines="numMines" :width="boardWidth"></game-toolbar>
  <div :style="{ width: boardWidth, height: boardHeight}">
    <div v-for="y in height" :key="y">
      <minesweeper-cell
        v-for="x in width"
        :key="getRefNum(x, y)"
        ref="cells"
        :coords="[x - 1, y - 1]"
        :is-mine="field[y - 1][x - 1]"
        :label="getLabel(x - 1, y - 1)"
        :side-length="cellSideLength"
        @cellRevealed="cellRevealed"
        @updateMarked="updateMarked"
      ></minesweeper-cell>
    </div>
  </div>
</template>

<script>
import { createField } from "../helper";
import MinesweeperCell from "./MinesweeperCell.vue";
import GameToolbar from "./GameToolbar.vue";

export default {
  components: { MinesweeperCell, GameToolbar },
  data() {
    return {
      // global controls for board size & mines:
      height: 13,
      width: 13,
      numMines: 20,
      cellSideLength: 40, // cell side length in px used for sizing the board dynamically
      // trackers
      numRevealed: 0,
    };
  },
  computed: {
    cellsLeft() {
      // cells left = total number of cells - number of mines - number revealed
      return this.width * this.height - this.numMines - this.numRevealed;
    },
    field() {
      return createField(this.height, this.width, this.numMines);
    },
    boardWidth() {
      return (this.width * this.cellSideLength).toString() + 'px';
    },
    boardHeight() {
      return (this.height * this.cellSideLength).toString() + 'px';
    },
  },
  watch: {
    cellsLeft(value) {
      if (value === 0) {
        alert("You Won!");
      }
    },
  },
  methods: {
    getRefNum(x, y) {
      // create a unique reference number for each cell that
      // corresponds with its index in this.$refs.cells
      return y * this.width + x;
    },
    getLabel(x, y) {
      // if mine, set label to '*'
      if (this.field[y][x]) {
        return "*";
      }
      // if not a mine, tally neighbors that are mines
      const neighbors = this.getNeighbors(x, y);
      let adjacentMines = 0;
      for (let i = 0; i < neighbors.length; i++) {
        const r = neighbors[i][1];
        const c = neighbors[i][0];
        if (this.field[r][c]) {
          adjacentMines++;
        }
      }
      return adjacentMines.toString();
    },
    getNeighbors(x, y) {
      // returns valid neighbors of cell with given coords
      const potentialNeighbors = [
        [x + 1, y + 1],
        [x + 1, y],
        [x + 1, y - 1],
        [x, y + 1],
        [x, y - 1],
        [x - 1, y + 1],
        [x - 1, y],
        [x - 1, y - 1],
      ];
      const neighbors = [];
      const w = this.width;
      const h = this.height;
      potentialNeighbors.forEach(function (coords) {
        const r = coords[0];
        const c = coords[1];
        if (r >= 0 && c >= 0 && r < w && c < h) {
          neighbors.push([r, c]);
        }
      });
      return neighbors;
    },
    cellRevealed(coords, isMine, label) {
      if (isMine) {
        alert("Game Over!");
      } else {
        // decrease num of cells left
        this.numRevealed += 1;
        // if there are no bombs around, reveal all neighbors
        if (label === "0") {
          const neighbors = this.getNeighbors(coords[0], coords[1]);
          const that = this;
          neighbors.forEach(function (coords) {
            const refNum = that.getRefNum(coords[0], coords[1]);
            const neighborCell = that.$refs.cells[refNum];
            neighborCell.reveal();
          });
        }
      }
    },
    updateMarked(value) {
      this.$refs.toolbar.updateFlags(value);
    },
  },
};
</script>

<style scoped>
h2 {
  color: blue;
}
.field {
  width: 650px;
  height: 750px;
}
</style>
