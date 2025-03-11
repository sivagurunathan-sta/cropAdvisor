import React from 'react';

function Header() {
  return (
    <header className="bg-green-600 shadow-md">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-white">CropAdvisor</h1>
        <p className="text-green-100">Find the perfect crop for your land</p>
      </div>
    </header>
  );
}

export default Header;