<template>
  <div class="cell" :style="{backgroundColor: color}" @click="reveal">{{label}}</div>
</template>

<script>
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
        }
    }, 
    computed: {
        color() {
            if ((this.coords[0] + this.coords[1])%2 === 0) {
                if (this.revealed){
                    return '#D7B899'
                } else {
                    return '#A2D148'
                }
            } else {
                if (this.revealed){
                    return '#E5C29F'
                } else {
                    return '#AAD750'
                }
            }
        }
    },
    methods: {
        reveal() {
            if (!this.revealed && !this.marked) {
                this.revealed = true
            }
        },
    }
}
</script>

<style scoped>
.cell {
  width: 50px;
  height: 50px;
  float: left;
}
</style>

