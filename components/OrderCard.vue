<template>
  <v-card>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-2">
          <template>Order number:</template>
          <template>{{ orderNumber }}</template>
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{ customerName }}
        </v-list-item-title>
        <v-list-item-subtitle>
          <v-icon dense>mdi-cellphone</v-icon>
          <template>+47 {{ number }}</template>
        </v-list-item-subtitle>
        <v-list-item-subtitle>
          <v-icon dense>mdi-email-outline</v-icon>
          <template>{{ email }}</template>
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        rounded
        size="40"
        :color="status ? 'green accent-1' : 'red lighten-4'"
      >
        <v-icon>mdi-package-variant</v-icon>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-spacer />
      <v-btn :disabled="!status" text color="primary">
        Edit order
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "OrderCard",
  props: {
    orderNumber: "",
    customerName: "",
    customerEmailAddress: "",
    number: "",
    email: "",
    status: Boolean
  }
}
</script>

<style scoped>

</style>
