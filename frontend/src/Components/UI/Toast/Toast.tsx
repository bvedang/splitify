import React, { useEffect, useState } from "react";

interface ToastProps {
  message: string;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Auto-dismiss after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => {
        onClose(); // Call onClose after the slide-out animation
      }, 500); // Wait for the animation to finish

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const toastStyles = {
    transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
    opacity: isVisible ? 1 : 0,
    transition: 'transform 0.5s ease, opacity 0.5s ease',
  };

  return (
      <div
          style={toastStyles}
          className={`fixed bottom-8 right-8 flex items-center justify-between p-4 m-4 bg-blue-600 text-white rounded-lg shadow-md z-50 ${!isVisible && 'pointer-events-none'}`}
          aria-live="assertive"
          aria-atomic="true"
      >
        <span>{message}</span>
        <button
            onClick={() => setIsVisible(false)}
            className="bg-transparent border-none text-white cursor-pointer text-2xl leading-none px-3 py-1 ml-4"
            aria-label="Close"
        >
          &times;
        </button>
      </div>
  );
};

export default Toast;
