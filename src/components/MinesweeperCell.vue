<template>
  <div class="cell" :style="{backgroundColor: color}" @click="reveal" @click.right="mark()">
    <p v-if="revealed">{{label}}</p>
    <p v-else-if="marked">*</p>
  </div>
</template>

<script>
// prevent context menu on right click (preserve right click for setting flags)
document.addEventListener('contextmenu', event => event.preventDefault());

export default {
    props: {
        coords: {
            type: Array,
            required: true
        },
        isMine: {
            type: Boolean,
            required: true
        },
        label: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            revealed: false,
            marked: false,
            isLight: (this.coords[0] + this.coords[1])%2 === 0
        }
    }, 
    computed: {
        color() {
            if ((this.coords[0] + this.coords[1])%2 === 0) {
                // dark
                if (this.revealed){
                    return '#E0DCB0'
                } else {
                    return '#77BE77'
                }
            } else {
                // light
                if (this.revealed){
                    return '#EFE8B9'
                } else {
                    return '#92DF90'
                }
            }
        }
    },
    methods: {
        reveal() {
            if (!this.revealed && !this.marked) {
                this.revealed = true
                this.$emit('cellRevealed', this.coords, this.isMine, this.label)
            }
        },
        mark() {
            if (!this.revealed){
                this.marked = !this.marked
            }
        }
    }
}
</script>

<style scoped>
.cell {
  width: 50px;
  height: 50px;
  float: left;
}

p {
    text-align: center;
    font-family: serif;
    font-size: 20px;
}

</style>

