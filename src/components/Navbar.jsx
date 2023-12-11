import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion as m } from "framer-motion";

export default function Navbar(props) {
  const { activesearch } = props;

  const navigate = useNavigate();
  const location = useLocation()
  const [activeGenres, setActiveGenres] = useState(false);

  const variantsActiveGenres = {
    open: {
      height: 65,
    },
    closed: {
      height: 0,
    },
  };
  

  return (
    <m.main
      className="fixed h-10 w-screen z-50  justify-center items-center flex gap-5 backdrop-blur-sm bg-slate-800/[0.7]"
      initial={{
        y: -200,
      }}
      animate={{
        y: 0,
      }}
    >
      {
        location.pathname !== "/home"?
        <svg
        onClick={()=> navigate(-1)}
        className=" cursor-pointer -rotate-90 absolute -ml-[90vw]"
        fill="#000000"
        width="40px"
        height="25px"  
        viewBox="0 0 36 36"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
       
        <path
          d="M27.66,15.61,18,6,8.34,15.61A1,1,0,1,0,9.75,17L17,9.81V28.94a1,1,0,1,0,2,0V9.81L26.25,17a1,1,0,0,0,1.41-1.42Z "
          style={{
            fill: "wheat",
          }}
        
        />
        <rect x={0} y={0} width={36} height={36} fillOpacity={0} />
      </svg>
        
        :null
      }
   
        <button
          onClick={() => {
            navigate("/home");
            localStorage.setItem("movieOrTv", "movie");
          }}
        >
          Movies
        </button>
        <button
          onClick={() => {
            navigate("/home");
            localStorage.setItem("movieOrTv", "tv");
          }}
        >
          Tv
        </button>
        <section
          onClick={() => {
            setActiveGenres(!activeGenres);
          }}
          className="relative px-2"
        >
          <button>Genres</button>
          <m.ul
            className="absolute flex flex-col h-0 my-2 gap-2 overflow-hidden px-2 -ml-2 bg-slate-800 rounded-b-lg"
            variants={variantsActiveGenres}
            animate={activeGenres ? "open" : "closed"}
          >
            <li>
              <button
                onClick={() => {
                  localStorage.setItem("movieOrTv", "movie");
                  navigate("/findGenres");
                }}
                className=" rounded-lg"
              >
                Movies
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.setItem("movieOrTv", "tv");
                  navigate("/findGenres");
                }}
              >
                Tv
              </button>
            </li>
          </m.ul>
        </section>
        <svg
        className="cursor-pointer"
          onClick={() => activesearch(true)}
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z"
            fill="#599"
          />
        </svg>
     
    </m.main>
  );
}
