<template>
  <v-container>
    <v-row>
      <h1 class="text-md-h1">Order list</h1>
    </v-row>

    <order-card
      v-for="(order, i) in orders"
      :key="i"
      :customer-name="order.customerDetails.name"
      :customer-email-address="order.customerDetails.emailAddress"
    />
  </v-container>
</template>

<script>
import OrderCard from "~/components/OrderCard";

export default {
  name: "ViewOrders",
  components: {
    OrderCard
  },
  data() {
    return {
      orders: []
    }
  },
  async fetch() {
    this.orders = await fetch(
      'http://localhost:3001/orders'
    ).then(res => res.json())
  }
}
</script>

<style scoped>

</style>
