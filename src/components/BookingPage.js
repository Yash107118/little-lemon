import React from 'react';
import BookingForm from './BookingForm';

function BookingPage({ bookings, setBookings, availableTimes, dispatch }) {
  return (
    <div>
      <h1>Book a Table</h1>
      <BookingForm bookings={bookings} setBookings={setBookings} availableTimes={availableTimes} dispatch={dispatch} />
    </div>
  );
}

export default BookingPage;
