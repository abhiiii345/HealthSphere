import React from 'react';

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Welcome to our Hospital Management System, designed to simplify healthcare administration and enhance patient care. From appointment scheduling and medical records to billing and real-time updates, our system offers a seamless experience for both staff and patients. With intuitive interfaces and robust features, we ensure that healthcare providers can focus on what matters most—delivering quality care.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
        <img src="/Vector.png" alt="vector"/>
      </span>
      </div>
      
    </div>
  );
};

export default Hero;
