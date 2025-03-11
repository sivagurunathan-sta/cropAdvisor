import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4 text-center">
        <p>© {new Date().getFullYear()} CropAdvisor - Smart Crop Recommendation System</p>
        <p className="text-gray-400 text-sm mt-2">
          Helping farmers make data-driven decisions
        </p>
      </div>
    </footer>
  );
}

export default Footer;