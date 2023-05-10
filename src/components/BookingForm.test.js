import { render, screen, fireEvent } from "@testing-library/react";
import BookingForm from './BookingForm';
import { submitAPI } from "../api/api";

// Mock the submitAPI function
jest.mock('../api/api', () => ({
    submitAPI: jest.fn(),
  }));
  
  describe('BookingForm', () => {
    beforeEach(() => {
      localStorage.clear();
      submitAPI.mockClear();
    });

    test('reads data from localStorage', () => {
        const mockData = { date: '2023-05-10', time: '18:00', guests: 1, occasion: 'Birthday' };
        localStorage.setItem('bookings', JSON.stringify([mockData]));
    
        const { getByLabelText, getByText } = render(<BookingForm />);
        fireEvent.click(getByText('Make Your Reservation'));
    
        expect(localStorage.getItem('bookings')).toContain(JSON.stringify(mockData));
      });
    
      test('writes data to localStorage', async () => {
        const mockData = { date: '2023-05-10', time: '18:00', guests: 1, occasion: 'Birthday' };
        submitAPI.mockResolvedValue(true);
    
        const { getByLabelText, getByText } = render(<BookingForm />);
        fireEvent.change(getByLabelText(/Choose date/i), { target: { value: mockData.date } });
        fireEvent.change(getByLabelText(/Choose time/i), { target: { value: mockData.time } });
        fireEvent.change(getByLabelText(/Number of guests/i), { target: { value: mockData.guests } });
        fireEvent.change(getByLabelText(/Occasion/i), { target: { value: mockData.occasion } });
        fireEvent.click(getByText('Make Your Reservation'));
    
        await waitFor(() => expect(localStorage.getItem('bookings')).toContain(JSON.stringify(mockData)));
      });
    });

test("Renders the BookingForm label for the date input", () => {
    render(<BookingForm />);
    const dateInputLabel = screen.getByText("Choose date");
    expect(dateInputLabel).toBeInTheDocument();
  });


test('Renders the BookingForm label', () => {
  render(<BookingForm />);
  const labelElement = screen.getByText(/choose date/i);
  expect(labelElement).toBeInTheDocument();
});

test("BookingForm can be submitted", () => {
    const handleSubmit = jest.fn();

    render(<BookingForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText("Choose date"), {
      target: { value: "2023-06-20" },
    });
    fireEvent.change(screen.getByLabelText("Choose time"), {
      target: { value: "19:00" },
    });
    fireEvent.change(screen.getByLabelText("Number of guests"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText("Occasion"), {
      target: { value: "Birthday" },
    });

    fireEvent.submit(screen.getByText("Make Your Reservation"));

    expect(handleSubmit).toHaveBeenCalled();
  });
