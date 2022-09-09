import { createApp } from 'vue'
import App from './App.vue'
import MinesweeperGame from './components/MinesweeperGame'
import MinesweeperCell from './components/MinesweeperCell'
import GameToolbar from './components/GameToolbar'
import GameEnd from './components/GameEnd'

const app = createApp(App)

app.mount('#app')
app.component('minesweeper-game', MinesweeperGame)
app.component('minesweeper-cell', MinesweeperCell)
app.component('game-toolbar', GameToolbar)
app.component('game-end', GameEnd)