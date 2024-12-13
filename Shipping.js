/**
 * Shipping Component
 *
 * This React functional component renders a form for users to input shipping information.
 * The form collects details such as first name, last name, address, city, state, and zip code.
 * It validates the inputs and navigates to a success page upon successful submission.
 *
 * @returns {JSX.Element} The Shipping component markup.
 */

import React, { useState } from "react";
import "../styles/Shipping.css";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  });

  //State to store error messages for validation
  const [errorMessage, setErrorMessage] = useState('');

  //Hook to programmatically navigate to other pages
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handles form submission.
   * Validates the form data to ensure all fields are filled.
   * If validation passes, navigates to the success page.
   *
   * @param {React.FormEvent<HTMLFormElement>} e The event triggered by the form submission.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form data
    if (Object.values(formData).some((value) => value.trim() === '')) {
      setErrorMessage('Please fill out all the required fields.');
    } else {
      // Redirect to success page
      navigate('/Success');
    }
  };

  return (
      <div className="shipping-container">
        <h2>Shipping Information</h2>
        <form onSubmit={handleSubmit} className="shipping-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name:</label>
            <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Last Name:</label>
            <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
            />
          </div>
          <div className="form-group">
            <label htmlFor="zip">Zip:</label>
            <input
                type="text"
                id="zip"
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                required
            />
          </div>
          <button type="submit">Submit</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
  );
};

export default Shipping;