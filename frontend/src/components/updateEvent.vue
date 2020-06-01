<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input-group-1" label="Event Id:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="updateEventForm.event_id"
          required
          placeholder="Enter Event Id"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Event Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="updateEventForm.name"
          required
          placeholder="Enter Event Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Price:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="updateEventForm.price"
          required
          placeholder="Enter price"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Date:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="updateEventForm.date"
          required
          placeholder="Enter date"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-5" label="Country:" label-for="input-5">
        <b-form-input
          id="input-5"
          v-model="updateEventForm.country"
          required
          placeholder="Enter country"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-6" label="City:" label-for="input-6">
        <b-form-input
          id="input-6"
          v-model="updateEventForm.city"
          required
          placeholder="Enter city"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-7" label="Place:" label-for="input-7">
        <b-form-input
          id="input-7"
          v-model="updateEventForm.place"
          required
          placeholder="Enter place"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-8" label="Tickets:" label-for="input-8">
        <b-form-input
          id="input-8"
          v-model="updateEventForm.total_available_tickets"
          required
          placeholder="Enter tickets"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      <b-button id="back" class="btn btn-secondary" @click="backToEvents">Back</b-button>
    </b-form>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      updateEventForm: {
        event_id: '',
        name: '',
        price: '',
        date: '',
        country: '',
        city: '',
        place: '',
        total_available_tickets: ''
      },
      show: true
    }
  },
  methods: {
    initForm () {
      this.updateEventForm.name = ''
      this.updateEventForm.price = ''
      this.updateEventForm.date = ''
      this.updateEventForm.country = ''
      this.updateEventForm.city = ''
      this.updateEventForm.place = ''
      this.updateEventForm.total_available_tickets = ''
    },
    onSubmit (evt) {
      evt.preventDefault()
      const parameters = {
        place: this.updateEventForm.place,
        name: this.updateEventForm.name,
        city: this.updateEventForm.city,
        date: this.updateEventForm.date,
        price: this.updateEventForm.price,
        total_available_tickets: this.updateEventForm.total_available_tickets
      }
      this.updateEvent(parameters)
      alert('Event Updated')
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
    updateEvent (parameters) {
      const path = 'https://grupa7test-eventright.herokuapp.com/event/' + this.updateEventForm.event_id
      axios.put(path, parameters, {
        auth: {username: this.token}
      })
        .then(() => {
          console.log('Event Updated')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          alert('Event already exists')
          this.onReset()
        })
    },
    backToEvents () {
      this.$router.replace({ path: '/', query: { username: this.username, logged: this.logged, is_admin: this.is_admin, token: this.token } })
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
