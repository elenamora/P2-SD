<template>
  <div>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">

      <b-form-group id="input-group-1" label="Your Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="addUserForm.username"
          required
          placeholder="Enter username"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="Password:"
        label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="addUserForm.password"
          type="password"
          required
          placeholder="Enter password"
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
      addUserForm: {
        username: '',
        password: ''
      },
      show: true
    }
  },
  methods: {
    initForm () {
      this.addUserForm.username = ''
      this.addUserForm.password = ''
    },
    onSubmit (evt) {
      evt.preventDefault()
      this.createAccount()
      alert('Account Created')
      this.$router.replace({ path: '/userlogin' })
    },
    onReset (evt) {
      evt.preventDefault()
      // Reset our form values
      this.addUserForm.username = ''
      this.addUserForm.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    createAccount () {
      const path = 'https://grupa7sd-eventright.herokuapp.com/account'
      axios.post(path, this.addUserForm)
        .then(() => {
          console.log('Account Created')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          alert('Account already exists')
          this.onReset()
        })
    }
  }
}
</script>
