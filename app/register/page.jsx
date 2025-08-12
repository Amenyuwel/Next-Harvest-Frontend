import React from "react";
import RightImage from "@/components/login/RightImage";
import RegisterForm from "@/components/register/RegisterForm";

function RegisterPage() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[var(--color-sidebar-bg)] px-5 py-5">
      <div className="flex h-full w-full flex-col gap-4 overflow-hidden rounded-3xl bg-[var(--color-background-off-white)] p-4 shadow-2xl sm:p-6 lg:flex-row lg:gap-10 lg:px-20">
        <RegisterForm />
        <RightImage />
      </div>
    </div>
  );
}

export default RegisterPage;
