import { createApp } from 'vue'
import App from './App.vue'
import MinesweeperGame from './components/MinesweeperGame.vue'
import MinesweeperCell from './components/MinesweeperCell.vue'

const app = createApp(App)

app.mount('#app')
app.component('minesweeper-game', MinesweeperGame)
app.component('minesweeper-cell', MinesweeperCell)