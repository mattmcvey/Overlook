import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/Customer'

describe("Customer", function() {
  let customer, bookings;
  beforeEach(() => {
    customer = new Customer({id: 1, name: "Leatha Ullrich"})
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
  })
  it('should have an id', function() {
    expect(customer.id).to.equal(1);
  });
  it('should have a name', function() {
    expect(customer.name).to.equal("Leatha Ullrich")
  });
  it('should have customerBookings set to an empty array', function() {
    expect(customer.customerBookings).to.deep.equal([])
  });
  it('should have a default of 0 for totalSpent', function() {
    expect(customer.totalSpent).to.equal(0)
  });
  it('should find all customer bookings' , function() {
    expect(customer.findCustomerBookings(bookings)).to.deep.equal([{id: "5fwrgu4i7k55hl6sz", userID: 1, date: "2020/04/22", roomNumber: 15, roomServiceCharges: Array(0)}, {id: "5fwrgu4i7k55hl6t8", userID: 1, date: "2020/02/05", roomNumber: 12, roomServiceCharges: Array(0)}, {id: "5fwrgu4i7k55hl6tb", userID: 1, date: "2020/02/06", roomNumber: 5, roomServiceCharges: Array(0)}])
  });
  if('should calculate total spent on rooms', function() {
    
  })
});
