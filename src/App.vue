<template>
    <div id="app">
       <h1>Parent: {{ carName }}</h1>
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

    export default {
        name: 'App',
        components: {
            appCar: Car,
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
