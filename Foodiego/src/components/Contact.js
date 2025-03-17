import React, { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/contact/", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Response:", response.data); // Log the response for debugging
      setSuccess("Form submitted successfully!");
      setError(""); // Clear any previous error
    } catch (error) {
      console.error("Error submitting contact form:", error); // Log full error
      if (error.response) {
        console.error("Response error:", error.response); // Log the response from the backend
        setError(`Error: ${error.response.data.detail || error.response.data.error || "Unknown error"}`);
      } else if (error.request) {
        console.error("No response received:", error.request); // Log request error
        setError("Network error: No response from the server.");
      } else {
        console.error("Error message:", error.message); // Log other errors
        setError(`Unexpected error: ${error.message}`);
      }
      setSuccess(""); // Clear success message if there's an error
    }
  };
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Contact Us</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-1 p-2 w-full border rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-blue-500 text-white py-2 rounded-md font-semibold transition duration-300 ${
              !formData.name || !formData.email || !formData.phone
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600"
            }`}
            disabled={!formData.name || !formData.email || !formData.phone}
          >
            Submit
          </button>

          {/* Error and Success Messages */}
          {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center mt-4">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Contact;
