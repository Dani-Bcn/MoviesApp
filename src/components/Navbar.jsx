import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar(props) {
  const { active } = props;
  const { selectMovieOrTv } = props;

  const [activePage, setActivePage] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();


  return (
    <main className="z-100">
      <section
        className="flex items-center justify-start "
      >
        {location.pathname !== "/" ? (
          <button
            className="
              absolute
              w-5              
              px-5
            "
            onClick={() => {
              navigate(-1), console.log(location.pathname);
            }}
          >
            Back
          </button>
        ) : null}

        <h1
          onClick={() => navigate("/")}
          className="
              w-screen my-5 flex items-center justify-center text-2xl text-orange-200 "
        >
          App Movies
        </h1>
      </section>
      <section
        className="m-5 flex items-center justify-around z-50"
      >        
        <button
          onClick={() => {
            selectMovieOrTv(true), navigate("/") ,localStorage.setItem("movieOrTv","movie");
          }}>
          Movies
        </button>
        <button
          onClick={() => {
            selectMovieOrTv(false), navigate("/"),localStorage.setItem("movieOrTv","tv");
          }}
        >
          Tv
        </button>
        <svg
          onClick={() => active(true)}
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
