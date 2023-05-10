import { initializeTimes, updateTimes } from './Main';

test('initializeTimes function returns correct initial values', () => {
  const initialState = initializeTimes();
  expect(initialState).toEqual(['17:00', '18:00', '19:00', '20:00', '21:00', '22:00']);
});

test('updateTimes function returns the same value as provided in the state', () => {
  const state = ['17:00', '18:00', '19:00'];
  const newState = updateTimes(state, {});
  expect(newState).toEqual(state);
});
