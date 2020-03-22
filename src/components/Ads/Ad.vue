<template>
  <v-container>
    <v-layout row>
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
            <v-btn depressed color="warning">Edit</v-btn>
            <v-btn color="success">Buy</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: ['id'],
  computed: {
    ad () {
      const id = this.id;
      return this.$store.getters.adById(id)
    },
  }
}
</script>