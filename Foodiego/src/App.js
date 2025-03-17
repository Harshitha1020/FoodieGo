import React, { Suspense, lazy, useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { UserContextProvider } from "./components/UserContext";
import appStore from "./utils/appStore";
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Cart from "./components/Cart";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { WhatsOnYourMind } from "./components/WhatsOnYourMind";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen"; // ✅ Import SplashScreen

// ✅ Lazy-load Grocery from a separate file
const Grocery = lazy(() => import("./components/Grocery"));

function AppLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Provider store={appStore}>
      <UserContextProvider>
        <div style={{ fontFamily: "Arial, sans-serif" }}>
          <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
          <div style={{ marginTop: "20px" }}>
            <Outlet context={{ setIsAuthenticated }} />
          </div>
        </div>
      </UserContextProvider>
    </Provider>
  );
}

const HomePage = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <WhatsOnYourMind />
    <Body />
    <Footer />
  </div>
);

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000); // Auto-hide after 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return showSplash ? <SplashScreen onClick={() => setShowSplash(false)} /> : <RouterProvider router={appRouter} />;
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<div className="text-center">Loading Grocery...</div>}>
            <Grocery />
          </Suspense>
        ),
      },
      { path: "/restaurants/:resId", element: <RestaurantMenu /> },
      { path: "/cart", element: <Cart /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/signup", element: <SignUp /> },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
