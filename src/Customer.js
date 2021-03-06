class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.customerBookings = [];
    this.totalSpent = 0;
    this.availableRooms = []
    this.unavailableRooms = []
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
  filterRoomsByDate(bookings, rooms, date) {
    

      console.log(unavailableRooms)


    //
    // const this.availableRooms = rooms.reduce((acc, room) => {
    //   bookings.forEach(booking => {
    //     if (!acc.includes(room) && room.number === booking.roomNumber && date !==)
    //   })
    //   return acc
    // }, [])
    // const unavailableRooms = bookings.filter(booking => booking.date === date)
    // console.log(unavailableRooms)
    // rooms.forEach(room => {
    //   unavailableRooms.forEach(bookedRoom => {
    //     if(!unavailableRooms.includes()room.number === bookedRoom.roomNumber && )
    //   })
    // })

    return this.availableRooms
    //input: an array of bookings
    // output: an array of non booked rooms
    // loop over the bookings array
    // if roomNumber does not exist on a specific date
    // push that room to available rooms array
  }
}


export default Customer;
