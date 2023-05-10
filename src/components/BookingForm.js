import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { submitAPI } from '../api/api';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import '../styles.css'

// Validation schema with Yup
const validationSchema = Yup.object({
  date: Yup.string().required('Required'),
  time: Yup.string().required('Required'),
  guests: Yup.number().min(1, 'Must be at least 1').required('Required'),
  occasion: Yup.string().required('Required'),
});

function BookingForm({ availableTimes, dispatch }) {
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    const success = await submitAPI(values);
    if (success) {
      let bookings = localStorage.getItem('bookings');
      bookings = bookings ? JSON.parse(bookings) : [];
      bookings.push(values);
      localStorage.setItem('bookings', JSON.stringify(bookings));
      navigate('/confirmed');
    } else {
      alert("There was an error submitting your reservation. Please try again.");
    }
  };

  return (
    <Formik
      initialValues={{ date: '', time: '', guests: 1, occasion: 'Birthday' }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      <Form style={{ display: 'grid', maxWidth: '200px', gap: '20px' }}>
        <fieldset>
            <legend> Reservation Details</legend>
            <label htmlFor="date">Choose date</label>
            <Field type="date" id="date" name="date" />
            <ErrorMessage name="date" component="div" />
        </fieldset>
        
        <label htmlFor="time">Choose time</label>
        <Field as="select" id="time" name="time">
          {Array.isArray(availableTimes) && availableTimes.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Field>
        <ErrorMessage name="time" component="div" />

        <label htmlFor="guests">Number of guests</label>
        <Field type="number" id="guests" name="guests" min="1" max="10" />
        <ErrorMessage name="guests" component="div" />

        <label htmlFor="occasion">Occasion</label>
        <Field as="select" id="occasion" name="occasion">
          <option value="Birthday">Birthday</option>
          <option value="Anniversary">Anniversary</option>
        </Field>
        <ErrorMessage name="occasion" component="div" />

        <button type="submit" aria-label="Make Your Reservation">Make Your Reservation</button>
      </Form>
    </Formik>
  );
}

export default BookingForm;
