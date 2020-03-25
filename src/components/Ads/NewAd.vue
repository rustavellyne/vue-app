<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm-3>
        <h1 class="text--secondary mb-1">Create New Ad</h1>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            validate-on-blur
            label="Ad title"
            name="title"
            :rules="[v => !!v || 'Title is required',]"
            v-model="title"
            type="text"
            required
          />

          <v-textarea
            rows="2"
            validate-on-blur
            label="Description"
            name="description"
            :rules="[v => !!v || 'Description is required',]"
            v-model="description"
            type="text"
            required
          />
        </v-form>
        <v-layout row>
          <v-flex xs12>
            <v-btn
              color="blue-grey"
              class="ma-2 white--text"
            >
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 class="pa-2">
            <v-img src="https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg" height="150"></v-img>
          </v-flex>
        </v-layout>
        <v-layout row class="ma-1">
          <v-flex xs6 >
            <v-switch
            v-model="promo"
            label="Add to promo"
            ></v-switch>
          </v-flex>
          <v-spacer></v-spacer>
          <v-flex xs3 align-self-center>
            <v-btn color="success" :disabled="!valid" @click="createAd" :loading="loading">Create Ad</v-btn>
          </v-flex>
        </v-layout>
        
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      title: '',
      description: '',
      promo: false,
      image: 'https://www.nasa.gov/sites/default/files/thumbnails/image/edu_what_is_earth_0.jpg'
    }
  },
  methods: {
    createAd () {
      if(!(this.$refs.form.validate()) ) return false;
      let ad = {
        title: this.title,
        description: this.description,
        promo: this.promo,
        img: this.image
      };
      this.$store.dispatch('createAd', ad)
          .then(() => {
              this.$router.push('/list')
            })
          .catch((error) => {console.log(error)})
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
  }
}
</script>