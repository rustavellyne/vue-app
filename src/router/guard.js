import store from '../store'

export default function(from, to, next) {
    if(store.getters.user) {
        next()
    } else {
        next('/login?loginError=true')
    }
}