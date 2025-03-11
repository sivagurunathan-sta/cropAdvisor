import React from 'react';

function Results({ results }) {
  const { predicted_crop, top_predictions } = results;
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mt-8 animate-fade-in">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Crop Recommendation Results</h2>
      
      <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-xl font-medium text-green-800">
          Recommended Crop: <span className="font-bold">{predicted_crop.toUpperCase()}</span>
        </h3>
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Top Recommendations</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          {top_predictions.map((prediction, index) => (
            <div 
              key={index}
              className={`p-4 rounded-lg ${index === 0 ? 'bg-green-100 border-green-300' : 'bg-gray-50 border-gray-200'} border`}
            >
              <h4 className="font-bold text-lg mb-2 capitalize">{prediction.crop}</h4>
              <p className="text-sm text-gray-700 mb-2">
                Probability: <span className="font-medium">{(prediction.probability * 100).toFixed(2)}%</span>
              </p>
              <p className="text-sm text-gray-600 mt-2">{prediction.info.description}</p>
              
              {prediction.info.growing_season && (
                <p className="text-xs text-gray-500 mt-2">
                  Growing Season: {prediction.info.growing_season}
                </p>
              )}
              
              {prediction.info.water_needs && (
                <p className="text-xs text-gray-500">
                  Water Needs: {prediction.info.water_needs}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Results;