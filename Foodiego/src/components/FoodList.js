import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { debounce } from "lodash";

const API_URL = "http://127.0.0.1:8000/api/grocery/";

const FoodList = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(API_URL)
      .then((response) => {
        console.log("API Response:", response.data);
        if (Array.isArray(response.data)) {
          setFoodItems(response.data);
          setFilteredItems(response.data);
        } else {
          console.error("Invalid data format from API");
        }
      })
      .catch((error) => {
        setError("Error fetching data.");
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Create debounced function for search filtering
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      const filtered = foodItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }, 500),
    [foodItems] // Dependency on foodItems so it updates when foodItems changes
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value); // Update searchText immediately
    debouncedSearch(e.target.value); // Call debounced search function
  };

  const clearSearch = () => {
    setSearchText("");
    setFilteredItems(foodItems); // Show all items again after clearing the search
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Grocery Items</h2>

      <div className="mb-4 flex">
        <input
          type="text"
          placeholder="Search food items..."
          value={searchText}
          onChange={handleSearch} // Handle input change immediately
          className="border p-2 w-full rounded-lg"
        />
        <button
          onClick={clearSearch}
          className="ml-2 px-4 py-2 bg-gray-300 text-black rounded-lg"
        >
          Clear
        </button>
      </div>

      {loading && <div className="text-center text-blue-500">Loading...</div>}

      {error && <div className="text-center text-red-500">{error}</div>}

      <div className="space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700">₹{item.price}</p>
              <p className="text-sm">{item.description}</p>
            </div>
          ))
        ) : (
          <p className="text-red-500 font-bold">⚠ No food items found.</p>
        )}
      </div>
    </div>
  );
};

export default FoodList;
