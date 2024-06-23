
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MyComponent() {
  // State to store the fetched data
  const [data, setData] = useState(null);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        // Make a GET request to the API endpoint
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        // Update state with the fetched data
        setData(response.data);
        console.log(response.data);
        // console.log(JSON.stringify(response.data));
      } catch (error) {
        // Handle errors
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetchData function when the component mounts
    fetchData();

    // Cleanup function
    return () => {
      // Optional: perform any cleanup (if needed) when the component unmounts
    };
  }, []); // Empty dependency array means this effect runs only once, when the component mounts

  // Render the fetched data
  return (
    <div>
      {/* {data ? (
        <div>
          <h2>Fetched Data</h2>
          <pre>{JSON.stringify(data)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )} */}
    </div>
  );
}

export default MyComponent;
