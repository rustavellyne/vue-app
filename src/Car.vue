<template>
    <div class="car">
        <h3>Name: {{ carName }} \ {{ reverseName }} </h3>
        <p>Year: {{ carYear }} </p>
        <button @click="changeName">Обновить $emit</button>
        <button @click="changeFunc">Обновить FuncAsProps</button>
    </div>
</template>

<script>
export default {
    props: {
        carName: {
            type: String,
            default: 'Default name',
        },
        carYear: Number,
        changeFunc: {
            type: Function,
        }
    },
    methods: {
        changeName() {
            //передача данных из дочернего в родительский при помощи emit
            this.$emit('nameChanged', 'Zaz');
        },
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