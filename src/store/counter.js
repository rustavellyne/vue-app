export default {
    state: {
        counter: 10,
    },
    // mutations sync!!! only
    mutations: {
        setCounter(state, payload) {
            state.counter += payload;
        }, 
    },
    getters: {
        computedCounter: state => state.counter * 10,
    },
    actions: {
        asyncIncrement({commit}, payload) {
            setTimeout( () => {
                commit('setCounter', payload);
            }, 1000);
        },
    },
}