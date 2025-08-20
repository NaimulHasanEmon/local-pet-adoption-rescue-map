import React, { useState, useEffect } from 'react';
import { FiAlertCircle, FiX } from 'react-icons/fi';

const FallbackNotification = ({ isVisible, onClose }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isVisible && !isDismissed) {
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => {
        setIsDismissed(true);
        onClose();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, isDismissed, onClose]);

  if (!isVisible || isDismissed) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm">
      <div className="bg-amber-50 border border-amber-200 rounded-lg shadow-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <FiAlertCircle className="h-5 w-5 text-amber-600" />
          </div>
          <div className="ml-3 flex-shrink-0">
            <button
              onClick={() => {
                setIsDismissed(true);
                onClose();
              }}
              className="inline-flex text-amber-400 hover:text-amber-600 focus:outline-none"
            >
              <FiX className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FallbackNotification;
