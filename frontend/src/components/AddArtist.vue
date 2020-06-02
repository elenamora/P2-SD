<template>
  <div class="container mt-5 mb-5">
    <div class="row">
      <div class="col-12">
        <h1 style="text-align:center">CREATE NEW ARTIST</h1>
        <hr class="mb-5">
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">

          <b-form-group id="input-group-1" label="Artist Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="addArtistForm.name"
              required
              placeholder="Enter Artist Name"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Country Artist:" label-for="input-2">
            <b-form-input
              id="input-2"
              v-model="addArtistForm.country"
              required
              placeholder="Enter country"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Genre Artist:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="addArtistForm.genre"
              required
              placeholder="Enter genre"
            ></b-form-input>
          </b-form-group>

          <b-button type="submit" variant="primary">Submit</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
          <b-button id="back" class="btn btn-secondary" @click="backToEvents">Back</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      addArtistForm: {
        name: '',
        country: '',
        genre: ''
      },
      show: true
    }
  },
  methods: {
    initForm () {
      this.addArtistForm.name = ''
      this.addArtistForm.country = ''
      this.addEvenaddArtistFormtForm.genre = ''
    },
    onSubmit (evt) {
      evt.preventDefault()
      const parameters = {
        name: this.addArtistForm.name,
        country: this.addArtistForm.country,
        genre: this.addArtistForm.genre
      }
      this.createArtist(parameters)
      alert('Artist Created')
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
    createArtist (parameters) {
      const path = 'https://grupa7test-eventright.herokuapp.com/artist'
      axios.post(path, parameters, {
        auth: {username: this.token}
      })
        .then(() => {
          console.log('Artist Created')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          alert('Artist already exists')
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
