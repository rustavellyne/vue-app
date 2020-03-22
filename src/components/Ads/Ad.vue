<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-img
            class="white--text align-end"
            height="300px"
            src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg"
          ></v-img>
          <v-card-text>
            <h1 class="text--primary">Lorem</h1>
            <p class="text--primary">Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure ab nobis aliquid nam minus, consectetur pariatur eaque quibusdam sequi magni eius accusamus nemo laudantium quasi? Fuga voluptates ab quae fugit.</p>
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
  data () {
    return {

    }
  },
}
</script>