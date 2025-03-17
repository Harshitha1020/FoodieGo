import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import { UserContext } from "./UserContext"; // Use named import
import StarSymbol from "../utils/StarSymbol";
import { LuDot } from "react-icons/lu";

const RestaurantCard = ({
  resData: {
    cloudinaryImageId,
    aggregatedDiscountInfoV3,
    name,
    cuisines,
    avgRating,
    sla,
    areaName,
  },
}) => {
  const { loggedInUser } = useContext(UserContext); // Remove if not used

  // Helper function to render discount overlay
  const renderDiscountOverlay = () => {
    if (!aggregatedDiscountInfoV3) return null;
    const { header, subHeader } = aggregatedDiscountInfoV3;
    return (
      <div className="image-overlay absolute w-full h-full top-0 flex items-end text-white text-xl p-3 bg-gradient-to-t from-black/70 to-transparent">
        {header} {subHeader}
      </div>
    );
  };

  return (
    <div
      data-testid="resCard"
      className="w-[150px] md:w-[273px] hover:scale-90 cursor-pointer hover:border-t-4 transition-transform duration-200"
    >
      <div className="h-[100px] md:h-[182px] rounded-[15px] overflow-hidden relative">
        <img
          className="object-cover w-full h-full rounded-lg"
          alt={`${name} restaurant`}
          src={CDN_URL + cloudinaryImageId}
        />
        {renderDiscountOverlay()}
      </div>
      <div className="m-2 p-2">
        <div className="handletext mt-1 font-bold text-xl">{name}</div>
        <div className="flex items-center mt-1 font-bold text-sm md:text-lg">
          <StarSymbol className="mr-1" />
          {avgRating}
          <LuDot />
          {sla?.slaString}
        </div>
        <div className="handletext overflow-hidden text-slate-700">
          {cuisines?.join(", ")}
        </div>
        <div className="text-slate-700">{areaName}</div>
      </div>
    </div>
  );
};

// Higher-Order Component for "Open" label
export const withOpenLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div className="relative">
        <label className="absolute m-2 p-2 bg-black text-white rounded-lg font-bold scale-75 z-10">
          Open
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;