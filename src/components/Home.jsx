import React, { useState } from "react";
import { motion as m } from "framer-motion";
import Svg from "./Svg";
import Carousel_movies from "./Carousel_movies";
import Navbar from "./Navbar";
import Search from "./Search";

export default function Home() {
  const [activeSearch, setActiveSearch] = useState(false);

  const active = (e) => {
    console.log(activeSearch);
    setActiveSearch(e);
  };

  const dataOverage = (e) => <Svg e={e} />;

  const variants = {
    open: { x: 0,
      transition:{
        duration:0.5,
        ease:"circOut"
      }
    },
    
    closed: { x: 400,
      transition:{
        duration:0.5,
        ease:"circIn"
      }
    
    },

  };
  return (
    <main
      className="
    z-10
    "
    >
      <m.section 
      className="
        fixed
      "
      variants={variants} 
      animate={activeSearch ? "open" : "closed"}>
        <Search active={active} />
      </m.section>
      <Navbar active={active} />
      <Carousel_movies />

      {/*   <List_Movies/> */}
      {/*   <Calls_Api dataOverage={dataOverage}/>  */}
    </main>
  );
}
