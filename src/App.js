import React, { useState } from 'react';
import Header from './components/Header';
import Nav from './components/Nav';
import Main from './components/Main';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [bookings, setBookings] = useState([]);

  return (
    <>
      <Header />
      <Nav />
      <Main bookings={bookings} setBookings={setBookings} />
      <Footer />
    </>
  );
}

export default App;
