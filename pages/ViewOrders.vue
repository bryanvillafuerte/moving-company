<template>
  <v-container class="order-list mt-6 px-xl-16 mx-xl-auto">
    <v-row class="heading mb-12">
      <h1 class="text-h2">Order list</h1>
    </v-row>

    <h3 class="text-h4 mb-4">Open orders</h3>
    <div class="orders-grid mb-16">
      <order-card
        v-for="(order, i) in openOrders"
        :key="i"
        :order-data="order"
      />
    </div>

    <h3 class="text-h4 mb-4">Closed orders</h3>
    <div class="orders-grid">
      <order-card
        v-for="(order, i) in closedOrders"
        :key="i"
        :order-data="order"
      />
    </div>
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
      orders: [],
      openOrders: [],
      closedOrders: []
    }
  },
  async mounted() {
    this.orders = await this.$axios.$get('http://localhost:8080/api/orders')

    this.openOrders = this.orders.filter(order => order.status === "OPEN")
    this.closedOrders = this.orders.filter(order => order.status === "CLOSED")

  }
}
</script>

<style lang="scss" scoped>
  .order-list {
    .orders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      grid-gap: 20px;
    }
  }
</style>
