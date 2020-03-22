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
        createAd ({commit}, payload) {
            payload.id = '1'
            commit('createAd', payload)
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