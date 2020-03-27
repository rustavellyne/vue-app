<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs12 class="pa-2">
          <v-carousel
            cycle
            height="400"
            show-arrows-on-hover
            >
            <v-carousel-item
              v-for="ad in promoAds"
              :key ="ad.id"
              :src="ad.img"
            >
              <div class="car-link">
                <v-btn class="error" :to="'ad/' + ad.id">{{ ad.title }}</v-btn>
              </div>
            </v-carousel-item>
          </v-carousel>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container grid-list-lg>
      <v-layout row>
        <v-flex xs12 sm6 md4
          v-for="ad in ads"
          :key="ad.id"
        >
          <v-card>
            <v-img
              class="white--text align-end"
              height="200px"
              :src="ad.img"
            >
              <v-card-title primary>{{ ad.title }}</v-card-title>
            </v-img>

            <v-card-subtitle class="pb-0">{{ ad.title }}</v-card-subtitle>

            <v-card-text class="text--primary">
              <div>{{ ad.description }}</div>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn depressed :to="'ad/' + ad.id">
                Open
              </v-btn>

              <app-buy-modal :ad="ad"></app-buy-modal>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  computed: {
    promoAds () {
      return this.$store.getters.promoAds
    },
    ads () {
      return this.$store.getters.ads
    },
    loading () {
      return this.$store.getters.loading
    },
  }
}
</script>

<style scoped>
  .car-link {
    position: absolute;
    bottom: 50px;
    left: 50%;
    background-color: rgba(0, 0, 0, 0.5);
    transform: translate(-50%, 0);
    padding: 5px 15px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
</style>