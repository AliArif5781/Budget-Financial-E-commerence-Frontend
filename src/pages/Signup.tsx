import SignupForm from "@/components/SignupForm";
import React, { useState } from "react";

const Signup = () => {
  return (
    <div>
      <div className="min-h-screen flex justify-center items-center gap-5 px-5">
        <div className="w-full h-full max-w-xl">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
