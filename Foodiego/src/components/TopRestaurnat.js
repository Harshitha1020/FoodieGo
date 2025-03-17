import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";  
import axios from "axios";

const TopRestaurant = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);  
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);  
  const [searchText, setSearchText] = useState(""); 
  const [loading, setLoading] = useState(true);  

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/restaurants/")  
      .then((response) => {
        console.log("API Response:", response.data);  
        setListOfRestaurants(response.data);
        setFilteredRestaurants(response.data);  
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // ✅ Improved Search Function
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = listOfRestaurants.filter((restaurant) =>
      restaurant?.name?.toLowerCase().includes(value)  // ✅ Handles undefined `name`
    );

    console.log("Filtered Results:", filtered);  
    setFilteredRestaurants(filtered);
  };

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <input
        type="text"
        placeholder="Search restaurants..."
        value={searchText}
        onChange={handleSearch}
        className="border p-2 w-full mb-4 rounded-md"
      />

      {loading ? (
        <Shimmer />
      ) : (
        <div>
          <h2 className="font-bold text-xl mb-4">Top restaurant chains</h2>

          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {filteredRestaurants.map((restaurant) => (
                <div key={restaurant.id} className="border p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold">{restaurant.name || "No Name Available"}</h3>
                  <p className="text-gray-700">{restaurant.cuisine || "Cuisine not available"}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No restaurants found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TopRestaurant;
