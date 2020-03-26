<template>
  <v-app>
      <v-navigation-drawer temporary app v-model="drawer" >
        <v-list >
          <v-list-item :to="link.url" v-for="link of links" :key="link.title">
            <v-list-item-icon>
              <v-icon>{{ link.icon }}</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title v-text="link.title"></v-list-item-title>
            </v-list-item-content>
  
          </v-list-item>
          <v-list-item @click="logout" v-if="isUserLoggedIn">
            <v-list-item-icon>
              <v-icon>mdi-exit-to-app</v-icon>
            </v-list-item-icon>
  
            <v-list-item-content>
              <v-list-item-title v-text="'Logout'"></v-list-item-title>
            </v-list-item-content>
  
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-card
        color="grey lighten-4"
        flat
        tile
      >
        <v-app-bar dark app color="primary">
          <v-app-bar-nav-icon 
            @click="drawer = !drawer" 
            class="hidden-md-and-up"
          ></v-app-bar-nav-icon>
          <v-toolbar-title>
            <router-link to="/" tag="span" class="pointer">Ad application</router-link>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items class="hidden-sm-and-down">
            
            <v-btn text small v-for="link of links" :key="link.title" :to="link.url">
              <v-icon left dark>{{ link.icon }}</v-icon>
              {{ link.title }}
            </v-btn>
            <v-btn text small @click="logout" v-if="isUserLoggedIn">
              <v-icon left dark>mdi-exit-to-app</v-icon>
              logout
            </v-btn>
          </v-toolbar-items>
        </v-app-bar>
      </v-card>

    <v-content class="grey lighten-5">
      <router-view></router-view>
    </v-content>

    <template v-if="error">
      <v-snackbar
        :multi-line="true"
        :timeout="5000"
        color="error"
        @input="closeError"
        :value="true"
      >
        {{ error }}
        <v-btn
          dark
          text
          @click.native="closeError"
        >
          Close
        </v-btn>
      </v-snackbar>
    </template>

  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/').catch((error) => {console.log(error)})
    }
  },
  computed: {
    error () {
      return this.$store.getters.error;
    },
    isUserLoggedIn () {
      return this.$store.getters.isLoggedIn
    },
    links () {
      if(this.isUserLoggedIn) {
        return [
          { title: 'Orders', icon: 'mdi-bookmark', url: '/orders' },
          { title: 'New Ad', icon: 'mdi-plus', url: '/new' },
          { title: 'My Ad', icon: 'mdi-format-list-bulleted', url: '/list' },
        ]
      }
      return [
          { title: 'Login', icon: 'mdi-lock', url: '/login' },
          { title: 'Registration', icon: 'mdi-face', url: '/registration' },
        ]
    },
  },
} 
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
