import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function BackGround_images() {
  const [movieOrTv, setMovieOrTv] = useState(localStorage.getItem("movieOrTv"));
  const [idMovie, setIdMovie] = useState(localStorage.getItem("idMovie"));
  const [dataMovie, setDataMovie] = useState();
  const [keyWord, setKeyWord] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}/images?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataMovie(resp));
  }, [setDataMovie]);

  return dataMovie ? (
    <main
      className="
            absolute
            w-screen
            h-screen
            bg-slate-800
            text-2xl
            text-orange-50
            -mt-[140px]
            flex
            flex-col
            items-center
            z-20
        "
    >
      <header      
        className="
        flex
        gap-5
      ">
        <button onClick={()=>navigate(-1)}>Back</button>
        <h2
            className="
              py-10  
            "
        >Background images</h2>
      </header>
      <section>
        {dataMovie.backdrops.map((e, i) => (
          <img
            className="
            w-screen
            md:w-full
            md:h-[600px]
            p-5
            rounded-l-lg
            "
            key={i}
            src={`https://image.tmdb.org/t/p/w500/${e.file_path}`}
          />
        ))}
      </section>
    </main>
  ) : null;
}
