<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs12 class="pa-2">
          <v-carousel
            cycle
            height="400"
            show-arrows-on-hover
            >
            <v-carousel-item
              v-for="ad in ads"
              :key ="ad.id"
              :src="ad.img"
            >
              <div class="car-link">
                <v-btn class="error" :to="'/ad' + ad.id">{{ ad.title }}</v-btn>
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
              <v-btn depressed :to="'/ad' + ad.id">
                Open
              </v-btn>

              <v-btn raised color="primary" depressed>
                Buy
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
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
          promo: true, 
          img: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg', 
          id: '124'
        },
        { 
          title: 'Third Ad', 
          description: 'some new add', 
          promo: true, 
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
    }
  },
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