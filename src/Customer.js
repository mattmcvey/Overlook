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
  filterRoomsByDate(bookings, rooms, date) {
    this.unavailableRooms = bookings.reduce((acc, booking) => {
      rooms.forEach(room => {
        if (room.number === booking.roomNumber && date === booking.date) {
          acc.push(room)
        }
      })
      return acc
    }, [])
    rooms.forEach(room => {
      if (!this.unavailableRooms.includes(room) && !this.availableRooms.includes(room)) {
        this.availableRooms.push(room)
      }
    })
    return this.availableRooms
  }
  filterByRoomType(roomType) {
    const filteredAvailableRooms = this.availableRooms.filter(room => room.roomType === roomType)
    return filteredAvailableRooms
  }
}


export default Customer;
