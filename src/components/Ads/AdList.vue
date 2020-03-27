<template>
  <v-container>
    <v-layout row v-if="!loading && myAds.length != 0">
      <v-flex xs12  sm6 offset-sm-3>
        <h1 class="text--secondary mb-3">My Ads</h1>
        <v-card class="mb-4 elevation-3" 
            v-for="ad in myAds" 
            :key="ad.id"
        >
          <v-layout row>
            <v-flex xs4>
              <v-img
              class="white--text align-end"
              height="150px"
              :src="ad.img"
              ></v-img>
            </v-flex>
            <v-flex xs8>
              <v-card-text>
                <h2 class="text--primary">
                  {{ ad.title }}
                </h2>
                <p>
                  {{ ad.description }}
                </p>
              </v-card-text>
              
              <v-card-actions class="pr-5">
                <v-spacer></v-spacer>
                <v-btn color="primary"
                  :to="'ad/' + ad.id"
                >Open
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row v-else-if="!loading && myAds.length === 0">
      <v-flex xs12 class="text-center">
        <h1 class="text--primary">No Ads</h1>
        </v-flex>
    </v-layout>
    <v-layout row v-else>
      <v-flex xs12 class="text-center">
        <v-progress-circular
          :size="70"
          :width="7"
          color="purple"
          indeterminate
        ></v-progress-circular>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
     
    }
  },
  computed: {
    myAds () {
      return this.$store.getters.myAds
    },
    loading () {
      return this.$store.getters.loading
    },
  }
}
</script>