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
        ads: [],
    },
    mutations: {
        createAd (state, payload) {
            state.ads.push(payload)
        },
        loadAds (state, payload) {
            state.ads = payload
        },
        
    },
    actions: {
        async createAd ({commit, getters}, payload) {
            let userId = getters.user.id;
            try {
                commit('clearError');
                commit('setLoading', true);
                const image = payload.img;
                const imageExt = image.name.slice(image.name.lastIndexOf('.'))
                
                const newAd = new Ad(userId, payload.title, '', payload.description, payload.promo)
                let ad = await fb.database().ref('vue-ads-app/ads/gU2saGYqwnQiGM1yJ1qg').push(newAd)
                const fileData = await fb.storage().ref(`ads/${ad.getKey()}.${imageExt}`).put(image)
                const imageSrc = await fileData.ref.getDownloadURL()
                await fb.database().ref('vue-ads-app/ads/gU2saGYqwnQiGM1yJ1qg').child(ad.getKey()).update({img: imageSrc})
                
                commit('createAd', {
                    ...newAd,
                    id: ad.getKey(),
                    img: imageSrc, 
                })
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                console.log(error)
                throw error
            }
            commit('setLoading', false);
            
        },
        async fetchAds({commit}) {
            try {
                commit('clearError');
                commit('setLoading', true);

                let fbVal = await fb.database().ref('vue-ads-app/ads/gU2saGYqwnQiGM1yJ1qg').once('value')
                const ads = fbVal.val()

                let newAds = []
                if(ads) {
                    Object.keys(ads).forEach(key=>{
                        const ad = ads[key]
                        ad.id = key
                        newAds.push(ad)
                    })
                    commit('loadAds', newAds)
                }
            } catch (error) {
                commit('setError', error.message);
                commit('setLoading', false);
                console.log(error)
                throw error
            }
            commit('setLoading', false);
        },
        async updateAd ({commit}, payload) {
            try {
                commit('clearError');
                commit('setLoading', true);

                let fbVal = await fb.database().ref('vue-ads-app/ads/gU2saGYqwnQiGM1yJ1qg').once('value')
                const ads = fbVal.val()

                let newAds = []
                if(ads) {
                    Object.keys(ads).forEach(key=>{
                        const ad = ads[key]
                        ad.id = key
                        newAds.push(ad)
                    })
                    commit('loadAds', newAds)
                }
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