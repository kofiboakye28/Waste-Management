/**
 * The Home component represents the landing page of the waste management platform.
 * It includes sections for introducing the platform, displaying features, and providing
 * contact information.
 *
 * @author Alex and Solomon
 * @since 2024-12-13
 *
 *   <Home />
 */
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

/**
 * Renders the Home page .
 *
 * @returns {JSX.Element} The rendered Home component.
 */
function Home() {
  return (
      <div className="home-container">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Our Waste Management Platform</h1>
            <p>Efficient solutions for a cleaner, greener future.</p>
            <Link to="/register">
              <button className="cta-button">Get Started</button>
            </Link>
          </div>
        </section>
        {/* Rewards Section */}
          <section id="rewards-section">
          <h2>Turn your points into savings.</h2>
          <div className="steps">
            <div className="step">
              <h3>1 <span>Sign Up</span></h3>
              <p>
                Members can use their points to get great deals at local
                businesses and exclusive discounts on sustainable goods.
              </p>
            </div>
            <div className="step">
              <h3>2 <span>Enter Waste</span></h3>
              <p>
                Earn points by participating in activities such as entering the amount of waste recycled
                every week.
              </p>
            </div>
            <div className="step">
              <h3>3 <span>Get Rewarded</span></h3>
              <p>
                Users can redeem their points for discounts and rewards from  a selection of businesses.
              </p>
            </div>
          </div>
        </section>


        {/* About Section */}
        <section className="about">
          <h2>About Us</h2>
          <p>
            Our mission is to make waste management easier and more efficient for
            everyone. By providing a platform to monitor, schedule, and manage
            waste disposal, we aim to create a cleaner environment.
          </p>
        </section>

        {/* Contact Section */}
        <section className="contact">
          <h2>Contact Us</h2>
          <p>Email: kofiboakye28@gmail.com / ajl123184@gmail.com</p>
          <p>Phone: +1 267-495-7374 / +1 267-679-5453</p>
        </section>
      </div>
  );
}

export default Home;
