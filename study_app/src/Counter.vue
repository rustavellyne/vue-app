<template>
    <div>
        <h1>Counter: {{ counter }}</h1>
    </div>
</template>

<script>
// import {eventEmitter} from './main.js'
export default {
    computed: {
        counter() {
            // получение свойства state vuex
            //return this.$store.state.counter;
            return this.$store.getters.computedCounter;
        }
    },
    created() {
        //реакция события шины событий
        // eventEmitter.$on('counterUpdated', (num) => {
        //     this.counter += num;
        // });
    },
}
</script>