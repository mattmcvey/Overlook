// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Customer from "./Customer"


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
    let customerBookings = customer.findCustomerBookings(allData[1].bookings)
    let totalSpent = customer.calculateAmountSpent(allData[2].rooms)
    console.log(allData[2].rooms)
  })
