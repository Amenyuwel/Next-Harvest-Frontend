"use client";
import React, { useEffect } from "react";
import LoginForm from "@/components/login/LoginForm";
import RightImage from "@/components/login/RightImage";
import { useRouter } from "next/navigation";
import routeConfig from "../config/routeConfig";

function Loginpage() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch all route paths for faster transition after login
    Object.keys(routeConfig).forEach((path) => {
      router.prefetch(path);
    });
  }, [router]);

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
