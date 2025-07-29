"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import Register from "../register/RegisterForm";

function LoginForm() {
  const [showRegister, setShowRegister] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    // Add your login logic here (API call, validation, etc.)
    // For now, we'll redirect directly to dashboard
    router.push("/pages/dashboard");
  };

  return (
    <div className="relative flex w-full flex-col justify-center overflow-hidden rounded-3xl bg-[var(--color-background-light-gray)] p-6 sm:p-12 lg:w-1/2 lg:p-20">
      <div className="relative h-full w-full">
        {/* Login Form */}
        <div
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            showRegister
              ? "-translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <div className="mx-auto flex h-full w-full max-w-sm flex-col justify-center">
            <div className="mb-6 text-center sm:mb-8">
              <h1 className="font-lato mb-2 text-xl font-bold text-[var(--color-primary)] sm:text-2xl">
                Harvest Assistant
              </h1>
              <h2 className="font-lato mb-1 text-2xl font-bold text-gray-800 sm:text-3xl">
                Your farming journey
              </h2>
              <h3 className="font-lato mb-6 text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl">
                Starts here
              </h3>
            </div>

            {/* Social Login Icons */}
            <div className="mb-6 flex justify-center gap-4 sm:mb-8">
              <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-3xl bg-white shadow-md transition-shadow hover:shadow-lg">
                <Icon icon="logos:google-icon" width="24" height="24" />
              </div>
              <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-3xl bg-white shadow-md transition-shadow hover:shadow-lg">
                <Icon icon="logos:facebook" width="24" height="24" />
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <div className="relative">
                <div className="absolute top-1/2 left-3 -translate-y-1/2 transform">
                  <Icon
                    icon="mdi:email-outline"
                    width="20"
                    height="20"
                    className="text-gray-500"
                  />
                </div>
                <input
                  type="email"
                  className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-4 pl-12 text-sm text-black shadow-sm focus:ring-2 focus:ring-pink-500 focus:outline-none sm:py-4 sm:text-base"
                  placeholder="Email"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-6">
              <div className="relative">
                <div className="absolute top-1/2 left-3 -translate-y-1/2 transform">
                  <Icon
                    icon="mdi:lock-outline"
                    width="20"
                    height="20"
                    className="text-gray-500"
                  />
                </div>
                <input
                  type="password"
                  className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-12 pl-12 text-sm text-black shadow-sm focus:ring-2 focus:ring-pink-500 focus:outline-none sm:py-4 sm:text-base"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              onClick={handleLogin}
              className="font-lato mb-4 w-full rounded-3xl bg-black py-3 text-sm font-medium text-white transition duration-200 hover:bg-gray-800 sm:py-4 sm:text-base"
            >
              Log in
            </button>

            {/* Sign Up Link */}
            <p className="font-lato text-center text-xs text-gray-600 sm:text-sm">
              Don't have an account?{" "}
              <span
                className="font-lato cursor-pointer font-medium text-black hover:underline"
                onClick={() => router.push("/register")}
              >
                Sign Up
              </span>
            </p>
          </div>
        </div>

        {/* Register Form */}
        <div
          className={`absolute inset-0 transition-all duration-500 ease-in-out ${
            showRegister
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <Register onBackToLogin={() => setShowRegister(false)} />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
