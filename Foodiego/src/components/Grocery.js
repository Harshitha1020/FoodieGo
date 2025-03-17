import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addGroceryItem } from "../utils/cartSlice"; // Import Redux action

const Grocery = () => {
  const [groceries, setGroceries] = useState([]);
  const dispatch = useDispatch();

  // Fetch grocery items from Django API
  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/grocery/")
      .then((response) => response.json())
      .then((data) => setGroceries(data))
      .catch((error) => console.error("Error fetching groceries:", error));
  }, []);

  // Function to add an item to the Redux cart
  const addToCart = (item) => {
    dispatch(addGroceryItem(item)); // Dispatch action to Redux store
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Grocery List</h1>

      {/* Grocery Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {groceries.length > 0 ? (
          groceries.map((item, index) => (
            <div
              key={index}
              className="bg-gray-100 p-4 rounded-lg shadow-md cursor-pointer hover:bg-gray-200 transition duration-200"
              onClick={() => addToCart(item)} // Click to add to cart
            >
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
              <p className="text-green-600 font-bold">₹{item.price}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">⚠ No grocery items available.</p>
        )}
      </div>
    </div>
  );
};

export default Grocery;
