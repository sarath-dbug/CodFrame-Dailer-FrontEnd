// components/PageNotFound.jsx
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full flex items-center justify-center p-4 bg-stone-200">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-6">
          {/* 404 Number */}
          <h1 className="text-8xl sm:text-9xl font-bold text-blue-600 animate-pulse">404</h1>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Page Not Found
            </h2>
          {/* Illustration Image */}
          <img
            src="https://cdn.dribbble.com/users/1175431/screenshots/6188233/404-error-dribbble-800x600.gif"
            alt="404 Illustration"
            className="mx-auto h-48 sm:h-64 w-full object-contain"
          />
          
          {/* Message */}
          <div className="space-y-2">
            
            <p className="text-lg sm:text-xl text-gray-600">
              The page you're looking for has disappeared into the digital void.
            </p>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-5 py-2.5 sm:px-6 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-5 sm:w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z"
                clipRule="evenodd"
              />
            </svg>
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;









