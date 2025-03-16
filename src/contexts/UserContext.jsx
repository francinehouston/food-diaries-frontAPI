import { createContext, useState, useContext, useEffect } from 'react';

// Create User Context
const UserContext = createContext();

// Helper function to get user from the token
const getUserFromToken = () => {
  const token = localStorage.getItem('token'); // Ensure 'authToken' is the key used for storage

  if (!token) return null;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT token
    return payload; // This should return the user data (e.g., user.id, user.email)
  } catch (error) {
    console.error("Failed to decode token", error);
    return null;
  }
};

// User Provider component
function UserProvider({ children }) {
  const [user, setUser] = useState(getUserFromToken());

  // Optionally, you can listen for changes in the user token and update accordingly
  useEffect(() => {
    const token = localStorage.getItem('token');
    setUser(getUserFromToken(token)); // Update the user state when the token is retrieved
  }, []); // Empty array to run only once when the component mounts

  const value = { user, setUser }; // Passing the user state and setter function

  return (
    <UserContext.Provider value={value}>
      {children} {/* Render the children wrapped by the UserProvider */}
    </UserContext.Provider>
  );
};

// Export the context and provider
export { UserProvider, UserContext };
