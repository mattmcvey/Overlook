// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import moment from "moment"
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Customer from "./Customer"

const roomNumber = document.getElementById('roomNumber')
const dateStayed = document.getElementById('dateStayed')
const totalCost = document.getElementById('totalSpent')
const date = document.querySelector('.date')
const startingValueDate = document.querySelector('input[type="date"]')
const roomTypeDropDown = document.querySelector('.roomType')
const dateInput = document.querySelector('.date-input')
const roomsAvailable = document.querySelector('.available-rooms')
const availableRoomNumber = document.querySelector('.room-number')
const availableRoomType = document.querySelector('.room-type')
const availableRoomBidet = document.querySelector('.bidet')
const availableRoomBedSize = document.querySelector('.bed-size')
const availableRoomNumBeds = document.querySelector('.num-beds')
const availableRoomCost = document.querySelector('.cost')

const todaysDate = new Date()
const formattedDate = moment(todaysDate).format('YYYY/MM/DD')
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
    roomTypeDropDown.addEventListener('change', filterRoomsByType)
    date.addEventListener('change', function() {
      filterMatchingRooms(customer, bookingData, roomData)
    })
    updateCalendarDay()
  })

const displayBookedRooms = (customer, bookingData) => {
  const bookings = customer.findCustomerBookings(bookingData)
  bookings.forEach(booking => {
    roomNumber.innerHTML +=
      `<article class="booked-rooms left">${booking.roomNumber}</article>`
      dateStayed.innerHTML +=
      `<article class="booked-rooms">${booking.date}</article>`
  })
}

const costOfAllRooms = (customer, roomData) => {
  const total = customer.calculateAmountSpent(roomData)
  totalCost.innerHTML =
    `<article class="total-spent">$${total}</article>`
}

const updateCalendarDay = () => {
  console.log(formattedDate)
  // date.innerHTML = `
  // <label for="date">Select A Date</label>
  // <input type="date" class="date-input" name="book-date"  min="${formattedDate}">`
}

const filterMatchingRooms = (customer, bookings, rooms) => {
  const inputDate = dateInput.value.split("-").join("/")
  if(inputDate < formattedDate) {
    roomsAvailable.innerText = "Please select a room in the  future!"
  } else {
    displayAvailableRooms(customer, bookings, rooms, inputDate)
  }
}

const displayAvailableRooms = (customer, bookings, rooms, date) => {
  availableRoomNumber.innerHTML = ''
  availableRoomType.innerHTML = ''
  availableRoomBidet.innerHTML = ''
  availableRoomBedSize.innerHTML = ''
  availableRoomNumBeds.innerHTML = ''
  availableRoomCost.innerHTML = ''
  customer.filterRoomsByDate(bookings, rooms, date).forEach(room => {
    if(room.bidet === true) {
      room.bidet = "Yes"
    } else {
      room.bidet = "No"
    }
    availableRoomNumber.innerHTML +=
    `<article class="room-number">${room.number}</article>`
    availableRoomType.innerHTML +=
    `<article class="room-number">${room.roomType}</article>`
    availableRoomBidet.innerHTML +=
    `<article class="room-number">${room.bidet}</article>`
    availableRoomBedSize.innerHTML +=
    `<article class="room-number">${room.bedSize}</article>`
    availableRoomNumBeds.innerHTML +=
    `<article class="room-number">${room.numBeds}</article>`
    availableRoomCost.innerHTML +=
    `<article class="room-number">${room.costPerNight}</article>`
  })
}

const filterRoomsByType = () => {
  console.log(roomType.value)
}
