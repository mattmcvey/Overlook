// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import moment from "moment"
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
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

const todaysDate = new Date()
const formattedDate = moment(todaysDate).format('YYYY-MM-DD')
startingValueDate.value = formattedDate
startingValueDate.min = formattedDate

const allCustomersData =
  fetch("http://localhost:3001/api/v1/customers")
    .then(response => response.json())

const allRoomsData =
  fetch("http://localhost:3001/api/v1/rooms")
    .then(response => response.json())

const allBookingsData =
  fetch("http://localhost:3001/api/v1/bookings")
    .then(response => response.json())

Promise.all([allCustomersData, allBookingsData, allRoomsData])
  .then((allData) => {
    const customer = new Customer(allData[0].customers[0])
    const bookingData = allData[1].bookings
    const roomData = allData[2].rooms
    const totalSpent = customer.calculateAmountSpent(allData[2].rooms)
    displayBookedRooms(customer, bookingData)
    costOfAllRooms(customer, roomData, totalSpent)
    searchButton.addEventListener('click', function() {
      filterMatchingRooms(customer, bookingData, roomData)
      filterRoomsByType(customer)
      document.querySelector('.search-results').classList.remove('hidden')
    })
    searchResults.addEventListener('click', function() {
      selectRoomToBook(customer)
    })
    updateUserName(customer)
  })

const updateUserName = (customer) => {
  document.querySelector('.user').innerText = customer.name
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
  console.log(customer)
  const total = customer.calculateAmountSpent(roomData)
  totalCost.innerHTML =
    `<article class="total-spent">$${total}</article>`
}

const filterMatchingRooms = (customer, bookings, rooms) => {
  const inputDate = dateInput.value.split("-").join("/")
  if(inputDate < formattedDate) {
    document.querySelector(".past-date").innerText = "Please select a room in the  future!"
  } else {
    const openRooms = customer.filterRoomsByDate(bookings, rooms, date)
    displayAvailableRooms(openRooms)
  }
}

const filterRoomsByType = (customer) => {
  const type = roomType.value
  if(!customer.availableRooms.length) {
    document.querySelector(".past-date").innerText = "Please choose a date before selecting room type."
  }
  const openRooms = customer.filterByRoomType(type)
  displayAvailableRooms(openRooms)
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
      <p>Bed Siz: ${room.bedSize}</p>
      <p>Number Of Beds: ${room.numBeds}</p>
      <p>Room Cost: $${room.costPerNight}
    </article>`
  })
}

const selectRoomToBook = (customer) => {
  const postInfo = event.target.closest('article')
  const postData = postInfo.id.split('-')
  const dataToPost = {
    "userID": customer.id,
    "date": postData[1],
    "roomNumber": parseInt(postData[0]),
    "roomServiceCharges": []
  }
  bookRoom(dataToPost)
  location.reload()
}

const bookRoom = (dataToPost) => {
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
  .catch(error => {
    console.log(error)
  })
}
