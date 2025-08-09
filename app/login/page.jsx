"use client";
import React, { useEffect } from "react";
import LoginForm from "@/components/login/LoginForm";
import RightImage from "@/components/login/RightImage";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import routeConfig from "../config/routeConfig";

function Loginpage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // Redirect if already authenticated
    if (!loading && isAuthenticated()) {
      router.replace("/pages/dashboard");
      return;
    }

    // Prefetch all route paths for faster transition after login
    Object.keys(routeConfig).forEach((path) => {
      router.prefetch(path);
    });
  }, [router, isAuthenticated, loading]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[var(--color-background-gray)]">
        <div className="text-center">
          <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render login form if authenticated
  if (isAuthenticated()) {
    return null;
  }

  return (
    <div className="bg-black-400 flex h-screen w-screen items-center justify-center px-5 py-5">
      <div className="flex h-full w-full flex-col gap-4 overflow-hidden rounded-3xl bg-[var(--color-background-off-white)] p-4 shadow-2xl sm:p-6 lg:flex-row lg:gap-10 lg:px-20">
        <LoginForm />
        <RightImage />
      </div>
    </div>
  );
}

export default Loginpage;
