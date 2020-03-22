<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        sm="8"
        md="6"
        lg="4"
      >
        <v-card class="elevation-12">
          <v-toolbar
            color="primary"
            dark
            flat
          >
            <v-toolbar-title>Login form</v-toolbar-title>
            </v-toolbar>
          <v-card-text>
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
            >
              <v-text-field
                validate-on-blur
                label="email"
                name="email"
                :rules="emailRules"
                v-model="email"
                prepend-icon="mdi-account"
                type="email"
                required
              />

              <v-text-field
              validate-on-blur
                label="Password"
                name="password"
                :rules="passwordRules"
                v-model="password"
                :counter="6"
                prepend-icon="mdi-lock"
                type="password"
                required
              />
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" :disabled="!valid" @click="onSubmit">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Name is required',
        v => (v && v.length >= 6) || 'Password must be more than 6 characters',
      ],
    }
  },
  methods: {
      validate () {
        
      },
      onSubmit() {
        if (!(this.$refs.form.validate())) return false;
        let user = {
          email: this.email,
          password: this.password,
        }
        console.log(user);
      },
    },
}
</script>