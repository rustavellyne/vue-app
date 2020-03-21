<template>
    <div class="car">
        <h3>Name: {{ carName }} \ {{ reverseName }} </h3>
        <p>Year: {{ carYear }} </p>
        <button @click="changeName">Обновить $emit</button>
        <button @click="changeFunc">Обновить FuncAsProps</button>
        <button @click="updateCounter">Обновить Counter</button>
    </div>
</template>

<script>
// import { eventEmitter } from './main';
export default {
    props: {
        carName: {
            type: String,
            default: 'Default name',
        },
        carYear: Number,
        changeFunc: {
            type: Function,
        },

    },
    methods: {
        changeName() {
            //передача данных из дочернего в родительский при помощи emit
            this.$emit('nameChanged', 'Zaz');
        },
        updateCounter() {
            //проброс методов через гину событий
            // eventEmitter.$emit('counterUpdated', 3);
            // обращение к свойству state vuex
            //this.$store.state.counter += 3;
            // setter mutations
            //this.$store.commit('setCounter', 2);
            this.$store.dispatch('asyncIncrement', 2);
            
        }
    },
    computed: {
        reverseName() {
            return this.carName.split('').reverse().join('');
        },
    },
}
</script>

<style>
    .car {
        border: 1px solid black;
    }
</style>