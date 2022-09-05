<template>
    <div class='toolbar' :style="{width: width}">TOOLBAR {{numFlags}}</div>
</template>

<script>
export default ({
    props: {
        numMines: {
            type: Number,
            required: true
        },
        width: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            numFlags: this.numMines
        }
    },
    methods: {
        updateFlags(value) {
            console.log(this.numFlags)
            this.numFlags = this.numFlags + value
        }
    }
})
</script>

<style scoped>
.toolbar {
    background-color: green;
}
</style>