export { createField, getNeighbors, getIndex };

function getNeighbors(x, y, fieldWidth, fieldHeight) {
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
  potentialNeighbors.forEach(function (coords) {
    const r = coords[0];
    const c = coords[1];
    if (r >= 0 && c >= 0 && r < fieldWidth && c < fieldHeight) {
      neighbors.push([r, c]);
    }
  });
  return neighbors;
}

function getIndex(x, y, widthBoard) {
  // create a unique reference number for each cell that
  // corresponds with its index in this.$refs.cells
  return y * widthBoard + x;
}

function protectedShuffle(mineList, cellsToAvoid) {
  const finalListLength = mineList.length
  // helper function - removes random element from mineList and returns it
  function removeRandom(){
    const randomIndex = Math.floor(Math.random()*mineList.length)
    const el = mineList.splice(randomIndex, 1)[0]
    return el
  }
  // removed cellsToAvoid.length "false"s from the array (all trues are at beggining, falses at the end)
  mineList.splice(-cellsToAvoid.length)

  let shuffledMineList = [];

  for (let i = 0; i < finalListLength ; i++) {
    if (cellsToAvoid.includes(i)) {
      shuffledMineList.push(false);
    } else {
      shuffledMineList.push(removeRandom());
    }
  }
  return shuffledMineList;
}

function createField(height, width, numMines, cellsToAvoid) {
  // create list with mines, shuffle, transform into 2d array, give non-mines numbers
  let mineList = [];
  for (let i = 0; i < numMines; i++) {
    mineList.push(true);
  }
  while (mineList.length < width * height) {
    mineList.push(false);
  }
  const temp = protectedShuffle(mineList, cellsToAvoid);
  let field = [];
  for (let row = 0; row < height; row++) {
    const rowStart = row * width;
    const rowEnd = rowStart + width;
    field.push(temp.slice(rowStart, rowEnd));
  }
  return field;
}
