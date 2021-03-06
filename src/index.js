// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Customer from "./Customer"

const roomNumber = document.getElementById('roomNumber')
const dateStayed = document.getElementById('dateStayed')
const totalCost = document.getElementById('totalSpent')
const date = document.querySelector('.date')
const roomType = document.querySelector('.roomType')

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
    console.log(customer.filterRoomsByDate(bookingData, roomData, "2020/02/14"))
    displayBookedRooms(customer, bookingData)
    costOfAllRooms(customer, roomData, totalSpent)
    roomType.addEventListener('change', filterRoomsByType)
    date.addEventListener('change', displayMatchingRooms)
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
  totalCost.innerHTML +=
    `<article class="total-spent">$${total}</article>`
}

const displayMatchingRooms = () => {

  console.log(date.value.split("-").join("/"))
}

const filterRoomsByType = () => {
  console.log(roomType.value)
}
