# vue-minesweeper

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


Cell:
	constructor(coords, isMine):
		# have some logic to determine if cell is lightly or darkly colored
		coords = coords
		num = 9
		isMine = isMine
		revealed = False
		marked = False

	reveal():
	if not revealed and not marked:
		
		if cell is safe:
		
			revealed = true
			numColorDict = {1:'blue', 2:'green4', 3:'red', 4:'purple', \
			5:'maroon', 6:'cyan', 7:'black', 8:'dim gray'}
			
			# update appearance: possibly make sunken, make light/dark brown
			
			# if cell's value is not 0, reveal only that cell
			if num > 0:
				text = self.num
				text color = numColorDict[num]
	
			# else: if cell's value IS 0, reveal all adjacent cells.
				# make sure you check that the cell is actually on the grid. ideas:
					# check at beginning of for loop
					# try/except block
	
			# update global safe cell count

		if cell is mine:
			end game

	setNumber():
		if not cell.isMine():
			numMines = 0
			iterate through neighbors
			if neighbor is a SafeCell, add one to numMines
			this.numMines = numMines

	neighbors():
		return all of the cell's valid neighbors
		make sure the neighbors are on the board
		
	mark():
		if not this.revealed:
			if not self.marked:
				self['text'] = '*'
				self.marked = True
				self.master.update_mines('subtract')
			else:
				self['text'] = ''
				self.marked = False
				self.master.update_mines('add')

	isMine():
		return this.isMine

	getCoords():
		return this.coords

MinesweeperGame:

	constructor(width, height, numBombs):
		data: 
			numBombs
			cellCount(width*height-numBombs)
			cellGrid = this.createCoordList()
		# set up tool bar
			create: difficulty menu, amount of mines left
		# expose some land to get started

	exposeLand():
		take a random zero cell from the center and 
		reveal it
			
	
	createCordList(width, height):
		create minesweeper cell matrix
	
	assignCells(coordList, numBombs):
		see python for idea
	
	cellIsMine(coords):
	
	lostGame():
	
	winGame():
	
	updateCells():
		decrease cell count by 1 and check for win
	
	updateMines(string):
		if string == 'add', adds one to the mine count
		if string == 'subtract', removes one from the mine count
		updates the minecount displayed
	
	restartGame(width, height, mines):
