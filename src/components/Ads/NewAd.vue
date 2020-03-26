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
              @click="triggerUpload"
            >
              Upload
              <v-icon right dark>mdi-cloud-upload</v-icon>
            </v-btn>
            <input ref="fileInput" type="file" accept="image/*" hidden @change="onFileChange">
          </v-flex>
          <v-flex xs12 class="pa-2">
            <v-img :src="imageSrc" height="150" v-if="imageSrc"></v-img>
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
            <v-btn color="success" :disabled="!valid || !image" @click="createAd" :loading="loading">Create Ad</v-btn>
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
      image: null,
      imageSrc: '',
    }
  },
  methods: {
    createAd () {
      if(!(this.$refs.form.validate()) || !this.image) return false;
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
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.imageSrc = reader.result
      };
      
      this.image = file
    },
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
  }
}
</script>