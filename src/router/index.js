import Vue from 'vue'
import VueRouter from 'vue-router'
import guard from './guard'
import Home from '@/components/Home'
import Ad from '@/components/Ads/Ad'
import AdList from '@/components/Ads/AdList'
import NewAd from '@/components/Ads/NewAd'
import Orders from '@/components/User/Orders'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '',
            name: 'home',
            component: Home,
        },
        {
            path: '/ad/:id',
            name: 'ad',
            props: true,
            component: Ad,
            beforeEnter: guard
        },
        {
            path: '/list',
            name: 'adlist',
            component: AdList,
            beforeEnter: guard
        },
        {
            path: '/new',
            name: 'newad',
            component: NewAd,
            beforeEnter: guard
        },
        {
            path: '/login',
            name: 'login',
            component: Login,
        },
        {
            path: '/registration',
            name: 'reg',
            component: Register,
        },
        {
            path: '/orders',
            name: 'orders',
            component: Orders,
            beforeEnter: guard
        },
    ],
    // withou hash
    mode: 'history',
});