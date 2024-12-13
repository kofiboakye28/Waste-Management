import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'; 
import Rewards from './pages/Rewards';
import Waste from './pages/Waste';
import Education from './pages/Education';
import Shipping from './pages/Shipping';
import Success from './pages/Success';
import { UserProvider } from './components/UserContext';
import './App.css';

/**
 * The main App component that sets up the structure of the application.
 * It includes routing to navigate between different pages and a UserProvider
 * to manage global user state.
 *
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  return (
      // Wrap the app with UserProvider
    <UserProvider>
      <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rewards" element={<Rewards />} />
        <Route path="/waste" element={<Waste />} />
        <Route path="/education" element={<Education />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/success" element={<Success />} />
        {/* Removed the /account route */}
      </Routes>
    </div>
    </UserProvider>
  );
}
// Export the App component
export default App;
