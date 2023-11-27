import React, { useEffect } from "react";

const ErrorMessage = ({ error, setError, visible, setVisible }) => {
  useEffect(() => {
    if (error) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        setError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="flex justify-center">
      <p
        className={`${
          visible ? "animate-fadeIn" : "animate-fadeOut"
        } fixed mt-4 mr-4 bg-red-500 text-white p-4 rounded`}
      >
        {error}
      </p>
    </div>
  );
};

export default ErrorMessage;
