export { createField };

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
