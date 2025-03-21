import React from "react";
import { Link } from "react-router-dom";
import { aboutCompany, contact, locationObject } from "../utils/constants";
import Logo from "../images/image.png"; // ✅ Correct Import

const Footer = () => {
  return (
    <footer className="bg-[#02060c] text-white">
      <div className="max-w-[1200px] mx-auto p-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2">
          <ul className="flex flex-col">
            <li className="flex items-center">
              <Link to="/">
                <img src={Logo} alt="logo" className="w-14 inline mr-3" />
              </Link>
              <span className="font-semibold text-2xl">Foodiego</span>
            </li>
            <li className="text-gray-400 my-2">
              &copy; 2025 KBN Industries <br /> Pvt. Ltd
            </li>
          </ul>
          <ul className="flex flex-col">
            <li className="font-semibold text-xl mb-1">Company</li>
            {aboutCompany.map((item, ind) => (
              <li key={ind} className="text-gray-400 hover:text-white cursor-pointer my-1">
                {item}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col">
            <li className="font-semibold text-xl mb-1">Contact Us</li>
            {contact.map((item, ind) => (
              <li key={ind} className="text-gray-400 hover:text-white cursor-pointer my-1">
                {item}
              </li>
            ))}
          </ul>
          <ul className="flex flex-col">
            <li className="font-semibold text-xl">We Deliver to:</li>
            {locationObject.map((loc, ind) => (
              <li key={ind} className="text-gray-400 hover:text-white cursor-pointer my-1">
                {loc.city}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
