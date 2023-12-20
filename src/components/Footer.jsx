// src/components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <p>&copy; 2023 aman_z445</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-grey">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="hover:text-grey">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-grey">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#" className="hover:text-grey">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;