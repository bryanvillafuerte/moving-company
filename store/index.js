export const actions = {
  async getOrderList() {
    return await this.$axios.get('/orders');
  }
}
