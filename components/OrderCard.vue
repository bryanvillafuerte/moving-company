<template>
  <v-card class="order-card">
    <div class="text-overline pa-4" :class="orderStatus ? 'status-open' : 'status-closed'">
      <template>Order number:</template>
      <template>{{ order.orderNumber }}</template>
    </div>

    <v-divider></v-divider>

    <v-list-item three-line class="order-list-item">
      <v-list-item-content v-if="!editDetails">
        <v-list-group v-model="active">
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ order.customerDetails.name }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-subtitle>
                <v-icon dense>mdi-cellphone</v-icon>
                <template>+47 {{ order.customerDetails.phoneNumber }}</template>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-icon dense>mdi-email-outline</v-icon>
                <template>{{ order.customerDetails.emailAddress }}</template>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-icon dense>mdi-home-export-outline</v-icon>
                <template>{{ order.currentAddress.street }},</template>
                <template>{{ order.currentAddress.postCode }}</template>
                <template>{{ order.currentAddress.city }}</template>
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-icon dense>mdi-home-import-outline</v-icon>
                <template>{{ order.newAddress.street }},</template>
                <template>{{ order.newAddress.postCode }}</template>
                <template>{{ order.newAddress.city }}</template>
              </v-list-item-subtitle>
            </v-list-item-content>
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
          v-model="order.customerDetails.name"
          :rules="nameRules"
          label="Name"
          required
        ></v-text-field>

        <v-text-field
          v-model="order.customerDetails.phoneNumber"
          :rules="numberRules"
          label="Phone number"
          required
        ></v-text-field>

        <v-text-field
          v-model="order.customerDetails.emailAddress"
          :rules="emailRules"
          label="E-mail"
          required
        ></v-text-field>

        <div class="mt-4 mb-4">
          <div class="mb-0 form-group-header">
            <v-icon dense>mdi-home-export-outline</v-icon>
            <h4 class="font-weight-regular ml-1">Current address</h4>
          </div>
          <v-text-field
            v-model="order.currentAddress.street"
            :rules="streetRules"
            label="Street name"
            required
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                v-model="order.currentAddress.postCode"
                :rules="postCodeRules"
                label="Post code"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="order.currentAddress.city"
                :rules="cityRules"
                label="City"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

        <div class="mt-4 mb-4">
          <div class="mb-0 form-group-header">
            <v-icon dense>mdi-home-import-outline</v-icon>
            <h4 class="font-weight-regular ml-1">New address</h4>
          </div>
          <v-text-field
            v-model="order.newAddress.street"
            :rules="streetRules"
            label="Street name"
            required
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                v-model="order.newAddress.postCode"
                :rules="postCodeRules"
                label="Post code"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="order.newAddress.city"
                :rules="cityRules"
                label="City"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </div>

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
      streetRules: [
        v => !!v || 'Street name is required',
      ],
      postCodeRules: [
        v => !!v || 'Post code is required',
      ],
      cityRules: [
        v => !!v || 'City is required',
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
    .form-group-header {
      display: flex;
    }
  }
}
</style>
