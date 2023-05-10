import React, { useReducer, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Restaurants from './Restaurants';
import Reservations from './Reservations';
import BookingPage from './BookingPage';
import { fetchAPI } from '../api/api';
import ConfirmedBooking from './ConfirmedBooking';

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return {
        ...state,
        availableTimes: action.payload
      };

    default:
      throw new Error('Unexpected action type');
  }
}

function Main({ bookings, setBookings }) {
  const [state, dispatch] = useReducer(reducer, { availableTimes: [] });

  useEffect(() => {
    const currentDate = new Date();
    const dateString = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(currentDate.getDate()).padStart(2, "0")}`;
    
    fetchAPI(dateString).then((times) => {
      dispatch({ type: 'UPDATE_TIMES', payload: times });
    });
  }, []);

  return (
    <main>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/confirmed" element={<ConfirmedBooking />} />
          <Route
            path="/booking"
            element={
              <BookingPage
                bookings={bookings}
                setBookings={setBookings}
                availableTimes={state.availableTimes}
                dispatch={dispatch}
              />
            }
          />
        </Routes>
      </Router>
    </main>
  );
}

export default Main;
