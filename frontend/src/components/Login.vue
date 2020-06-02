<template>
  <div class="row" style="background-color: #E0E0E0">
    <div class="col-8">
      <img src="../assets/concert.jpg" alt="Concert" style="width: 100%;height:100vh">
    </div>
    <div class="col-4">
      <div class="container mt-5" style="width:400px;">
          <h1 style="text-align:center">SIGN IN</h1>
          <hr class="mb-5">
          <div class="form-label-group">
             <label for="username">Username</label>
             <input type="username" id="inputUsername" class="form-control"
             placeholder="Username" required autofocus v-model="username">
           </div>

           <div class="form-label-group">
             <br>
             <label for="inputPassword">Password</label>
             <input type="password" id="inputPassword" class="form-control"
             placeholder="Password" required v-model="password">
           </div>

           <div class="form-row mt-5">
             <button id="signin" class="btn btn-success btn-lg" @click="checkLogin" style="width:400px;"> Sign In </button>
             <p id="debug"> </p>
           </div>
           <div class="form-row mb-3">
             <button id="createAccount" class="btn btn-primary btn-lg"  @click="createAccount" style="width:400px;"> Create Account </button>
           </div>
           <div class="form-row">
             <button id="back" class="btn btn-secondary btn-lg" @click="backToEvents" style="width:400px;"> Back to events </button>
           </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: ''
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
          this.is_admin = res.data.is_admin
          this.$router.replace({ path: '/', query: { username: this.username, logged: this.logged, is_admin: this.is_admin, token: this.token } })
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
