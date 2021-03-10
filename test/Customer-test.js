import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/Customer'

describe("Customer", function() {
  let customer, customer2, bookings, rooms;
  beforeEach(() => {
    customer = new Customer({id: 1, name: "Leatha Ullrich"})
    customer2 = new Customer({id: 2, name: "Doug Phillips"})
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
  })
  it('should be a function', function() {
    expect(Customer).to.be.a('function')
  });
  it('should be an instance Customer', function() {
    expect(customer).to.be.an.instanceof(Customer)
  });
  it('should have an id', function() {
    expect(customer.id).to.equal(1);
  });
  it('should be able to have a different id', function() {
    expect(customer2.id).to.equal(2)
  })
  it('should have a name', function() {
    expect(customer.name).to.equal("Leatha Ullrich")
  });
  it('should be able to have a different name', function() {
    expect(customer2.name).to.equal("Doug Phillips")
  })
  it('should have customerBookings set to an empty array', function() {
    expect(customer.customerBookings).to.deep.equal([])
  });
  it('should have a default of 0 for totalSpent', function() {
    expect(customer.totalSpent).to.equal(0)
  });
  it('should find all customer bookings' , function() {
    expect(customer.findCustomerBookings(bookings)).to.deep.equal([{id: "5fwrgu4i7k55hl6sz", userID: 1, date: "2020/04/22", roomNumber: 15, roomServiceCharges: Array(0)}, {id: "5fwrgu4i7k55hl6t8", userID: 1, date: "2020/02/05", roomNumber: 12, roomServiceCharges: Array(0)}, {id: "5fwrgu4i7k55hl6tb", userID: 1, date: "2020/02/06", roomNumber: 5, roomServiceCharges: Array(0)}])
  });
  it('should calculate total spent on rooms', function() {
    customer.findCustomerBookings(bookings)
    expect(customer.calculateAmountSpent(rooms)).to.equal('1,258.40')
  });
});
