import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {motion as m} from "framer-motion"

export default function Navbar(props) {
  const { activeSearch } = props;

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className=" fixed  w-screen mt-8 z-20 flex flex-col bg-slate-800/[0.8]" >  
      <section className="flex justify-around py-2">        
        <button
          onClick={() => {
            navigate("/")
           localStorage.setItem("movieOrTv","movie");
          }}>
          Movies
        </button>
        <button
          onClick={() => {
            navigate("/")
            localStorage.setItem("movieOrTv","tv");
          }}
        >
          Tv
        </button>
        <svg
          onClick={() => activeSearch(true)}
          width="25px"
          height="25px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm-8 6a8 8 0 1 1 14.32 4.906l5.387 5.387a1 1 0 0 1-1.414 1.414l-5.387-5.387A8 8 0 0 1 2 10z"
            fill="#599"
          />
        </svg>
      </section>
    </main>
  );
}
