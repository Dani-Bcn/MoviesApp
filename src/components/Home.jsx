import React, { useState } from "react";
import Svg from "./Svg";
import Carousel_movies from "./Carousel_movies";
import Navbar from "./Navbar";
import Search from "./Search";

export default function Home() {



  const dataOverage = (e) => <Svg e={e} />;
  return (
    <main
    className="
    z-10
    "
    >
      
       <Search /> 
   
   <Navbar />  
    <Carousel_movies />   
       

      {/*   <List_Movies/> */}
      {/*   <Calls_Api dataOverage={dataOverage}/>  */}
    </main>
  );
}
