<template>
  <v-card>
    <v-card-title class="text-h5">
      {{ customerName }}
    </v-card-title>

    <v-card-subtitle>
      {{ customerEmailAddress }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn text>
        Listen Now
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "OrderCard",
  props: {
    customerName: "",
    customerEmailAddress: ""
  }
}
</script>

<style scoped>

</style>
