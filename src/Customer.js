class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.customerBookings = [];
    this.totalSpent = 0;
  }
  findCustomerBookings(bookings) {
    this.customerBookings = bookings.filter(booking => booking.userID === this.id)
    return this.customerBookings
  }
  calculateAmountSpent(rooms) {
    const total = rooms.reduce((totalSpent, room) => {
      this.customerBookings.forEach(booking => {
        if(room.number === booking.roomNumber) {
          totalSpent += room.costPerNight
        }
      })
      return totalSpent
    }, 0)
    return total
  }
}


export default Customer;
