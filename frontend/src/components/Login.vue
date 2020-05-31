<template>
  <div class="container">
    <div class="form-label-group">
       <label for="inputEmail">Username</label>
       <input type="username" id="inputUsername" class="form-control"
       placeholder="Username" required autofocus v-model="username">
     </div>

     <div class="form-label-group">
       <br>
       <label for="inputPassword">Password</label>
       <input type="password" id="inputPassword" class="form-control"
       placeholder="Password" required v-model="password">
     </div>

     <div class="row">
       <button id="signin" class="btn btn-success btn-lg" @click="checkLogin" > Sign In </button>
       <p id="debug"> </p>
     </div>
     <div class="row">
       <button id="createAccount" class="btn btn-success btn-lg"  @click="createAccount"> Create Account </button>
     </div>
     <div class="row">
       <button id="back" class="btn btn-success btn-lg" @click="backToEvents" > Back to events </button>
     </div>
     <p id='demo'></p>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: '',
      is_admin: ''
    }
  },
  methods: {
    checkLogin () {
      const parameters = {
        username: this.username,
        password: this.password
      }
      const path = 'https://grupa7test-eventright.herokuapp.com/login'
      axios.post(path, parameters)
        .then((res) => {
          this.logged = true
          this.token = res.data.token
          this.find_match = true
          this.getAccount()
          document.getElementById('demo').innerHTML = 'is admin ' + this.is_admin
          // this.$router.replace({ path: '/', query: { username: this.username, logged: this.logged, is_admin: this.is_admin, token: this.token } })
          alert('User logged in')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.error(error)
          this.user = ''
          alert('Username or Password incorrect')
        })
    },
    getAccount () {
      const path = 'https://grupa7test-eventright.herokuapp.com/account/' + this.username
      axios.get(path)
        .then((res) => {
          this.is_admin = res.data.user.is_admin
          this.is_admin = res.data.user.is_admin
        })
        .catch((error) => {
          console.error(error)
        })
    },
    createAccount () {
      this.$router.replace({ path: '/newaccount' })
    },
    backToEvents () {
      this.logged = false
      this.$router.replace({ path: '/', query: { logged: this.logged } })
    }
  },
  created () {
  }
}
</script>
