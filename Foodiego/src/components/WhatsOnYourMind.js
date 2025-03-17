import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import useResData from "../utils/useResData";
import { CDN_URL } from "../utils/constants";
import Shimmer from "./Shimmer";


export const WhatsOnYourMind = () => {
  const resData = useResData();
  //console.log(resData);
  const [slide, setSlide] = useState(3);


  const prevSlide = () => {
    if (slide == 0) return false;
    setSlide(slide - 3);
  };

  const nextSlide = () => {
    if (resData.length - 8 == slide) return false;
    setSlide(slide + 3);
  };
  // if(resData.lenth===0){
  //   return <Shimmer/>;
  // }

  return (
    resData.length===0?<Shimmer/> :  <div className="max-w-[1200px] mx-auto">
    <div className=" flex items-center py-4 justify-between align-middle">
      <div className="font-bold text-sm md:text-xl">
        What's on your mind?
      </div>
      <div className="flex">
        <div
          onClick={prevSlide}
          className="cursor-pointer flex justify-center items-center h-[34px] w-[34px] bg-[#e2dee7] rounded-full mx-1 "
        >
          <FaArrowLeft />
        </div>
        <div
          onClick={nextSlide}
          className="cursor-pointer flex justify-center items-center h-[34px] w-[34px] bg-[#e2dee7] rounded-full mx-1"
        >
          <FaArrowRight />
        </div>
      </div>
    </div>
    <div className="flex  overflow-hidden">
      {resData.map((d) => (
        //as we have done mapping so translate ek ko dene se baki sabko bhi same translat mil rha hai
        <div key={d.id}
          style={{ transform: `translateX(-${slide * 100}%)` }}
          className=" w-[150px]  shrink-0 duration-500"
        >
          <img  src={CDN_URL + d.imageId}></img>
        </div>
      ))}
    </div>
    <hr className="my-6 border"></hr>
  </div>
  );
};
