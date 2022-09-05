<template>
  <game-toolbar ref="toolbar" :num-mines="numBombs"></game-toolbar>
  <div class="field">
    <div v-for="y in height" :key="y">
      <minesweeper-cell
        v-for="x in width"
        :key="getRefNum(x, y)"
        ref="cells"
        :coords="[x - 1, y - 1]"
        :is-mine="field[y - 1][x - 1]"
        :label="getLabel(x - 1, y - 1)"
        @cellRevealed="cellRevealed"
        @updateMarked="updateMarked"
      ></minesweeper-cell>
    </div>
  </div>
</template>

<script>
import MinesweeperCell from "./MinesweeperCell.vue";
import GameToolbar from "./GameToolbar.vue";

export default {
  props: {
    width: {
      type: Number,
      required: false,
      default: 10,
    },
    height: {
      type: Number,
      required: false,
      default: 10,
    },
    numBombs: {
      type: Number,
      required: false,
      default: 15,
    },
  },
  components: { MinesweeperCell, GameToolbar },
  data() {
    return {
      numCells: this.height * this.width,
      numRevealed: 0,
      field: this.createField(),
    };
  },
  computed: {
    cellsLeft() {
      return this.numCells - this.Bombs - this.numRevealed
    }
  },
  watch: {
    cellsLeft(value) {
      console.log(this.cellsLeft)
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
    createField() {
      // create list with mines, shuffle, transform into 2d array, give non-mines numbers
      let mineList = [];
      for (let i = 0; i < this.numBombs; i++) {
        mineList.push(true);
      }
      while (mineList.length < this.width * this.height) {
        mineList.push(false);
      }
      const temp = shuffle(mineList);
      let field = [];
      for (let row = 0; row < this.height; row++) {
        const rowStart = row * this.width;
        const rowEnd = rowStart + this.width;
        field.push(temp.slice(rowStart, rowEnd));
      }
      return field;
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
        this.numRevealed += 1
        console.log(this.cellsLeft)
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

// HELPER FUNCTIONS
function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
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
