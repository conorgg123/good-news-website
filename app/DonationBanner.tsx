'use client';

import React, { useState } from 'react';

const DonationBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4 shadow-lg z-50">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex-1 mr-8">
          <h3 className="text-lg font-semibold mb-1">Keep Good News Free</h3>
          <p className="text-sm text-gray-600">
            If you value daily inspiration and good news, consider supporting us with a donation. 
            Every contribution helps keep our servers running.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.open('https://your-stripe-payment-link', '_blank')}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Donate Now
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close donation banner"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonationBanner;
