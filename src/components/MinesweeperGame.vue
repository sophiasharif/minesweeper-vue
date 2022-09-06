<template>
  <game-toolbar
    ref="toolbar"
    :num-mines="numMines"
    :width="boardWidth"
    @setUpGame="setUpGame"
  ></game-toolbar>
  <div :style="{ width: boardWidth, height: boardHeight }">
    <div v-for="y in height" :key="y">
      <minesweeper-cell
        v-for="x in width"
        :key="getRefNum(x, y)"
        ref="cells"
        :coords="[x - 1, y - 1]"
        :side-length="cellSideLength"
        :cells-locked="cellsLocked"
        @cellRevealed="cellRevealed"
        @updateMarked="updateMarked"
      ></minesweeper-cell>
    </div>
  </div>
  <game-end
    v-if="gameStatus"
    :type="gameStatus"
    :width="boardWidth"
    @playAgain="startGame"
  ></game-end>
</template>

<script>
import { createField } from "../helper";
import MinesweeperCell from "./MinesweeperCell.vue";
import GameToolbar from "./GameToolbar.vue";
import GameEnd from "./GameEnd.vue";

export default {
  components: { MinesweeperCell, GameToolbar, GameEnd },
  data() {
    return {
      // global controls for board size & mines:
      height: 20,
      width: 24,
      numMines: 100,
      cellSideLength: 30, // cell side length in px used for sizing the board dynamically
      // trackers
      numRevealed: 0,
      gameStatus: "",
      cellsLocked: false, // lock cells once game ends
      firstClickHappened: false, // used to guarantee first click
      field:[]
    };
  },
  computed: {
    cellsLeft() {
      // cells left = total number of cells - number of mines - number revealed
      return this.width * this.height - this.numMines - this.numRevealed;
    },
    boardWidth() {
      return (this.width * this.cellSideLength).toString() + "px";
    },
    boardHeight() {
      return (this.height * this.cellSideLength).toString() + "px";
    },
  },
  watch: {
    cellsLeft(value) {
      if (value === 0) {
        this.gameStatus = "win";
        this.cellsLocked = true;
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
      if (!this.firstClickHappened) {
        console.log("FIRST IF BLOCK: "+ isMine)
        // create a list of indices where there should not be mines
        const clickedCellRefNum = this.getRefNum(coords[0], coords[1])
        let protectedCells = [clickedCellRefNum] // add ref num of clicked cell
        const neighbors = this.getNeighbors(coords[0], coords[1])
        for (const n of neighbors) {
          const nRef = this.getRefNum(n[0], n[1])
          protectedCells.push(nRef)
        }
        // set up field - cell that player clicked on & all adjacent cells will be safe
        this.field = createField(this.height, this.width, this.numMines, protectedCells)
        // update values of cells
        for (let y=0; y<this.height; y++){
          for (let x=0; x<this.width; x++){
            const cell = this.$refs.cells[this.getRefNum(x, y)]
            cell.isMine = this.field[y][x]
          }
        }
        // update labels of cells 
        for (let y=0; y<this.height; y++){
          for (let x=0; x<this.width; x++){
            const cell = this.$refs.cells[this.getRefNum(x, y)]
            cell.label = this.getLabel(x,y)
          }
        }
        // set label to 0 so that if block below runs
        label = "0"
        // update
        this.firstClickHappened = true

      }
      if (isMine) {
        // game is lost: show GameEnd element, lock cells, reveal unmarked mines
        console.log("SECOND IF BLOCK: "+isMine)
        this.gameStatus = "loss";
        this.cellsLocked = true;
        const cellList = this.$refs.cells;
        cellList.forEach(function (cell) {
          if (cell.isMine && !cell.revealed) {
            cell.revealed = true
          }
        });
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
      // updates mine count in toolbar
      this.$refs.toolbar.updateFlags(value);
    },
    startGame(width=this.width, height=this.height, numMines=this.numMines, cellSideLength=this.cellSideLength) {
      this.width = width
      this.height = height
      this.numMines = numMines
      this.cellSideLength = cellSideLength
      // reset trackers
      this.numRevealed = 0;
      this.gameStatus = "";
      this.cellsLocked = false;
      this.firstClickHappened = false
      // reset mine count
      this.$refs.toolbar.numFlags = this.numMines;
      // reset cells
      const cellList = this.$refs.cells;
      cellList.forEach(function (cell) {
        cell.revealed = false;
        cell.marked = false;
      });
    },
    setUpGame(difficulty){
      if (difficulty === 'easy') {
        this.startGame(10, 8, 10, 50)
      } else if (difficulty === 'medium') {
        this.startGame(18, 14, 40, 40)
      } else if (difficulty === 'hard') {
        this.startGame(24, 20, 100, 30)
      }
    }
  },
};
</script>

<style scoped>
h2 {
  color: blue;
}
</style>
