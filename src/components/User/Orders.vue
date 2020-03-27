<template>
  <v-container>
    <v-layout row v-if="!loading && orders.length != 0">
      <v-flex xs12 sm6 offset-sm3>
        <v-list>
          <h1 class="text--secondary pl-5 mb-1">Orders</h1>
            <v-list-item v-for="order in orders" :key="order.id">
              <template>
                <v-list-item-action>
                  <v-checkbox
                    :input-value="order.done"
                    @change="markDone(order)"
                    :readonly="order.done"
                    color="success"
                  ></v-checkbox>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{ order.name }} </v-list-item-title>
                  <v-list-item-subtitle>{{ order.phone }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn class="primary" :to="'ad/' + order.adId">Open</v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
    <v-layout row v-else-if="!loading && orders.length === 0">
      <v-flex xs12 class="text-center">
        <h1 class="text--primary">No Ads</h1>
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
export default {
  methods: {
    markDone (order) {
      this.$store.dispatch('markDoneOrder', order.id)
          .then(() => {
            order.done = true
          })
          .catch(()=>{}) 
    },
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    },
    orders () {
      return this.$store.getters.orders
    },
  },
  created () {
    this.$store.dispatch('fetchOrders')
  },
}
</script>