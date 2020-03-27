<template>
  <v-dialog
    v-model="dialog"
    max-width="400px"
  >
    <template v-slot:activator="{ on }">
      <v-btn depressed color="warning" v-on="on">Edit</v-btn>
    </template>

    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h4 class="text--primary text-uppercase">Ad edit</h4>
            </v-card-title>

          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                label="Ad title"
                name="title"
                :rules="[v => !!v || 'Title is required',]"
                v-model="editTitle"
                type="text"
                required
              />

              <v-textarea
                rows="2"
                label="Description"
                name="description"
                :rules="[v => !!v || 'Description is required',]"
                v-model="editDescription"
                type="text"
                required
              />
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              
              <v-btn depressed @click="onCancel">
                Cancel
              </v-btn>

              <v-btn depressed color="success" @click="onSave">
                Save
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
        editTitle: this.ad.title,
        editDescription: this.ad.description,
      }
    },
    methods: {
      onCancel () {
        this.editTitle = this.ad.title
        this.editDescription = this.ad.description
        this.dialog = false
      },
      onSave () {
        if(!(this.editTitle && this.editDescription)) return false
        const editAd = {
          title: this.editTitle,
          description: this.editDescription,
          id: this.ad.id,
        }
        this.$store.dispatch('updateAd', editAd)

        this.modal = false

      },
    },
}
</script>