<template>
    <div class='toolbar' :style="{width: width}">
        <p> {{ endMessage }} </p>
        <button @click="playAgain">Play Again</button>
    </div>
</template>

<script>

export default ({
    props: ['type', 'width'],
    computed: {
        endMessage() {
            if (this.type === 'win'){
                return 'Congratulations!'
            } else {
                return 'Game Over!'
            }
        }
    },
    methods: {
        playAgain() {
            this.$emit('playAgain')
        }
    }
})
</script>

<style scoped>
.toolbar {
    background-color: #4A752C;
    height: 30px;
    line-height: 30px;
    width: 300px;
}
p {
    text-align: center;
    color: white;
}
</style>
