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
        :order-number="order.orderNumber"
        :customer-name="order.customerDetails.name"
        :number="order.customerDetails.phoneNumber"
        :email="order.customerDetails.emailAddress"
        :status="getStatus(order.status)"
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
  methods: {
    async getOrderList() {
      this.orders = await fetch('http://localhost:3001/mockapi/v1/orders')
        .then(res => res.json())

      this.openOrders = this.orders.filter(order => order.status === "OPEN")
      this.closedOrders = this.orders.filter(order => order.status === "CLOSED")
    },
    getStatus(status) {
      return status === "OPEN";
    }
  },
  async mounted() {
    await this.getOrderList()
  }
}
</script>

<style lang="scss" scoped>
  .order-list {
    .orders-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      grid-gap: 20px;
    }
  }
</style>
