<template>
  <div id="app">
    <h1> {{ message }} </h1>
    <button id="buy" class="btn btn-success btn-lg" @click="getInfo"> Info User </button>
    <button id="return" class="btn btn-success btn-lg" @click="getUser" disabled> Info User </button>
    <h4> Total tickets bought: {{ tickets_bought }} </h4>
    <h4> Money available: {{ money }} </h4>

    <button id="login" class="btn btn-success btn-lg" @click="login"> Login </button>

    <button id="create" class="btn btn-success btn-lg" @click="create"> Create new Event </button>
    <button id="update" class="btn btn-success btn-lg" @click="update"> Update Event </button>

    <button id="createArtist" class="btn btn-success btn-lg" @click="createArtist"> Add Artist </button>
    <button id="updateArtist" class="btn btn-success btn-lg" @click="updateArtist"> Update Artist </button>

    <div class="container" id='cards'>
      <button id="events_cart" class="btn btn-success btn-lg" @click="showEventsCart">See Cart</button>
      <div class="row">
        <div class="col-lg-4 col-md-6 mb-4" v-for="(event) in events" :key="event.id">
          <br>
          <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="" alt="Card image cap">
            <div class="card-body">
              <h6>{{ event.name }}</h6>
              <div v-for="(artist) in event.artists" :key="artist.id">
                  <h5>{{ artist.name }}</h5>
              </div>
              <h5>{{ event.country }}</h5>
              <h6>{{ event.city }}</h6>
              <h6>{{ event.place }}</h6>
              <h6>{{ event.date }}</h6>
              <h6>{{ event.price }} €</h6>
              <h5>{{ event.total_available_tickets }} </h5>

              <button id="add" class="btn btn-success btn-lg" @click="addEvent(event)"> Add Event </button>
              <button id="addArtist" class="btn btn-success btn-lg" @click="eventWhereModifyArtist(event)"> Add Artist to Event </button>
              <button id="deleteArtist" class="btn btn-success btn-lg" @click="eventWhereModifyArtist(event)"> Delete Artist in Event </button>
            </div>
            </div>
        </div>
      </div>
    </div>

    <p id='demo'></p>
    <p id='demo2'></p>

    <p id='info1'> </p>
    <p id='info2'>Total tickets bought</p>

    <div class="container" id="cart" disabled>
          <table class="table">
            <thead>
                <tr>
                  <th>Event Name</th>
                  <th>Quantity</th>
                  <th>Price(€)</th>
                  <th>Total</th>
                  <th></th>
                </tr>
            </thead>
            <tbody>
              <div v-for="(event) in events_added" :key="event.id">
                  <tr>
                    <td data-th="Event Name">{{ event.name }}</td>
                    <td data-th="Quantity"> {{ event.quantity }}
                      <button id="buy" class="btn btn-success btn-lg" @click="buyTickets(event)"> + </button>
                      <button id="return" class="btn btn-success btn-lg" @click="returnTickets(event)" disabled> - </button>
                    </td>
                    <td data-th="Price(€)">{{ event.price }}</td>
                    <td data-th="Total">{{ event.quantity }}</td>
                    <td class="actions" data-th=""><button class="btn btn-danger btn-sm">Delete</button></td>
                  </tr>
                </div>
             </tbody>
             <tfoot>
                <tr>
                    <td><button id="continue" class="btn btn-success btn-lg" @click="showEventsCards">Continue shopping</button></td>
                    <td><button id="finish" class="btn btn-success btn-block" @click="finalizePurchase">Finish Purchase</button></td>
                </tr>
             </tfoot>
          </table>

    </div>

    <div id="addArtistToEvent" class="container">
      <b-form @submit="onSubmitAddArtistInEvent" @reset="onResetAddArtistInEvent" v-if="show" ref="addArtistModal">

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
      </b-form>

    </div>

    <div id="deleteArtistToEvent" class="container">
      <b-form @submit="onSubmitDeleteArtistInEvent" @reset="onResetAddArtistInEvent" v-if="show" ref="deleteArtistModal">
        <b-form-group id="input-group-1" label="Artist Name:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="deleteArtistForm.name"
            required
            placeholder="Enter Artist Name"
          ></b-form-input>
        </b-form-group>

        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </div>

  </div>
</template>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #dddddd;
}
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      message: 'My first component',
      tickets_bought: 0,
      money: 200,
      price: 10,
      events_added: [],
      i: 0,
      events: [],
      show: true,
      total_tickets_bought: 0,
      addArtistForm: {
        id: '',
        name: '',
        country: '',
        genre: ''
      },
      deleteArtistForm: {
        id: '',
        name: ''
      }
    }
  },
  methods: {
    initForm () {
      this.addArtistForm.name = ''
      this.addArtistForm.country = ''
      this.addArtistForm.genre = ''
      this.deleteArtistForm.name = ''
    },
    buyTickets (event) {
      const index = this.events_added.indexOf(event)
      this.events_added[index].quantity += 1
      document.getElementById('demo').innerHTML = event.quantity
      if (this.events_added[index].quantity > event.total_available_tickets) {
        document.getElementById('buy').disabled = true
      }
      document.getElementById('return').disabled = false
    },
    returnTickets (event) {
      const index = this.events_added.indexOf(event)
      this.events_added.items[index].quantity -= 1
      if (this.events_added.items[index].quantity === 0) {
        this.events_added.splice(index, 1)
      }
      document.getElementById('buy').disabled = false
    },
    addEvent (event) {
      document.getElementById('demo').innerHTML = event.id
      if (this.events_added.indexOf(event) === -1) {
        event['quantity'] = 1
        this.events_added.push(event)
      }
    },
    getEvents () {
      const path = 'https://grupa7test-eventright.herokuapp.com/events'
      axios.get(path)
        .then((res) => {
          this.events = res.data.events
        })
        .catch((error) => {
          console.error(error)
        })
    },
    showEventsCart () {
      document.getElementById('cart').style.display = 'block'
      document.getElementById('cards').style.display = 'none'
    },
    showEventsCards () {
      document.getElementById('cart').style.display = 'none'
      document.getElementById('cards').style.display = 'block'
    },
    addPurchase (parameters) {
      const path = 'https://grupa7test-eventright.herokuapp.com/order/' + this.username
      axios.post(path, parameters, {
        auth: {username: this.token}
      })
        .then(() => {
          console.log('Order done')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          this.getEvents()
        })
    },
    finalizePurchase () {
      for (let i = 0; i < this.events_added.length; i += 1) {
        const parameters = {
          event_id: this.events_added[i].id,
          tickets_bought: this.events_added[i].quantity
        }
        document.getElementById('demo2').innerHTML = 'parametros'
        this.addPurchase(parameters)
      }
      this.getEvents()
    },
    getUser () {
      const path1 = 'https://grupa7test-eventright.herokuapp.com/account/' + this.username
      axios.get(path1, {
        auth: {username: this.token}
      })
        .then((res) => {
          this.user = res.data.user
          document.getElementById('info1').innerHTML = 'Money available: ' + res.data.user.available_money
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getOrders () {
      const path = 'https://grupa7test-eventright.herokuapp.com/order/' + this.username
      axios.get(path, {
        auth: {username: this.token}
      })
        .then((res) => {
          this.orders = res.data.all_orders
        })
        .catch((error) => {
          console.error(error)
        })
      this.total_tickets_bought = 0
      for (let i = 0; i < this.orders.length; i += 1) {
        this.total_tickets_bought += this.orders[i].tickets_bought
      }
      document.getElementById('info2').innerHTML = 'Total tickets bought: ' + this.total_tickets_bought
    },
    getInfo () {
      this.getUser()
      this.getOrders()
    },
    login () {
      this.$router.replace({ path: '/userlogin' })
    },
    create () {
      this.$router.replace({ path: '/createEvent', query: { username: this.username, logged: this.logged, is_admin: this.is_admin, token: this.token } })
    },
    update () {
      this.$router.replace({ path: '/updateEvent', query: { username: this.username, logged: this.logged, is_admin: this.is_admin, token: this.token } })
    },
    createArtist () {
      this.$router.replace({ path: '/addArtist', query: { username: this.username, logged: this.logged, is_admin: this.is_admin, token: this.token } })
    },
    updateArtist () {
      this.$router.replace({ path: '/updateArtist', query: { username: this.username, logged: this.logged, is_admin: this.is_admin, token: this.token } })
    },
    eventWhereModifyArtist (event) {
      this.event_to_modify = event
    },
    onSubmitAddArtistInEvent (evt) {
      evt.preventDefault()
      const parameters = {
        name: this.addArtistForm.name,
        country: this.addArtistForm.country,
        genre: this.addArtistForm.genre
      }
      this.addNewArtist(parameters)
      this.addArtistInEvent(parameters)
      this.initForm()
    },
    addNewArtist (parameters) {
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
    addArtistInEvent (parameters) {
      const path = 'https://grupa7test-eventright.herokuapp.com/event/' + this.event_to_modify.id + '/artist'
      document.getElementById('demo2').innerHTML = path
      axios.post(path, parameters, {
        auth: {username: this.token}
      })
        .then(() => {
          console.log('Artist Added to Event')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          alert('Artist already added')
          this.onReset()
        })
    },
    onResetAddArtistInEvent (evt) {
      evt.preventDefault()
      // Reset our form values
      this.initForm()
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    },
    onSubmitDeleteArtistInEvent (evt) {
      evt.preventDefault()
      this.deleteArtistInEvent()
      this.initForm()
    },
    deleteArtistInEvent () {
      for (let i = 0; i < this.event_to_modify.artists.length; i += 1) {
        if (this.event_to_modify.artists[i].name.localeCompare(this.deleteArtistForm.name)) {
          this.artist_id = this.event_to_modify.artists[i].id
          document.getElementById('demo2').innerHTML = this.event_to_modify.artists[i].name
        }
      }
      const path = 'https://grupa7test-eventright.herokuapp.com/event/' + this.event_to_modify.id + '/artist/' + this.artist_id
      document.getElementById('demo').innerHTML = path
      axios.delete(path, {
        auth: {username: this.token}
      })
        .then(() => {
          console.log('Artist Deleted to Event')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          alert('No Artist with this name')
          this.onReset()
        })
    }
  },
  created () {
    this.logged = this.$route.query.logged
    this.username = this.$route.query.username
    this.is_admin = this.$route.query.is_admin
    this.token = this.$route.query.token
    this.getEvents()
    document.getElementById('cart').style.display = 'none'
    document.getElementById('cards').style.display = 'block'
  }
}
</script>
