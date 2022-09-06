export {createField}

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
  
  function createField(height, width, numMines) {
        // create list with mines, shuffle, transform into 2d array, give non-mines numbers
        let mineList = [];
        for (let i = 0; i < numMines; i++) {
          mineList.push(true);
        }
        while (mineList.length < width * height) {
          mineList.push(false);
        }
        const temp = shuffle(mineList);
        let field = [];
        for (let row = 0; row < height; row++) {
          const rowStart = row * width;
          const rowEnd = rowStart + width;
          field.push(temp.slice(rowStart, rowEnd));
        }
        return field;
      }