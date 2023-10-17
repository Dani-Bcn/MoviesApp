import React, { useState } from "react";
import Calls_Api from "../Functions-Api/Calls_Api";
import Svg from "./Svg";
export default function Home() {

  const dataOverage=((e)=>(
     <Svg e={e}/>
  ))
  
  return (
    <main
      className="
      w-screen
        flex
        flex-col
        justify-center
        items-center
        bg-slate-800
        z-20
      "
    >
        <h1
          className="
          text-indigo-400

            text-7xl
            lg:text-8xl
            mt-10
            my-20
            drop-shadow-[200px]
            drop-red-500
          "
        >MoviesApp</h1>        
       <Calls_Api dataOverage={dataOverage}/> 
    
    </main>
  );
}
