import React, { useState } from "react";
import Calls_Api from "../Functions-Api/Calls_Api";

export default function Home() {



  
  return (
    <main
      className="
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
            mt-20
            drop-shadow-[200px]
            drop-red-500
          "
        >MoviesApp</h1>
        
      <Calls_Api/>

     
      
     

    </main>
  );
}
