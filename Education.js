/**
 * @file Education.js
 * @description React component for the Education page. Displays educational articles about waste management and provides a link for further learning.
 */
import React, { useState } from "react";
import "../styles/Education.css";
import axios from "axios";
import trophies from "../components/images/trophies.jpg";
import carseat from "../components/images/car-seat.jpg";
import recycle from "../components/images/organics-recycling.jpg";

/**
 * List of educational articles.
 * @type {Array<{id: number, image: string, title: string, date: string, description: string}>}
 */
const articles = [
  {
    id: 1,
    image: recycle, // Path to the image for this article
    title: "How Common Is Organics Recycling?",

    date: "September 04",
    description:
        "Organics recycling programs are becoming more popular. Just don't put your organic waste in your recycling bin! Instead, compost it at home or send it to a commercial composting facility. Composting reduces the amount of waste sent to landfills, conserves landfill space, and creates valuable compost for your garden.",
  },
  {
    id: 2,
    image: carseat, // Path to the image for this article
    title: "What's the Best Way to Dispose of Car Seats?",

    date: "October 20",
    description:
        "After your precious cargo grows too big for a car seat, should you trash, donate, or recycle it? Check out what the expert has to say about the best way to dispose of your old car seat. Many car seats are made of durable materials that can be recycled or repurposed. Check with your local recycling center or a specialized recycling program to see if they accept car seats. If your car seat is still in good condition, consider donating it to a local charity or family in need. Remember, it's important to follow proper disposal guidelines to ensure environmental safety.",
  },

  {
    id: 3,
    image: trophies, // Path to the image for this article
    title: "What Can I Do with Old Trophies and Medals?",

    date: "July 14",
    description:
        "The glory may live on in your heart, but it can take up a lot of shelf space. Thankfully, recycling or donating your old awards can free up room and help the environment. Many local recycling programs accept trophies, medals, and plaques. If your awards are still in good condition, consider donating them to a school, youth sports organization, or charity. By recycling or donating your old awards, you can help reduce waste and inspire others.",

  },
];

/**
 * Education component.
 * Renders a list of articles about waste management and provides a button to learn more.
 * @component
 * @returns {JSX.Element} The rendered Education component.
 */
const Education = () => {
  const [text, setText] = useState(''); // Text to translate
  const [translatedText, setTranslatedText] = useState(''); // Translated text
  const [language, setLanguage] = useState('es'); // Target language (default: Spanish)

  const apiKey = 'AIzaSyCYUp4zgr1baPhOJ9IXbQiwKlGOQxZiHHE'; // Replace with your Google API Key

  const translateText = async () => {
    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
    try {
      const response = await axios.post(url, {
        q: text,
        target: language,
      });
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
      <div className="education-container">
        <h2>Educate yourself while earning points.</h2>
        <div className="translation-section">
        <textarea
            placeholder="Enter text to translate"
            value={text}
            onChange={(e) => setText(e.target.value)}
        ></textarea>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            {/* Add more languages as needed */}
          </select>
          <button onClick={translateText}>Translate</button>
          <h3>Translated Text:</h3>
          <p>{translatedText}</p>
        </div>
        <div className="articles-grid">
          {articles.map((article) => (
              <div className="article-card" key={article.id}>
                <img
                    src={article.image}
                    className="article-image"
                />
                <h3 className="article-title">{article.title}</h3>
                <p className="article-meta">
                  {article.date}
                </p>
                <p className="article-description">
                  {article.description}
                </p>

              </div>
          ))}


        </div>
        <button className="cta-button"
                onClick={() => window.open("https://wastestream.psu.edu/education-and-awareness/", "_blank")}>Learn More
        </button>

      </div>
  );
};

export default Education;
