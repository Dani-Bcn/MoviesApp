import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const { active } = props;
  const {selectMovieOrTv} = props

  const [activePage, setActivePage] = useState(true);
 const navigate = useNavigate()

  return (
    <main >
<section>

     <h1
     onClick={()=>navigate("/")}
     className="
     w-screen
     my-5
     flex
     items-center
     justify-center
     text-2xl     
     text-orange-200
     ">App Movies</h1>     
     </section>
      <section
        className="
            w-full
            my-5
            flex
            items-center
            justify-center
            z-50
        "
      > 


        <button
         onClick={()=>{selectMovieOrTv(true),navigate("/")}}
          className="
            w-12
          "
        >Movies</button>
        <button
        onClick={()=>{selectMovieOrTv(false),navigate("/")}}
         className="
         w-40
       "
        >Tv</button>
        <svg
          onClick={() => active(true)}
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"         
          xmlns="http://www.w3.org/2000/svg"
          className="
            -pl-2
            ml-5
          "
        >
          <path
            d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z"
            fill="#599"
          />
        </svg>
      </section>
    </main>
  );
}
