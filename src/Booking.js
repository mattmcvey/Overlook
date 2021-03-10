class Booking {
  constructor(bookings, rooms) {
    this.bookings = bookings;
    this.rooms = rooms;
    this.availableRooms = []
    this.unavailableRooms = []
  }
  filterRoomsByDate(date) {
    this.unavailableRooms = this.bookings.reduce((acc, booking) => {
      this.rooms.forEach(room => {
        if (room.number === booking.roomNumber && date === booking.date) {
          acc.push(room)
        }
      })
      return acc
    }, [])
    this.availableRooms = this.rooms.filter(room => !this.unavailableRooms.includes(room) && !this.availableRooms.includes(room))
    return this.availableRooms
  }
  filterByRoomType(roomType) {
    const filteredAvailableRooms = this.availableRooms.filter(room => room.roomType === roomType)
    return filteredAvailableRooms
  }
}

export default Booking;
