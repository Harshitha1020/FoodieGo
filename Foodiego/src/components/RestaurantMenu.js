import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestauranCategory";
import { useState } from "react";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const resInfo = useRestaurantMenu(resId);

  const [showIndex,setShowIndex] = useState(null);

  const handleSetShowIndex=(index)=>{
    setShowIndex(showIndex===index?null:index);
  };
  
  if (resInfo === null) return <Shimmer></Shimmer>;

  const { name, cuisines, costForTwoMessage } =
    resInfo?.cards[2]?.card?.card?.info;
  //untill unless i have not defined the shimmer on top it  is giving me error as these valuses are
  //undefined because in starting our resInfo list is empty and it is trying to find from it due to which
  //it is giving error.

  const { itemCards } =
    resInfo?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card
      ?.card ||
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  //this is because while looking into the console in api data sometime coming in card[4] and sometimes in card[5]
  // console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

  const categories =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
 

  //console.log(categories);
  var key = 0;

  return (
    <div className="md:mx-2 md:p-4 text-center">
      <h1 className="m-2  text-2xl font-bold">{name}</h1>
      <h2 className="mx-2 p-2 font-bold text-lg">
        {cuisines.join(", ")} - {costForTwoMessage}
      </h2>
      <p>
        {categories.map((category,index) => (
          <RestaurantCategory 
          key={key++} 
          data={category?.card?.card} 
          showList={index ===showIndex && true}
          settingShowIndex={()=>handleSetShowIndex(index)}
          />
        ))}
        ;
      </p>
    </div>
  );
};

export default RestaurantMenu;
