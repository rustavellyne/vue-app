import * as fb from 'firebase'
class Orders {
    constructor (name, phone, adId, done = false, id = null) {
        this.name = name
        this.phone = phone
        this.adId = adId
        this.done = done
        this.id = id
    }
}

export default {
    state: {
        orders: [],
    },
    mutations: {
        loadOrders (state, payload) {
            state.orders = payload
        },
    },
    actions: {
        async createOrder ({commit}, {name, phone, adId, userId}) {
            let newOrder = new Orders (name, phone, adId)
            commit('clearError');
            try {
                await fb.database().ref(`vue-ads-app/users/${userId}/orders`).push(newOrder)
                
            } catch (error) {
                commit('setError', error.message);
                throw error
            }

        },
        async fetchOrders ({commit, getters}) {
            try {
                commit('clearError');
                commit('setLoading', true);
                const userId = getters.user.id
                let orderVal = await fb.database().ref(`vue-ads-app/users/${userId}/orders`).once('value')
                let orders = orderVal.val()
                let ordersComputed = []
                Object.keys(orders).forEach(key => {
                    const obj = orders[key]
                    ordersComputed.push(new Orders(obj.name, obj.phone, obj.adId, obj.done, key))
                })
                commit('loadOrders', ordersComputed)
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error
            }
            commit('setLoading', false)
        },
        async markDoneOrder ({commit, getters}, payload) {
            commit('clearError');
            const userId = getters.user.id
            try {
                await fb.database().ref(`vue-ads-app/users/${userId}/orders`).child(payload).update({done: true})
            } catch (error) {
                commit('setError', error.message);
            }
        },
    },
    getters: {
        doneOrders (state) {
            return state.orders.filter(ad => ad.done)
        },
        undoneOrders (state) {
            return state.orders.filter(ad => !ad.done)
        },
        orders (state, getters) {
            return getters.undoneOrders.concat(getters.doneOrders)
        }
    },
}