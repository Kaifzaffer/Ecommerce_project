// import React from 'react'

import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <h4 className="text-black">All rights reserved &copy; LILTUB</h4>
      <p className="text-center mt-3">
        <Link to="/contact">Contact</Link>
        <Link to="/About">About</Link>
        <Link to="/Policy">Policy</Link>
      </p>
    </footer>
  );
}


export default Footer;
