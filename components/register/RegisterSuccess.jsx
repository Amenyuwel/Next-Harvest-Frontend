import React from "react";

const RegisterSuccess = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
        {/* Success content */}
        <div className="text-center">
          <div className="mb-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h2 className="mb-2 text-xl font-bold text-gray-900">
            Registration Successful!
          </h2>

          <p className="mb-6 text-sm text-gray-600">
            Welcome Admin! Your account has been created successfully.
          </p>

          <button
            onClick={onClose}
            className="w-full rounded-xl bg-green-600 px-4 py-2 font-medium text-white transition-colors hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none"
          >
            Continue to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterSuccess;
