"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import RegisterSuccess from "./RegisterSuccess";

function RegisterForm() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    role: "admin",
    isActive: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address (e.g., user@example.com)");
      setLoading(false);
      return;
    }

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    if (formData.username.length < 3) {
      setError("Username must be at least 3 characters long");
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData;

      console.log("Sending data:", submitData);

      const response = await fetch(`${API_URL}/api/auth/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitData),
      });

      const data = await response.json(); // Get response data first

      if (!response.ok) {
        // Now we can show the actual error message from server
        setError(data.message || `HTTP error! status: ${response.status}`);
        setLoading(false);
        return;
      }

      if (data.success) {
        // Store token in localStorage
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", JSON.stringify(data.data.admin));

        // Show success modal instead of immediate redirect
        setShowSuccessModal(true);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className={`relative flex w-full flex-col justify-center overflow-hidden rounded-3xl bg-[var(--color-background-light-gray)] p-6 sm:p-12 lg:w-1/2 lg:p-20 ${showSuccessModal ? "blur-sm" : ""}`}
      >
        <div className="relative h-full w-full">
          <div className="mx-auto flex h-full w-full max-w-sm flex-col justify-center">
            <div className="mb-6 text-center sm:mb-8">
              <h1 className="font-lato mb-2 text-xl font-bold text-[var(--color-primary)] sm:text-2xl">
                Harvest Assistant
              </h1>
              <h2 className="font-lato mb-1 text-2xl font-bold text-gray-800 sm:text-3xl">
                Admin Registration
              </h2>
              <h3 className="font-lato mb-6 text-2xl font-bold text-gray-800 sm:mb-8 sm:text-3xl">
                Create Admin Account
              </h3>
            </div>

            {error && (
              <div className="mb-4 rounded-3xl border border-red-500 bg-red-100 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Input */}
              <div>
                <div className="relative">
                  <div className="absolute top-1/2 left-3 -translate-y-1/2 transform">
                    <Icon
                      icon="mdi:account-outline"
                      width="20"
                      height="20"
                      className="text-gray-500"
                    />
                  </div>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-4 pl-12 text-sm text-black shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none sm:py-4 sm:text-base"
                    placeholder="Username"
                    required
                  />
                </div>
              </div>

              {/* First Name Input */}
              <div>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-4 pl-6 text-sm text-black shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none sm:py-4 sm:text-base"
                  placeholder="First name"
                  required
                />
              </div>

              {/* Middle Name Input */}
              <div>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-4 pl-6 text-sm text-black shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none sm:py-4 sm:text-base"
                  placeholder="Middle name (optional)"
                />
              </div>

              {/* Last Name Input */}
              <div>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-4 pl-6 text-sm text-black shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none sm:py-4 sm:text-base"
                  placeholder="Last name"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-4 pl-12 text-sm text-black shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none sm:py-4 sm:text-base"
                    placeholder="Email address"
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
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
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-4 pl-12 text-sm text-black shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none sm:py-4 sm:text-base"
                    placeholder="Create password"
                    required
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
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="font-lato w-full rounded-3xl border-0 bg-white py-3 pr-4 pl-12 text-sm text-black shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none sm:py-4 sm:text-base"
                    placeholder="Confirm password"
                    required
                  />
                </div>
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="font-lato mb-4 w-full rounded-3xl bg-black py-3 text-sm font-medium text-white transition duration-200 hover:bg-gray-800 disabled:opacity-50 sm:py-4 sm:text-base"
              >
                {loading ? "Creating Account..." : "Create Admin Account"}
              </button>
            </form>

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

      {/* Success Modal positioned fixed to cover entire screen */}
      <RegisterSuccess
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
      />
    </>
  );
}

export default RegisterForm;
