<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input-group-1" label="Artist Id:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="updateArtistForm.artist_id"
          required
          placeholder="Enter Artist Id"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Artist Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="updateArtistForm.name"
          required
          placeholder="Enter Artist Name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-3" label="Country Artist:" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="updateArtistForm.country"
          required
          placeholder="Enter country"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Genre Artist:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="updateArtistForm.date"
          required
          placeholder="Enter Genre"
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
      updateArtistForm: {
        artist_id: '',
        name: '',
        country: '',
        genre: ''
      },
      show: true
    }
  },
  methods: {
    initForm () {
      this.updateArtistForm.name = ''
      this.updateArtistForm.country = ''
      this.updateArtistForm.genre = ''
    },
    onSubmit (evt) {
      evt.preventDefault()
      const parameters = {
        name: this.updateArtistForm.name,
        country: this.updateArtistForm.country,
        genre: this.updateArtistForm.genre
      }
      this.updateArtist(parameters)
      alert('Artist Updated')
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
    updateArtist (parameters) {
      const path = 'https://grupa7test-eventright.herokuapp.com/artist/' + this.updateArtistForm.artist_id
      axios.put(path, parameters, {
        auth: {username: this.token}
      })
        .then(() => {
          console.log('Artist Updated')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          alert('Artist already exists')
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
