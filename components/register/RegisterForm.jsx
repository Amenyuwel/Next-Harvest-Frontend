"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

function RegisterForm() {
  const router = useRouter();

  return (
    <div className="relative flex w-full flex-col justify-center overflow-hidden rounded-3xl bg-[var(--color-background-light-gray)] p-6 sm:p-12 lg:w-1/2 lg:p-20">
      <div className="relative h-full w-full">
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

          {/* Social Register Icons */}
          <div className="mb-6 flex justify-center gap-4 sm:mb-8">
            <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-3xl bg-white shadow-md transition-shadow hover:shadow-lg">
              <Icon icon="logos:google-icon" width="24" height="24" />
            </div>
            <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-3xl bg-white shadow-md transition-shadow hover:shadow-lg">
              <Icon icon="logos:facebook" width="24" height="24" />
            </div>
          </div>

          {/* First Name Input */}
          <div className="mb-4">
            <input
              type="text"
              className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-4 pl-6 text-sm text-black shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none sm:py-4 sm:text-base"
              placeholder="First name"
            />
          </div>

          {/* Last Name Input */}
          <div className="mb-4">
            <input
              type="text"
              className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-4 pl-6 text-sm text-black shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none sm:py-4 sm:text-base"
              placeholder="Last name"
            />
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
                className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-4 pl-12 text-sm text-black shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none sm:py-4 sm:text-base"
                placeholder="Email"
              />
            </div>
          </div>

          {/* Create Password Input */}
          <div className="mb-4">
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
                className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-4 pl-12 text-sm text-black shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none sm:py-4 sm:text-base"
                placeholder="Create password"
              />
            </div>
          </div>

          {/* Confirm Password Input */}
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
                className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-4 pl-12 text-sm text-black shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none sm:py-4 sm:text-base"
                placeholder="Confirm password"
              />
            </div>
          </div>

          {/* Register Button */}
          <button className="font-lato mb-4 w-full rounded-3xl bg-black py-3 text-sm font-medium text-white transition duration-200 hover:bg-gray-800 sm:py-4 sm:text-base">
            Next
          </button>

          {/* Log In Link */}
          <p className="font-lato text-center text-xs text-gray-600 sm:text-sm">
            Already have an account?{" "}
            <span
              className="font-lato cursor-pointer font-medium text-black hover:underline"
              onClick={() => router.push("/login")}
            >
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
