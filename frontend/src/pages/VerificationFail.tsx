import React from 'react';
import { useNavigate } from 'react-router-dom';

const VerificationFail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-red-400 to-red-700 text-white font-sans p-5 text-center">
      <div className="max-w-md mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-white p-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4">Verification Failed</h1>
        
        <p className="text-xl mb-8 opacity-90">
          Sorry, we couldn't verify your email. The verification link may have expired or is invalid.
        </p>
        
        <div className="mt-6">
          <button
            onClick={() => navigate('/resend-verification')}
            className="bg-white text-red-600 hover:bg-red-50 transition-colors duration-300 font-medium rounded-full py-3 px-8 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
          >
            Resend Verification Email
          </button>
        </div>
        
        <div className="mt-6">
          <button
            onClick={() => navigate('/login')}
            className="text-white hover:text-red-100 transition-colors duration-300 underline"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationFail;
