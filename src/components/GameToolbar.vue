<template>
    <div class='toolbar'>TOOLBAR {{numFlags}}</div>
</template>

<script>
export default ({
    props: {
        numMines: {
            type: Number,
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
    width: 650px;
}
</style>