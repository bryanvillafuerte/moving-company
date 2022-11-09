<template>
  <v-container class="form-wrapper mt-6">
    <v-row class="heading mb-12">
      <h1 class="text-h2">Add new order</h1>
    </v-row>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="submit-form"
    >
      <div class="mb-0 form-group-header">
        <v-icon dense>mdi-account</v-icon>
        <h4 class="font-weight-regular ml-1">Customer details</h4>
      </div>
      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="number"
        :rules="numberRules"
        label="Phone number"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-row class="mt-4 mb-4">
        <v-col>
          <div class="mb-0 form-group-header">
            <v-icon dense>mdi-home-export-outline</v-icon>
            <h4 class="font-weight-regular ml-1">Current address</h4>
          </div>
          <v-text-field
            v-model="currentAddress.street"
            :rules="streetRules"
            label="Street name"
            required
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                v-model="currentAddress.postCode"
                :rules="postCodeRules"
                label="Post code"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="currentAddress.city"
                :rules="cityRules"
                label="City"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
        <v-col>
          <div class="mb-0 form-group-header">
            <v-icon dense>mdi-home-import-outline</v-icon>
            <h4 class="font-weight-regular ml-1">New address</h4>
          </div>
          <v-text-field
            v-model="newAddress.street"
            :rules="streetRules"
            label="Street name"
            required
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                v-model="newAddress.postCode"
                :rules="postCodeRules"
                label="Post code"
                required
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="newAddress.city"
                :rules="cityRules"
                label="City"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-checkbox
        v-model="packing"
        label="Include packing?"
      ></v-checkbox>

      <v-checkbox
        v-model="cleaning"
        label="Include cleaning?"
      ></v-checkbox>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="validate"
      >
        Submit
      </v-btn>

      <v-btn
        color="error"
        class="mr-4"
        @click="reset"
      >
        Clear Form
      </v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'IndexPage',
  data: () => ({
    valid: true,
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
    ],
    number: '',
    numberRules: [
      v => !!v || 'Phone number is required',
      v => (v && v.length === 8) || 'Phone number must be exactly 8 digits',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
    ],
    currentAddress: {
      street: '',
      postCode: '',
      city: ''
    },
    newAddress: {
      street: '',
      postCode: '',
      city: ''
    },
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
    packing: false,
    cleaning: false,
  }),

  methods: {
    validate () {
      this.$refs.form.validate()
    },
    reset () {
      this.$refs.form.reset()
    }
  },
}
</script>

<style lang="scss" scoped>
.form-wrapper {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;

  .submit-form {
    .form-group-header {
      display: flex;
    }
  }
}
</style>
