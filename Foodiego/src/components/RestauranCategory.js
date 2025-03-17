import { useRef } from "react";
import ItemList from "./ItemList";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";

const RestaurantCategory=({data,showList,settingShowIndex})=>{
    const headerRef=useRef(null);

    // const[showList,setShowList]=useState(false);

    const hideShowList=()=>{
        settingShowIndex();
        headerRef.current.focus();
    }

    
    return(
        <div className="w-auto md:w-6/12 mx-auto my-4 bg-gray-50 shadow-lg  p-4" >
        <div className="flex justify-between cursor-pointer " onClick={(hideShowList)}  ref={headerRef}
        tabIndex={0} >
        <span className="mx-2 font-bold" >{data?.title} ({data.itemCards.length})</span>
            <span>{showList?<IoIosArrowDown className="font-bold text-black"/>:<IoIosArrowUp className="font-bold text-black" />}</span>
        </div>
            {showList && <ItemList  items={data.itemCards}/>}
        </div>

    )
};

export default RestaurantCategory;