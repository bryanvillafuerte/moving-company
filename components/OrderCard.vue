<template>
  <v-card class="order-card">
    <div class="text-overline pa-4" :class="orderStatus ? 'status-open' : 'status-closed'">
      <template>Order number:</template>
      <template>00{{ order.id }}</template>
    </div>

    <v-divider></v-divider>

    <v-list-item three-line class="order-list-item">
      <v-list-item-content v-if="!editDetails">
        <v-list-group v-model="active">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ order.name }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>
                <v-icon dense>mdi-cellphone</v-icon>
                <template>+47 {{ order.phoneNumber }}</template>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-icon dense>mdi-email-outline</v-icon>
                <template>{{ order.email }}</template>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-icon dense>mdi-home-export-outline</v-icon>
                <template>{{ order.currentAddress }}</template>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-icon dense>mdi-home-import-outline</v-icon>
                <template>{{ order.newAddress }}</template>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-subtitle>
              <v-list-item-avatar v-if="order.withPacking" color="cyan lighten-1" size="32" class="mx-0 mr-2">
                <v-icon dense color="white">mdi-package-variant</v-icon>
              </v-list-item-avatar>
              <v-list-item-avatar v-if="order.withCleaning" color="cyan lighten-1" size="32" class="mx-0">
                <v-icon dense color="white">mdi-broom</v-icon>
              </v-list-item-avatar>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list-group>
      </v-list-item-content>

      <v-form
        v-if="editDetails"
        class="pa-4 edit-form"
        ref="form"
        v-model="valid"
        lazy-validation
      >
        <div class="mb-0 form-group-header">
          <v-icon dense>mdi-account</v-icon>
          <h4 class="font-weight-regular ml-1">Customer details</h4>
        </div>
        <v-text-field
          v-model="order.name"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="order.phoneNumber"
          :rules="numberRules"
          label="Phone number"
          required
        ></v-text-field>

        <v-text-field
          v-model="order.email"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <v-text-field
          v-model="order.currentAddress"
          :rules="currentAddressRules"
          label="Current Address"
          required
        ></v-text-field>

        <v-text-field
          v-model="order.newAddress"
          :rules="newAddressRules"
          label="New Address"
          required
        ></v-text-field>

        <v-checkbox
          v-model="order.withPacking"
          label="Include packing?"
        ></v-checkbox>

        <v-checkbox
          v-model="order.withCleaning"
          label="Include cleaning?"
        ></v-checkbox>

        <v-row class="mt-6 pb-4">
          <v-spacer></v-spacer>
          <v-btn
            :disabled="!valid"
            color="primary"
            class="mr-4"
            @click="validate; editDetails = !editDetails; snackbar = true"
          >
            Save Changes
          </v-btn>

          <v-btn
            color="error"
            class="mr-4"
            @click="reset"
          >
            Clear Form
          </v-btn>
        </v-row>
      </v-form>
    </v-list-item>

    <v-divider></v-divider>

    <v-card-actions v-if="!editDetails">
      <v-spacer />
      <v-btn
        text
        :disabled="!orderStatus"
        color="primary"
        @click="editDetails = !editDetails"
      >
        Edit <v-icon right>mdi-pencil-outline</v-icon>
      </v-btn>
    </v-card-actions>

    <v-snackbar v-model="snackbar" :timeout="timeout" absolute top>
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          icon
          v-bind="attrs"
          @click="snackbar = false"
        >
          <v-icon right>mdi-close-circle-outline</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
export default {
  name: "OrderCard",
  data() {
    return {
      order: this.orderData,
      editDetails: false,
      active: false,
      valid: true,
      nameRules: [
        v => !!v || 'Name is required',
      ],
      numberRules: [
        v => !!v || 'Phone number is required',
        v => (v && v.length === 8) || 'Phone number must be exactly 8 digits',
      ],
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      currentAddressRules: [
        v => !!v || 'Current address is required',
      ],
      newAddressRules: [
        v => !!v || 'New address is required',
      ],
      select: null,
      snackbar: false,
      text: 'Changes have been saved.',
      timeout: 2000,
    }
  },
  props: {
    orderData: {},
  },
  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    }
  },
  computed: {
    orderStatus() {
      return this.order.status === "OPEN"
    }
  }
}
</script>

<style lang="scss" scoped>
.order-card {
  height: fit-content;

  .status-open {
    background: #E8F5E9;
  }

  .status-closed {
    background: #FFEBEE;
  }

  .order-list-item {
    padding: 0;
  }

  .edit-form {
    width: 100%;

    .form-group-header {
      display: flex;
    }
  }
}
</style>
