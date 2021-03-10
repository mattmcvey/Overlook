class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.customerBookings = [];
    this.totalSpent = 0;
    this.availableRooms = []
  }
  findCustomerBookings(bookings, rooms) {
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
    const trimmedTotal = total.toFixed(2)
    let totalFormatted = trimmedTotal.toString().split(".");
    totalFormatted[0] = totalFormatted[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return totalFormatted.join(".");
  }
}


export default Customer;
