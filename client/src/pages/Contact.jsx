// import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Layout from '../components/Layout/Layout'; // Assuming you have a Layout component
import './Contact.css'; // Import your CSS file

const Contact = () => {
  return (
    <Layout>
      <div className="contact-us">
        <div className="contact-info">
          <h2>Contact Us</h2>
          <p> We would love to hear from you! Feel free to reach out to us using the information below, or fill out the form on this page.</p>

          <ul className="contact-details">
            <li>
              <FaEnvelope className="icon" />
              <span>contact@yourdomain.com</span>
            </li>
            <li>
              <FaPhoneAlt className="icon" />
              <span>+1 234-567-8901</span>
            </li>
            <li>
              <FaMapMarkerAlt className="icon" />
              <span>123 Main Street, Anytown, CA 12345</span>
            </li>
          </ul>
        </div>


        <img src="/images/call_center.jpg" alt="Customer Image" className="customer-image" />
      </div>
    </Layout>
  );
};

export default Contact;
