import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Create a global context for sharing authentication and user data across components
export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  // Define a state variable to track whether the user is authenticated, initially set to false
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Define a state variable to store user data, initially an empty object
  const [user, setUser] = useState({});

  return (
    // Use Context.Provider to make isAuthenticated and user states available to all components
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      {/* Render the main App component, which can now access the context values */}
      <App />
    </Context.Provider>
  );
}

// Create the root element in the DOM and render the AppWrapper inside StrictMode for extra checks and warnings
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Render the AppWrapper component, which wraps the app with context */}
    <AppWrapper />
  </StrictMode>,
);
