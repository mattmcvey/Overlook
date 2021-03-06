import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/Booking'

describe("Booking", function() {
  let booking, bookings, rooms;
  beforeEach(() => {
    bookings =[
      {id: "5fwrgu4i7k55hl6sz", userID: 1, date: "2020/04/22", roomNumber: 15, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6t5", userID: 43, date: "2020/01/24", roomNumber: 24, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6t6", userID: 13, date: "2020/01/10", roomNumber: 12, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6t7", userID: 20, date: "2020/02/16", roomNumber: 7, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6t8", userID: 1, date: "2020/02/05", roomNumber: 12, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6t9", userID: 38, date: "2020/02/14", roomNumber: 14, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6ta", userID: 25, date: "2020/01/11", roomNumber: 9, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6tb", userID: 1, date: "2020/02/06", roomNumber: 5, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6tc", userID: 22, date: "2020/01/30", roomNumber: 13, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6td", userID: 27, date: "2020/01/31", roomNumber: 20, roomServiceCharges: Array(0)}
    ]
    rooms = [
      {number: 1, roomType: "residential suite", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 358.4},
      {number: 12, roomType: "suite", bidet: false, bedSize: "full", numBeds: 2, costPerNight: 358.4},
      {number: 3, roomType: "single room", bidet: false, bedSize: "king", numBeds: 1, costPerNight: 358.4},
      {number: 4, roomType: "single room", bidet: false, bedSize: "queen", numBeds: 1, costPerNight: 358.4},
      {number: 15, roomType: "single room", bidet: true, bedSize: "queen", numBeds: 2, costPerNight: 200},
      {number: 5, roomType: "junior suite", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 700},
      {number: 7, roomType: "single room", bidet: false, bedSize: "queen", numBeds: 2, costPerNight: 358.4},
      {number: 8, roomType: "junior suite", bidet: false, bedSize: "king", numBeds: 1, costPerNight: 358.4},
      {number: 9, roomType: "single room", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 358.4},
      {number: 10, roomType: "suite", bidet: false, bedSize: "twin", numBeds: 1, costPerNight: 358.4}
    ]
    booking = new Booking(bookings, rooms)
  })
  it('should be a function', function() {
    expect(Booking).to.be.a('function')
  });
  it('should be an instance Customer', function() {
    expect(booking).to.be.an.instanceof(Booking)
  });
  it('should hold all bookings', function() {
    expect(booking.bookings).to.deep.equal([
      {id: "5fwrgu4i7k55hl6sz", userID: 1, date: "2020/04/22", roomNumber: 15, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6t5", userID: 43, date: "2020/01/24", roomNumber: 24, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6t6", userID: 13, date: "2020/01/10", roomNumber: 12, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6t7", userID: 20, date: "2020/02/16", roomNumber: 7, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6t8", userID: 1, date: "2020/02/05", roomNumber: 12, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6t9", userID: 38, date: "2020/02/14", roomNumber: 14, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6ta", userID: 25, date: "2020/01/11", roomNumber: 9, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6tb", userID: 1, date: "2020/02/06", roomNumber: 5, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6tc", userID: 22, date: "2020/01/30", roomNumber: 13, roomServiceCharges: Array(0)},
      {id: "5fwrgu4i7k55hl6td", userID: 27, date: "2020/01/31", roomNumber: 20, roomServiceCharges: Array(0)}
    ])
  });
  it('should hold all the rooms', function() {
    expect(booking.rooms).to.deep.equal([
      {number: 1, roomType: "residential suite", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 358.4},
      {number: 12, roomType: "suite", bidet: false, bedSize: "full", numBeds: 2, costPerNight: 358.4},
      {number: 3, roomType: "single room", bidet: false, bedSize: "king", numBeds: 1, costPerNight: 358.4},
      {number: 4, roomType: "single room", bidet: false, bedSize: "queen", numBeds: 1, costPerNight: 358.4},
      {number: 15, roomType: "single room", bidet: true, bedSize: "queen", numBeds: 2, costPerNight: 200},
      {number: 5, roomType: "junior suite", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 700},
      {number: 7, roomType: "single room", bidet: false, bedSize: "queen", numBeds: 2, costPerNight: 358.4},
      {number: 8, roomType: "junior suite", bidet: false, bedSize: "king", numBeds: 1, costPerNight: 358.4},
      {number: 9, roomType: "single room", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 358.4},
      {number: 10, roomType: "suite", bidet: false, bedSize: "twin", numBeds: 1, costPerNight: 358.4}
    ])
  });
  it('availableRooms should start as an empty array', function() {
    expect(booking.availableRooms).to.deep.equal([])
  });
  it('unavailableRooms should start as an empty array', function() {
    expect(booking.unavailableRooms).to.deep.equal([])
  });
  it('should give back data of available rooms on given date', function() {
    expect(booking.filterRoomsByDate("2020/01/10")).to.deep.equal([
      {number: 1, roomType: "residential suite", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 358.4},
      {number: 3, roomType: "single room", bidet: false, bedSize: "king", numBeds: 1, costPerNight: 358.4},
      {number: 4, roomType: "single room", bidet: false, bedSize: "queen", numBeds: 1, costPerNight: 358.4},
      {number: 15, roomType: "single room", bidet: true, bedSize: "queen", numBeds: 2, costPerNight: 200},
      {number: 5, roomType: "junior suite", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 700},
      {number: 7, roomType: "single room", bidet: false, bedSize: "queen", numBeds: 2, costPerNight: 358.4},
      {number: 8, roomType: "junior suite", bidet: false, bedSize: "king", numBeds: 1, costPerNight: 358.4},
      {number: 9, roomType: "single room", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 358.4},
      {number: 10, roomType: "suite", bidet: false, bedSize: "twin", numBeds: 1, costPerNight: 358.4}
    ]);
  });
  it('should give back filtered rooms for a different date', function() {
    expect(booking.filterRoomsByDate("2020/04/22")).to.deep.equal([
      {number: 1, roomType: "residential suite", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 358.4},
      {number: 12, roomType: "suite", bidet: false, bedSize: "full", numBeds: 2, costPerNight: 358.4},
      {number: 3, roomType: "single room", bidet: false, bedSize: "king", numBeds: 1, costPerNight: 358.4},
      {number: 4, roomType: "single room", bidet: false, bedSize: "queen", numBeds: 1, costPerNight: 358.4},
      {number: 5, roomType: "junior suite", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 700},
      {number: 7, roomType: "single room", bidet: false, bedSize: "queen", numBeds: 2, costPerNight: 358.4},
      {number: 8, roomType: "junior suite", bidet: false, bedSize: "king", numBeds: 1, costPerNight: 358.4},
      {number: 9, roomType: "single room", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 358.4},
      {number: 10, roomType: "suite", bidet: false, bedSize: "twin", numBeds: 1, costPerNight: 358.4}
    ]);
  });
  it('should filter rooms by a given type', function() {
    booking.filterRoomsByDate("2020/04/22")
    expect(booking.filterByRoomType("single room")).to.be.deep.equal([
      {number: 3, roomType: "single room", bidet: false, bedSize: "king", numBeds: 1, costPerNight: 358.4},
      {number: 4, roomType: "single room", bidet: false, bedSize: "queen", numBeds: 1, costPerNight: 358.4},
      {number: 7, roomType: "single room", bidet: false, bedSize: "queen", numBeds: 2, costPerNight: 358.4},
      {number: 9, roomType: "single room", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 358.4}
    ]);
  });
  it('should filter rooms by a different type', function() {
    booking.filterRoomsByDate("2020/04/22")
    expect(booking.filterByRoomType("junior suite")).to.be.deep.equal([
      {number: 5, roomType: "junior suite", bidet: true, bedSize: "queen", numBeds: 1, costPerNight: 700},
      {number: 8, roomType: "junior suite", bidet: false, bedSize: "king", numBeds: 1, costPerNight: 358.4}
    ])
  })
})
