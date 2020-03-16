<template>
    <div id="app">
       <h1>Parent: {{ carName }}</h1>
       <counter></counter>
       <app-car 
            :carYear="carYear" 
            :carName="carName"
            @nameChanged="carName = $event"
            :changeFunc="changeNameAudi"
        ></app-car>
    </div>
</template>
// :changeFunc="changeNameAudi" передача функции для изменения в родительском компоненте
<script>
import Car from './Car'
import Counter from './Counter'

    export default {
        name: 'App',
        components: {
            appCar: Car,
            counter: Counter,
        },
        data() {
            return {
                carName: 'Mazda',
                carYear: 2012,
            }
        }, 
        methods: {
            changeNameAudi() {
                this.carName = 'Audi';
            }
        }
    }
</script>

<style>

</style>
