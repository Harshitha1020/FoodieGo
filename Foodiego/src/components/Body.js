import ResturantCard, { withOpenLabel } from "./ResturantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  // State Variables
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredListOfRestaurants, setFilteredListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState(""); 

  const RestaurantCardVeg = withOpenLabel(ResturantCard);

  // Fetch Data on Component Mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D28.6655181%26lng%3D77.258312%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING"
      );
      const json = await response.json();

      const restaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

      setListOfRestaurants(restaurants);
      setFilteredListOfRestaurants(restaurants);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  // ✅ Live Search: Runs when `searchText` changes
  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredListOfRestaurants(listOfRestaurants);
    } else {
      const filteredRestaurants = listOfRestaurants.filter((res) =>
        res.info?.name?.toLowerCase().includes(searchText.toLowerCase())
      );

      setFilteredListOfRestaurants(filteredRestaurants);
    }
  }, [searchText, listOfRestaurants]); // 🔥 Triggers on searchText change

  // Check Online Status
  const isOnline = useOnlineStatus();
  if (!isOnline) return <h1>⚠ You lost your internet connection! Please check.</h1>;

  // Show Loading Shimmer
  if (listOfRestaurants.length === 0) return <Shimmer />;

  return (
    <div className="body max-w-[1200px] mx-auto">
      <div className="flex m-1 p-1">
        <div className="search">
          {/* ✅ Search Input */}
          <input
            type="text"
            data-testid="searchInput"
            className="border border-gray-400 rounded-md p-2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search restaurants..."
          />

          {/* ✅ Filter Button (Ratings 4.0+) */}
          <button
            className="m-4 px-4 border border-gray-400 shadow-md rounded-xl font-bold"
            onClick={() => {
              const filteredList = listOfRestaurants.filter((res) => res.info.avgRating > 4);
              setFilteredListOfRestaurants(filteredList);
            }}
          >
            Ratings 4.0+
          </button>
        </div>
      </div>

      {/* ✅ Displaying Restaurants */}
      <h2 className="text-xl font-bold mt-6">Top Restaurants</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
        {filteredListOfRestaurants.length > 0 ? (
          filteredListOfRestaurants.map((restaurant) => (
            <Link key={restaurant?.info?.id} to={`/restaurants/${restaurant.info.id}`}>
              {restaurant.info.isOpen ? (
                <RestaurantCardVeg resData={restaurant?.info} />
              ) : (
                <ResturantCard resData={restaurant?.info} />
              )}
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">⚠ No restaurants found.</p>
        )}
      </div>
    </div>
  );
};

export default Body;
