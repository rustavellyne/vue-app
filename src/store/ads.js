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
        updateAd (state, {id, title, description}) {
            const findAd = state.ads.find(ad => {
                return ad.id === id
            })
            findAd.title = title
            findAd.description = description
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
        async updateAd ({commit}, {id, title, description}) {
            try {
                commit('clearError');
                commit('setLoading', true);

                await fb.database().ref('vue-ads-app/ads/gU2saGYqwnQiGM1yJ1qg').child(id).update({
                    title, description
                })
               
                commit('updateAd', {id, title, description})
                
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
        myAds (state, getters) {
            return state.ads.filter(ad => {
                return ad.userId == getters.user.id
              })
        },
        adById (state) {
            return adId => state.ads.find(ad => ad.id === adId)
        }
    },
}