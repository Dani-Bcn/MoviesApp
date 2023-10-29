import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {motion as m} from "framer-motion"

export default function Navbar(props) {
  const { activeSearch } = props;

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <main className="fixed  w-screen z-50 p-1 flex flex-col  backdrop-blur-sm bg-slate-800/[0.7]" >  
    <section className="m-auto p-1" >
    <h1 className="text-[1.1rem] text-orange-200"
      onClick={() => navigate("/")}>
        App Movies
      </h1>
    </section>
      <section className="flex justify-around">        
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
