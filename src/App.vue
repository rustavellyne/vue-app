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
          </v-toolbar-items>
        </v-app-bar>
      </v-card>

    <v-content class="grey lighten-5">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: false,
      links: [
        { title: 'Login', icon: 'mdi-lock', url: '/login' },
        { title: 'Registration', icon: 'mdi-face', url: '/registration' },
        { title: 'Orders', icon: 'mdi-bookmark', url: '/orders' },
        { title: 'New Ad', icon: 'mdi-plus', url: '/new' },
        { title: 'My Ad', icon: 'mdi-format-list-bulleted', url: '/list' },
      ],
    }
  },
} 
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>
