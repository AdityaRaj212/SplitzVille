import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationSuccess: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to home after 5 seconds
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-emerald-400 to-blue-500 text-white font-sans p-5 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-white p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Email Verified Successfully!</h1>
        
        <p className="text-xl mb-8 opacity-90">
          Thank you for verifying your email. You will be redirected to the home page shortly.
        </p>
        
        <div className="mt-6">
          <button
            onClick={() => navigate('/login')}
            className="bg-white text-blue-500 hover:bg-blue-50 transition-colors duration-300 font-medium rounded-full py-3 px-8 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Go to Login Now
          </button>
        </div>
        
        <div className="mt-6 text-sm opacity-75">
          Redirecting in 5 seconds...
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;
