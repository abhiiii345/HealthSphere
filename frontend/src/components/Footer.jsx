import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "10:00 AM - 8:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "10:00 AM - 8:00 PM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 8:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "10:00 AM - 8:00 PM",
    },
    {
      id: 5,
      day: "Friday",
      time: "10:00 AM - 8:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "11:00 AM - 6:00 PM",
    },
    {
      id: 7,
      day: "Sunday",
      time: "Closed",
    },
  ];

  return (
    <>
      <footer className={"container"}>
        <hr />
        <div className="content">
          <div>
            <img src="/logo.png" alt="logo" className="logo-img" />
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <Link to={"/"}>Home</Link>
              <Link to={"/appointment"}>Book Appointment</Link>
              <Link to={"/about"}>Our Services</Link>
            </ul>
          </div>
          <div>
            <h4>Hours of Operation</h4>
            <ul>
              {hours.map((element) => (
                <li key={element.id}>
                  <span>{element.day}</span>
                  <span>{element.time}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>Contact Us</h4>
            <div>
              <FaPhone />
              <span>+91-99999-12345</span>
            </div>
            <div>
              <MdEmail />
              <span>abhi@gmail.com</span>
            </div>
            <div>
              <FaLocationArrow />
              <span>Indore, Madhya Pradesh, India</span>
            </div>
          </div>
        </div>
        <div className="logo-feature">
          <p>Your health is our priority. Stay connected!</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
