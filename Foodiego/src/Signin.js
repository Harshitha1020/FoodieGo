import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Both fields are required");
      return;
    }
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signin/", {
        username,
        password,
      });

      console.log("🟢 Login Success:", response.data);

      // Store user authentication data
      localStorage.setItem("accessToken", response.data.access);
      localStorage.setItem("refreshToken", response.data.refresh);
      localStorage.setItem("user", JSON.stringify({ username }));

      // Trigger authentication update
      window.dispatchEvent(new Event("authChange"));

      alert("✅ Sign-in Successful!");

      // Delay navigation slightly to ensure Header updates first
      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      console.error("🔴 Login Error:", error.response?.data);

      if (error.response?.status === 404) {
        setError(
          <span>
            User not found. Do you want to{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign Up?
            </a>
          </span>
        );
      } else if (error.response?.status === 401) {
        setError("Incorrect password. Try again.");
      } else {
        setError(error.response?.data?.error || "Sign-in failed");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 p-3 w-full rounded-md"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-3 w-full rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="bg-green-500 text-white p-3 w-full rounded-md">
            Sign In
          </button>
        </form>

        {/* New User Signup Suggestion */}
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
