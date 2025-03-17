
import  { useState,useEffect } from "react";

export const useResData = () => {
    //fetch data
    const [dataOfRestaurants, setDataOfRestaurants] = useState([]);

    useEffect(() => {
        fetchData();
      }, []);
    
      const fetchData = async () => {
        const data = await fetch(
          "https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D28.6655181%26lng%3D77.258312%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING");
        // above statement will return a promise , so we need to resolve the promise
    
        const json = await data.json(); //now we will convert this fetched data into json
        setDataOfRestaurants(json?.data?.cards[0]?.card?.card?.imageGridCards?.info);
        //console.log(dataOfRestaurants);
};
return dataOfRestaurants;
}

export default useResData;
