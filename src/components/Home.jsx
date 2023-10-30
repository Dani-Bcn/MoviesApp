import React, { useState, useEffect } from "react";
import Carousel_movies from "./Carousel_header";
import Carousel_popular from "./Carousel_popular";


export default function Home() {
 return (
  <main className="flex flex-col">
  <Carousel_movies />
  <Carousel_popular/>
  </main>
 )
  
}
