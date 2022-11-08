<template>
  <v-container class="form-wrapper mt-6">
    <v-row class="heading mb-12">
      <h1 class="text-h2">Add new order</h1>
    </v-row>

    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
    >
      <v-text-field
        v-model="name"
        :counter="10"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="number"
        :counter="8"
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
        Reset Form
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
      v => (v && v.length <= 10) || 'Name must be less than 10 characters',
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
}
</style>
