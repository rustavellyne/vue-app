<template>
  <v-container>
    <v-layout row v-if="!loading">
      <v-flex xs12>
        <v-card>
          <v-img
            class="white--text align-end"
            height="300px"
            :src="ad.img"
          ></v-img>
          <v-card-text>
            <h1 class="text--primary">{{ad.title}}</h1>
            <p class="text--primary">{{ad.description}}</p>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <appEditAdModal :ad="ad"></appEditAdModal>
            <v-btn color="success">Buy</v-btn>
          </v-card-actions>
        </v-card>
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
import EditAdModal from './EditAdModal'

export default {
  components: {
    appEditAdModal: EditAdModal,
  },
  props: ['id'],
  computed: {
    ad () {
      const id = this.id;
      return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    },
  }
}
</script>