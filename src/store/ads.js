import * as fb from 'firebase'

class Ad {
    constructor(userId, title, img,  description = '', promo = false) {
        this.userId = userId
        this.title = title
        this.description = description
        this.img = img
        this.promo = promo
    }
}

export default {
    state: {
        ads: [
            { 
              title: 'First Ad', 
              description: 'some new add', 
              promo: true, 
              img: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', 
              id: '123'
            },
            { 
              title: 'Second Ad', 
              description: 'some new add', 
              promo: false, 
              img: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', 
              id: '124'
            },
            { 
              title: 'Third Ad', 
              description: 'some new add', 
              promo: false, 
              img: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', 
              id: '125'
            },
            { 
              title: 'Four Ad', 
              description: 'some new add', 
              promo: true, 
              img: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg', 
              id: '126'
            }
        ],
    },
    mutations: {
        createAd (state, payload) {
            state.ads.push(payload)
        },
    },
    actions: {
        async createAd ({commit, getters}, payload) {
            let userId = getters.user.id;
            console.log(getters.user.id);
            try {
                commit('clearError');
                commit('setLoading', true);
                
                const newAd = new Ad(userId, payload.title, payload.img, payload.description, payload.promo)
                console.log(newAd)
                await fb.database().ref('vue-ads-app/ads/gU2saGYqwnQiGM1yJ1qg').push(newAd)

                commit('createAd', newAd)
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                console.log(error)
                throw error
            }
            commit('setLoading', false);
            
        },
    },
    getters: {
        ads (state) {
            return state.ads
        },
        
        promoAds (state) {
            return state.ads.filter(ad => ad.promo === true)
        },
        myAds (state) {
            return state.ads
        },
        adById (state) {
            return adId => state.ads.find(ad => ad.id === adId)
        }
    },
}