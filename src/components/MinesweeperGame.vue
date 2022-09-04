<template>
  <div class="field">
    <minesweeper-cell
      v-for="n in numCells"
      :key="n"
      :coords="coordList[n-1]"
      :is-mine="mineList[n-1]"
    ></minesweeper-cell>
  </div>
</template>

<script>
import MinesweeperCell from "./MinesweeperCell.vue";

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

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
  components: { MinesweeperCell },
  data() {
    return {
      bombCount: this.numBombs,
      numCells: this.height*this.width,
      coordList: this.createCoordList(),
      mineList: this.createMineList(),
    };
  },
  methods: {
    createCoordList() {
      let coordList = [];
      for (let x = 0; x < this.width; x++) {
        for (let y = 0; y < this.height; y++) {
          coordList.push([x, y]);
        }
      }
      return coordList;
    },
    createMineList(){
        let mineList = []
        for (let i=0; i<this.numBombs; i++){
            mineList.push(true)
        }
        while (mineList.length < this.width*this.height){
            mineList.push(false)
        }
        return shuffle(mineList)
    },
  },
};
</script>

<style scoped>
h2 {
  color: blue;
}
.field {
  width: 300px;
  height: 300px;
}
</style>
