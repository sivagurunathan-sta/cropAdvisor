import React, { useState } from 'react';

const INITIAL_FORM_STATE = {
  nitrogen: '',
  phosphorus: '',
  potassium: '',
  temperature: '',
  humidity: '',
  ph: '',
  rainfall: ''
};

function CropForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Enter Soil and Environmental Parameters</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="nitrogen">
              Nitrogen (N) - mg/kg
            </label>
            <input
              type="number"
              id="nitrogen"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 90"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="phosphorus">
              Phosphorus (P) - mg/kg
            </label>
            <input
              type="number"
              id="phosphorus"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 42"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="potassium">
              Potassium (K) - mg/kg
            </label>
            <input
              type="number"
              id="potassium"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 43"
              min="0"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="temperature">
              Temperature (°C)
            </label>
            <input
              type="number"
              id="temperature"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 20.87"
              min="0"
              max="50"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="humidity">
              Humidity (%)
            </label>
            <input
              type="number"
              id="humidity"
              name="humidity"
              value={formData.humidity}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 82.00"
              min="0"
              max="100"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="ph">
              pH Level
            </label>
            <input
              type="number"
              id="ph"
              name="ph"
              value={formData.ph}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 6.5"
              min="0"
              max="14"
              step="0.01"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="rainfall">
              Rainfall (mm)
            </label>
            <input
              type="number"
              id="rainfall"
              name="rainfall"
              value={formData.rainfall}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g., 202.93"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Predict Crop'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CropForm;