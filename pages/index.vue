<template>

</template>

<script>
export default {
  name: 'IndexPage',
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
