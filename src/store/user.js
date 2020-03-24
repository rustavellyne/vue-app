import * as fb from 'firebase'

class User {
    constructor (id) {
        this.id = id
    }
}

export default {
    state: {
        user: null,
    },
    mutations: {
        setUser (state, payload) {
            state.user = payload
        } 
    },
    actions: {
        async registerUser ({commit}, {email, password}) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const user = await fb.auth().createUserWithEmailAndPassword(email, password)
                commit('setUser', new User(user.id))
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error
            }
            commit('setLoading', false);
        },
        async loginUser ({commit}, {email, password}) {
            commit('clearError');
            commit('setLoading', true);
            try {
                const user = await fb.auth().signInWithEmailAndPassword(email, password)
                commit('setUser', new User(user.id))
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                throw error
            }
            commit('setLoading', false);
        },
        autoLoginUser ({commit}, payload) {
            commit('setUser', new User(payload.uid))
        },
        logout ({commit}) {
            fb.auth().signOut();
            commit('setUser', null)
        },
       
    },
    getters: {
        user (state) {
            return state.user
        },
        isLoggedIn (state) {
            return state.user != null
        },
    },
}