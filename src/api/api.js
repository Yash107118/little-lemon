export const submitAPI = async (booking) => {
    try {
      const response = await fetch("https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/master/api.js/booking", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(booking)
      });
  
      if (!response.ok) {
        throw new Error('Response was not OK');
      }
  
      const data = await response.json();
  
      // The backend should return the updated list of available times.
      return data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // api.js

export const fetchAPI = async (date) => {
    const response = await fetch(`https://raw.githubusercontent.com/Meta-Front-End-Developer-PC/capstone/master/api.js/available-times?date=${date}`);
    const data = await response.json();
    return data;
  };
  
  

  