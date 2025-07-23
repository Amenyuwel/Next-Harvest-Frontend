import React from "react";
import LoginForm from "@/components/login/LoginForm";
import RightImage from "@/components/login/RightImage";

function Loginpage() {
  return (
    <div className="w-screen h-screen flex items-center bg-black-400 justify-center px-5 py-5">
      <div className="bg-[var(--color-background-off-white)] rounded-3xl shadow-2xl overflow-hidden  w-full h-full flex flex-col lg:flex-row p-4 sm:p-6 lg:px-20 gap-4 lg:gap-10">
        <LoginForm />
        <RightImage />
      </div>
    </div>
  );
}

export default Loginpage;
