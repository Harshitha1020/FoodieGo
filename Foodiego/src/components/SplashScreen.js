import React from "react";
import Logo from "../images/image.png"; // ✅ Ensure image is in `src/images/`

const SplashScreen = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center h-screen bg-orange-500 text-white flex-col cursor-pointer"
    >
      <img src={Logo} alt="Logo" className="w-40 h-40 mb-4" />
      <p className="text-2xl font-semibold">Click to continue</p>
    </div>
  );
};

export default SplashScreen;
