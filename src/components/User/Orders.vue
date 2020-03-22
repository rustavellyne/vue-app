<template>
  <v-container>
    <v-layout row>
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
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      orders: [
        {
          id: 'fd123',
          name: 'Alex',
          phone: '3151020',
          adId: '123',
          done: false,
        },
        {
          id: 'fd1231',
          name: 'new',
          phone: '1233151020',
          adId: '124',
          done: true,
        },
      ],
    }
  },
  methods: {
    markDone (order) {
      order.done = true;
    },
  },
}
</script>