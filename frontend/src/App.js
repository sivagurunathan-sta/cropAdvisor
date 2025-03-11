import React, { useState } from 'react';
import './App.css';
import CropForm from './components/CropForm';
import Results from './components/Results';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const predictCrop = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to get prediction');
      }
      
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <CropForm onSubmit={predictCrop} loading={loading} />
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-6">
              <p>{error}</p>
            </div>
          )}
          
          {results && <Results results={results} />}
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;