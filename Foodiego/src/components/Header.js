import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { UserContext } from "./UserContext"; 
import { useSelector } from "react-redux";
import { LuShoppingCart } from "react-icons/lu";
import { CDN_LOGO } from "../utils/constants";
import Logo from "../images/image.png";

const Header = () => {
  const onlineStatus = useOnlineStatus();
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const navigate = useNavigate();
  const cartItems = useSelector((store) => store.cart.items);
  
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("accessToken");
  });

  useEffect(() => {
    const updateAuthState = () => {
      const token = localStorage.getItem("accessToken");
      const user = JSON.parse(localStorage.getItem("user"));

      console.log("🔄 Auth change detected! Token:", token, "User:", user); // Debugging log

      setLoggedInUser(user ? user.username : null);
      setIsAuthenticated(!!token);
    };

    updateAuthState(); // Initial check

    // Listen for custom authentication events
    window.addEventListener("authChange", updateAuthState);

    return () => {
      window.removeEventListener("authChange", updateAuthState);
    };
  }, [setLoggedInUser]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");

    setLoggedInUser(null);
    setIsAuthenticated(false);

    navigate("/signin");

    console.log("🚪 User logged out. Triggering authChange event."); // Debugging log
    window.dispatchEvent(new Event("authChange")); // Manually trigger an update
  };

  return (
    <div className="h-full flex justify-between items-center shadow-md p-4">
      <div className="w-[112px]">
        <img className="md:w-[80px] w-[30px] mx-8 p-2" src={Logo} alt="Logo" />
      </div>
      <div className="flex items-center space-x-4 font-bold">
        <ul className="flex space-x-6">
          <li className="hover:text-orange-500">OnlineStatus: {onlineStatus ? "✅" : "🔴"}</li>
          <li className="hover:text-orange-500">
            <Link to={"/"}>Home</Link>
          </li>
          <li className="hover:text-orange-500">
            <Link to={"/contact"}>Contact Us</Link>
          </li>
          <li className="hover:text-orange-400">
            <Link to={"/grocery"}>Grocery</Link>
          </li>
          <li className="hover:text-orange-400">
            <Link to={"/cart"}>
              <LuShoppingCart className="inline" /> -({cartItems.length} items)
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li className="hover:text-orange-400">👤 {loggedInUser}</li>
              <button
                className="bg-red-400 text-white rounded-md font-bold px-4 py-2 hover:bg-red-600"
                onClick={handleLogout}
                aria-label="Logout"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <li className="hover:text-orange-400">
                <Link to={"/signup"}>Sign Up</Link>
              </li>
              <li className="hover:text-orange-400">
                <Link to={"/signin"}>Sign In</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
