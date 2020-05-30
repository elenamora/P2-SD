<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input-group-1" label="Event Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="addEventForm.name"
          required
          placeholder="Enter Event Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Price:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="addEventForm.price"
          required
          placeholder="Enter price"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Date:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="addEventForm.date"
          required
          placeholder="Enter date"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Country:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="addEventForm.country"
          required
          placeholder="Enter country"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="City:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="addEventForm.city"
          required
          placeholder="Enter city"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="Place:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="addEventForm.place"
          required
          placeholder="Enter place"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-7" label="Tickets:" label-for="input-7">
        <b-form-input
          id="input-7"
          v-model="addEventForm.tickets"
          required
          placeholder="Enter tickets"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      addEventForm: {
        name: '',
        price: '',
        date: '',
        country: '',
        city: '',
        place: '',
        tickets: ''
      },
      show: true
    }
  },
  methods: {
    initForm () {
      this.addEventForm.name = ''
      this.addEventForm.price = ''
      this.addEventForm.date = ''
      this.addEventForm.country = ''
      this.addEventForm.city = ''
      this.addEventForm.place = ''
      this.addEventForm.tickets = ''
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.createEvent()
      alert('Event Created')
      this.$router.replace({ path: '/', query: { username: this.username, logged: this.logged, is_admin: this.is_admin, token: this.token } })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.initForm()
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    createEvent () {
      const path = 'https://grupa7test-eventright.herokuapp.com/event'
      axios.post(path, this.addEventForm, {
        auth: {username: this.token}
      })
        .then(() => {
          console.log('Event Created')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          alert('Event already exists')
          this.onReset()
        })
    }
  },
  created () {
    this.logged = this.$route.query.logged
    this.username = this.$route.query.username
    this.is_admin = this.$route.query.is_admin
    this.token = this.$route.query.token
  }
}
</script>
