"use client";
import React from "react";
import { Icon } from "@iconify/react";
import Link from "next/link";

const NotFound = ({
  title = "404 - Page Not Found",
  message = "The page you're looking for doesn't exist or you don't have permission to access it.",
  showLoginButton = true,
}) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-background-gray)]">
      <div className="text-center">
        {/* 404 Icon */}
        <div className="mb-8 flex justify-center">
          <Icon
            icon="material-symbols:error-outline"
            className="text-8xl text-gray-400"
          />
        </div>

        {/* Title */}
        <h1 className="mb-4 text-6xl font-bold text-gray-800">404</h1>

        {/* Subtitle */}
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">{title}</h2>

        {/* Message */}
        <p className="mb-8 max-w-md text-gray-600">{message}</p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {showLoginButton && (
            <Link href="/login">
              <button className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700">
                <Icon icon="material-symbols:login" className="text-lg" />
                Go to Login
              </button>
            </Link>
          )}

          <Link href="/">
            <button className="flex items-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-50">
              <Icon icon="material-symbols:home" className="text-lg" />
              Go Home
            </button>
          </Link>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-sm text-gray-500">
          <p>If you believe this is an error, please contact support.</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
