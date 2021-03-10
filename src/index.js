import './css/base.scss';
import moment from "moment";
import querySelectors from './querySelectors'
import Customer from "./Customer"

const bookedRooms = document.querySelector('.booked-rooms-container')
const roomNumber = document.getElementById('roomNumber')
const dateStayed = document.getElementById('dateStayed')
const totalCost = document.getElementById('totalSpent')
const date = document.querySelector('.date')
const startingValueDate = document.querySelector('input[type="date"]')
const roomTypeDropDown = document.querySelector('.roomType')
const dateInput = document.querySelector('.date-input')
const searchResults = document.querySelector('.search-results-display')
const searchButton = document.querySelector('.submit-search')
const loginButton = document.querySelector('.login-button')
const userName = document.querySelector('.username-login')
const password = document.querySelector('.password-login')
const loginError = document.querySelector('.login-error')
const showBookedRoomsButton = document.querySelector('.show-booked-rooms')
let formattedDate

const findCustomerAndSetDate = () => {
  setDate()
  const userID = userName.value.split('r')
  const loggedInUser = "http://localhost:3001/api/v1/customers/" + userID[1]
  if(userID[0] === 'custome' && parseInt(userID[1]) > 0 &&  parseInt(userID[1]) < 51 && password.value === 'overlook2021'){
    document.querySelector('.login').classList.add('hidden')
    document.querySelector('.customer-landing-page').classList.remove('hidden')
    document.querySelector('.user').classList.remove('hidden')
    fetchData(loggedInUser)
    loginError.classList.add('hidden')
  } else {
    loginError.innerText = 'Please enter a valid username and password!'
  }
}

const setDate = () => {
  const todaysDate = new Date()
  formattedDate = moment(todaysDate).format('YYYY-MM-DD')
  startingValueDate.value = formattedDate
  startingValueDate.min = formattedDate
}

const fetchData = (loggedInUser) => {
  const singleCustomerData =
  fetch(loggedInUser)
  .then(response => response.json())

  const allCustomersData =
  fetch("http://localhost:3001/api/v1/customers")
  .then(response => response.json())

  const allRoomsData =
  fetch("http://localhost:3001/api/v1/rooms")
  .then(response => response.json())

  const allBookingsData =
  fetch("http://localhost:3001/api/v1/bookings")
  .then(response => response.json())

  intiatePromise(allCustomersData, allRoomsData, allBookingsData, singleCustomerData)
}

const intiatePromise = (allCustomersData, allRoomsData, allBookingsData, singleCustomerData) => {
  Promise.all([allCustomersData, allBookingsData, allRoomsData, singleCustomerData])
  .then((allData) => {
    const customer = new Customer(allData[3])
    const bookingData = allData[1].bookings
    const roomData = allData[2].rooms
    const totalSpent = customer.calculateAmountSpent(allData[2].rooms)
    displayBookedRooms(customer, bookingData)
    costOfAllRooms(customer, roomData, totalSpent)
    showBookedRoomsButton.addEventListener('click', toggleProfile)
    searchButton.addEventListener('click', function() {
      filterMatchingRooms(customer, bookingData, roomData)
      filterRoomsByType(customer)
      document.querySelector('.search-results').classList.remove('hidden')
    })
    searchResults.addEventListener('click', function() {
      selectRoomToBook(customer, roomData)
    })
    updateUserName(customer)
  })
}

const updateUserName = (customer) => {
  document.querySelector('.user').innerText = customer.name
}

const toggleProfile = () => {
  document.querySelector('.spent-banner').classList.toggle('hidden')
  document.querySelector('.booked-rooms-banner').classList.toggle('hidden')
  document.querySelector('.total-spent-container').classList.toggle('hidden')
  document.querySelector('.booked-rooms-container').classList.toggle('hidden')
  if( document.querySelector('.spent-banner').classList.contains('hidden')) {
    showBookedRoomsButton.innerText = 'Show My Profile Info'
  } else {
    showBookedRoomsButton.innerText = 'Hide Profile Details'
  }
}

const displayBookedRooms = (customer, bookingData) => {
  const bookings = customer.findCustomerBookings(bookingData)
  bookedRooms.innerHTML += ''
  bookings.forEach(booking => {
    bookedRooms.innerHTML +=
    `<article class="booked-rooms-card">
      <p>Date Of Stay: ${moment(booking.date).format('MM-DD-YYYY')}</p>
      <p>Room Number: ${booking.roomNumber}</p>
    </article>`
  })
}

const costOfAllRooms = (customer, roomData) => {
  const total = customer.calculateAmountSpent(roomData)
  totalCost.innerHTML =
    `<article class="total-spent">$${total}</article>`
}

const filterMatchingRooms = (customer, bookings, rooms) => {
  const inputDate = dateInput.value.split("-").join("/")
  const openRooms = customer.filterRoomsByDate(bookings, rooms, inputDate)
  displayAvailableRooms(openRooms)
}

const filterRoomsByType = (customer) => {
  const type = roomType.value
  const availableRooms = customer.filterByRoomType(type)
  displayAvailableRooms(availableRooms)
}

const displayAvailableRooms = (rooms) => {
  const inputDate = dateInput.value.split("-").join("/")
  searchResults.innerHTML = ''
  rooms.forEach(room => {
    if(room.bidet === true) {
        room.bidet = "Yes"
      } else {
        room.bidet = "No"
      }
    searchResults.innerHTML +=
    `<article class="search-results" id="${room.number}-${inputDate}">
      <p>Room Number: ${room.number}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Bidet: ${room.bidet}</p>
      <p>Bed Size: ${room.bedSize}</p>
      <p>Number Of Beds: ${room.numBeds}</p>
      <p>Room Cost: $${room.costPerNight}
    </article>`
  })
}

const selectRoomToBook = (customer, roomData) => {
  if(!event.target.id) {
    return
  }
  const postInfo = event.target.closest('article')
  const postData = postInfo.id.split('-')
  const dataToPost = {
    "userID": customer.id,
    "date": postData[1],
    "roomNumber": parseInt(postData[0]),
    "roomServiceCharges": []
  }
  displayRoomBooked(dataToPost)
  bookRoom(dataToPost, customer, roomData)
}

const displayRoomBooked = (data) => {
  searchResults.innerHTML = ''
  document.querySelector('.search-results').innerText = 'Room You Booked'
  searchResults.innerHTML =
  `<article class="current-room-booked">Congratulations, you have booked the room below!
    <p>Room Number: ${data.roomNumber}</p>
    <p>Booking Date: ${moment(data.date).format('MM-DD-YYYY')}</p>
  </article>`
}

const bookRoom = (dataToPost, customer, roomData) => {
  fetch("http://localhost:3001/api/v1/bookings", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(dataToPost)
  })
  .then(response => {
    if(!response.ok) {
      throw new Error(response.statusText)
    }
    return response.json()
  })
  .then(res => {
    bookedRooms.innerHTML +=
    `<article class="booked-rooms-card">
      <p>Date Of Stay: ${moment(res.newBooking.date).format('MM-DD-YYYY')}</p>
      <p>Room Number: ${res.newBooking.roomNumber}</p>
    </article>`
  })
  .catch(error => {
    console.log(error)
  })
}

loginButton.addEventListener('click', findCustomerAndSetDate)
showBookedRoomsButton.addEventListener('click', toggleProfile)
