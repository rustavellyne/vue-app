<template>
  <v-dialog
    v-model="dialog"
    max-width="400px"
  >
    <template v-slot:activator="{ on }" >
      <v-btn depressed color="success" v-on="on" class="ml-3">Buy</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h4 class="text--primary text-uppercase">Buy Product</h4>
            </v-card-title>

          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-form
                ref="form"
                v-model="valid"
              >
                <v-text-field
                    label="Your Name"
                    name="name"
                    :rules="[v => !!v || 'Your Name is required',]"
                    v-model="name"
                    type="text"
                />

                <v-textarea
                    rows="2"
                    
                    label="Your Phone"
                    name="phone"
                    :rules="[v => !!v || 'Your Phone is required',]"
                    v-model="phone"
                    type="text"
                />
              </v-form>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              
              <v-btn depressed @click="onCancel" :disabled="localLoading">
                Close
              </v-btn>

              <v-btn depressed color="success" @click="onSave" :loading="localLoading">
                Buy it
              </v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>

    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['ad'],
    data() {
      return {
        dialog: false,
        name: '',
        phone: '',
        localLoading: false,
        valid: true,
      }
    },
    methods: {
      onCancel () {
        this.name = ''
        this.phone = ''
        this.dialog = false
        this.$refs.form.resetValidation()
      },
      onSave () {
        if(!(this.name && this.phone)) return false
         this.localLoading = true;
        const order = {
          name: this.name,
          phone: this.phone,
          adId: this.ad.id,
          userId: this.ad.userId,
        }
        this.$store.dispatch('createOrder', order)
            .finally(()=>{
                this.name = ''
                this.phone = ''
                this.localLoading = false;
                this.dialog = false
                this.$refs.form.resetValidation()
            })
      },
    },
}
</script>