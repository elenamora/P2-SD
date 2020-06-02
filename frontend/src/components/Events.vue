<template>
  <div id="app" v-if="showGlobal">
    <div class="row mt-3 mb-3">
      <div class="col-9">
        <h1> {{ message }} </h1>
      </div>
      <div class="col-3" style="text-align:left;">
        <div class="row mb-2">
          <div v-if="logged">
            <button id="logout" class="btn btn-danger btn-lg" @click="login"> Logout </button>
          </div>
          <div v-else>
            <button id="login" class="btn btn-success btn-lg" @click="login"> Login </button>
          </div>
        </div>
        <div class="row">
          <h4 v-if="logged && is_admin==0"> Total tickets bought: {{ total_tickets_bought }} </h4>
        </div>
        <div class="row">
          <h4 v-if="logged && is_admin==0"> Money available: {{ money }} </h4>
        </div>
      </div>
    </div>

    <div>

      <div class="container">
      <div class="row">
        <div class="col-12">
          <button id="create" class="btn btn-success btn-lg" @click="create" v-if="logged && is_admin==1"> Create new Event </button>
          <button id="update" class="btn btn-primary btn-lg" @click="update" v-if="logged && is_admin==1"> Update Event </button>

          <button id="createArtist" class="btn btn-success btn-lg" @click="createArtist" v-if="logged && is_admin==1"> Add Artist </button>
          <button id="updateArtist" class="btn btn-primary btn-lg" @click="updateArtist" v-if="logged && is_admin==1"> Update Artist </button>

          <button id="events_cart" class="btn btn-success btn-lg" @click="updateShow" v-if="logged && is_admin==0 && show">See Cart</button>
        </div>
      </div>
      </div>

      <div class="mt-5" id='cards' v-if="show">
        <section class="parallax">
          <div class="parallax-inner" style="padding-top: 5%;padding-bottom: 5%;">
            <div class="container">
              <div class="row">
                <div class="col-lg-4 col-md-6 mb-4" v-for="(event) in events" :key="event.id">
                  <div class="h-100">
                  <div class="flip-card">
                    <div class="flip-card-inner">
                      <div class="flip-card-front">
                        <img class="card-img-top" :src="require('../assets/image' + event.id + '.jpg')" alt="Event">
                        <div class="card-body">
                          <h1 class="card-title pt-5" style="font-size: 300%">{{ event.name }}</h1>
                          <br>
                          <h4 class="card-subtitle"><span><strong>Price:</strong></span> {{ event.price }} €</h4>
                          <br>
                          <h3 v-if="event.total_available_tickets > 0"><strong> {{ event.total_available_tickets }} </strong></h3>
                          <img v-if="event.total_available_tickets == 0" src="../assets/sold.png" alt="Sold OUT" style="width:70%;">
                        </div>
                      </div>
                      <div class="card-body flip-card-back">
                        <br>
                        <h1 class="card-title">{{ event.name }}</h1>
                        <hr>
                        <div v-for="(artist) in event.artists" :key="artist.id">
                            <h3 class="text-muted">{{ artist.name }}</h3>
                        </div>
                        <h6 class="mt-2">{{ event.city }}</h6>
                        <h6>{{ event.place }}</h6>
                        <h5>{{ event.date }}</h5>
                        <h4 class="card-subtitle pt-2"><span><strong>Price:</strong></span> {{ event.price }} €</h4>
                        <h3 class="pt-2" v-if="event.total_available_tickets > 0"><strong> {{ event.total_available_tickets }} </strong></h3>
                        <br>
                        <b-button id="add" class="btn btn-success btn-lg mt-2 w-100" @click="addEvent(event)" v-if="logged && is_admin==0 && event.total_available_tickets > 0"> Add Event </b-button>
                        <img v-if="logged && is_admin==0 && event.total_available_tickets == 0" src="../assets/sold.png" alt="Sold OUT" style="width:70%;">
                        <b-button id="addArtist" class="btn btn-success btn-lg mt-2 w-100" @click="eventWhereModifyArtist(event, 0)" v-if="logged && is_admin==1"> Add Artist to Event </b-button>
                        <b-button id="deleteArtist" class="btn btn-danger btn-lg mt-2 w-100" @click="eventWhereModifyArtist(event, 1)" v-if="logged && is_admin==1"> Delete Artist in Event </b-button>
                        <b-button id="deleteEvent" class="btn btn-danger btn-lg mt-2 w-100" @click="removeEvent(event.id)" v-if="logged && is_admin==1"> Delete Event </b-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>
      </div>

      <div v-else>
        <div class="container mt-5" id="cart" v-if="logged && is_admin==0">
              <table class="table">
                <thead class="text-muted thead-light">
                    <tr>
                      <th>Event Name</th>
                      <th>Quantity</th>
                      <th>Price(€)</th>
                      <th>Total</th>
                      <th></th>
                    </tr>
                </thead>
                <tbody v-for="(event) in events_added" :key="event.id">
                    <tr>
                      <td scope="row" data-th="Event Name">{{ event.name }}</td>
                      <td data-th="Quantity"> {{ event.quantity }}
                        <button id="return" class="btn btn-success btn-lg" @click="returnTickets(event)"> - </button>
                        <button id="buy" class="btn btn-success btn-lg" @click="buyTickets(event)" :disabled="itemIsDisabled(event)"> + </button>
                      </td>
                      <td data-th="Price(€)">{{ event.price }}</td>
                      <td data-th="Total">{{ event.quantity * event.price }}</td>
                      <td class="actions" data-th=""><button class="btn btn-danger btn-sm" @click="deleteOrder">Remove</button></td>
                    </tr>
                 </tbody>
                 <tfoot>
                    <tr>
                        <td><button id="continue" class="btn btn-success btn-lg" @click="updateShow">Continue shopping</button></td>
                        <td><button id="finish" class="btn btn-success btn-block" @click="finalizePurchase">Finish Purchase</button></td>
                    </tr>
                 </tfoot>
              </table>
        </div>
      </div>

      <div id="addArtistToEvent" class="container" v-if="showAddArtist">
        <h3 class="mt-5"> Add Artist to Event</h3>
        <hr class="mb-3">
        <b-form class="mb-5" @submit="onSubmitAddArtistInEvent" @reset="onResetAddArtistInEvent" v-if="show" ref="addArtistModal">

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

          <b-button class="mt-2" type="submit" variant="primary">Submit</b-button>
          <b-button class="mt-2" type="reset" variant="danger">Reset</b-button>
          <b-button id="back1" class="btn btn-secondary mt-2" @click="getBack">Back</b-button>
        </b-form>

      </div>

      <div id="deleteArtistToEvent" class="container" v-if="showDeleteArtist">
        <h3 class="mt-5"> Delete Artist from Event</h3>
        <hr class="mb-3">
        <b-form class="mb-5" @submit="onSubmitDeleteArtistInEvent" @reset="onResetAddArtistInEvent" v-if="show" ref="deleteArtistModal">
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
          <b-button id="back2" class="btn btn-secondary" @click="getBack">Back</b-button>
        </b-form>
      </div>
    </div>

  </div>
</template>

<style>
.flip-card {
  background-color: transparent;
  width: 300px;
  height: 620px;
  perspective: 1000px;
}
.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}
.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.flip-card-front {
  background-color: white;
  color: black;
}
.flip-card-back {
  background-color: white;
  color: black;
  transform: rotateY(180deg);
}
.parallax {
   background: url('../assets/concert2.jpg') repeat fixed 100%;
}

.card-img-top {
    width: 100%;
    height: 20vw;
    object-fit: cover;
}
</style>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      message: 'Tickets',
      tickets_bought: 0,
      money: 0,
      price: 10,
      events_added: [],
      i: 0,
      events: [],
      total_tickets_bought: 0,
      show: true,
      showAddArtist: false,
      showDeleteArtist: false,
      showGlobal: true,
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
    buyTickets (eventAdd) {
      const index = this.events_added.indexOf(eventAdd)
      this.events_added[index].quantity += 1
      this.show = true
      this.$nextTick(() => {
        this.show = false
      })
    },
    returnTickets (eventReturn) {
      const index = this.events_added.indexOf(eventReturn)
      this.events_added[index].quantity -= 1
      if (this.events_added[index].quantity === 0) {
        this.events_added.splice(index, 1)
      }
      this.show = true
      this.$nextTick(() => {
        this.show = false
      })
    },
    addEvent (event) {
      if (this.events_added.indexOf(event) === -1) {
        event['quantity'] = 1
        this.events_added.push(event)
      }
    },
    getEvents () {
      const path = 'https://grupa7test-eventright.herokuapp.com/events'
      axios.get(path)
        .then((res) => {
          this.events = []
          this.events = res.data.events
        })
        .catch((error) => {
          console.error(error)
        })
    },
    updateShow () {
      this.show = !this.show
    },
    getUser () {
      const path1 = 'https://grupa7test-eventright.herokuapp.com/account/' + this.username
      axios.get(path1)
        .then((res) => {
          this.money = res.data.available_money
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
          this.total_tickets_bought = 0
          for (let i = 0; i < res.data.orders.length; i += 1) {
            this.total_tickets_bought += res.data.orders[i].tickets_bought
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },
    getInfo () {
      this.getUser()
      this.getOrders()
    },
    addPurchase (parameters) {
      const path = 'https://grupa7test-eventright.herokuapp.com/order/' + this.username
      axios.post(path, parameters, {
        auth: {username: this.token}
      })
        .then(() => {
          console.log('Order done')
          alert('Order done')
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
        this.addPurchase(parameters)
      }
      this.events_added = []
      this.getEvents()
      this.getUser()
      this.getOrders()
      this.show = true
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
    eventWhereModifyArtist (event, n) {
      this.event_to_modify = event
      if (n === 0) {
        this.showAddArtist = true
      } else {
        this.showDeleteArtist = true
      }
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
      this.showAddArtist = false
      this.getEvents()
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
    deleteArtistInEvent () {
      for (let i = 0; i < this.event_to_modify.artists.length; i += 1) {
        if (this.event_to_modify.artists[i].name.localeCompare(this.deleteArtistForm.name) === 0) {
          this.artist_id = this.event_to_modify.artists[i].id
        }
      }
      const path = 'https://grupa7test-eventright.herokuapp.com/event/' + this.event_to_modify.id + '/artist/' + this.artist_id
      axios.delete(path, {
        auth: {username: this.token}
      })
        .then(() => {
          console.log('Artist Deleted from Event')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          alert('No Artist with this name')
          this.onReset()
        })
    },
    onSubmitDeleteArtistInEvent (evt) {
      evt.preventDefault()
      this.deleteArtistInEvent()
      this.initForm()
      this.showDeleteArtist = false
      this.getEvents()
    },
    removeEvent (id) {
      const path = 'https://grupa7test-eventright.herokuapp.com/event/' + id
      axios.delete(path, {
        auth: {username: this.token}
      })
        .then(() => {
          console.log('Event Deleted')
        })
        .catch((error) => {
          // eslint-disable-next-line
          console.log(error)
          alert('No Event with this name')
        })
    },
    getBack () {
      this.initForm()
      this.showAddArtist = false
      this.showDeleteArtist = false
    },
    deleteOrder (eventDelete) {
      this.events_added.splice(this.events_added.indexOf(eventDelete), 1)
    },
    itemIsDisabled (eventDis) {
      if (eventDis.total_available_tickets === eventDis.quantity) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    this.logged = this.$route.query.logged
    this.username = this.$route.query.username
    this.is_admin = this.$route.query.is_admin
    this.token = this.$route.query.token
    this.getEvents()
    this.getUser()
    this.getOrders()
  }
}
</script>
