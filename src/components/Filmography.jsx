import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Filmography(props) {
  const navigate = useNavigate();
  const {getIdMovie} = props
  console.log(getIdMovie)
  const { keyWord } = props;
  const [info, setInfo] = useState();

  useEffect(() => {
    keyWord
      ? fetch(
          `https://api.themoviedb.org/3/discover/movie?with_cast=${keyWord}&sort_by=release_date.desc&api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1`
        )
          .then((resp) => resp.json())
          .then((resp) => setInfo(resp.results))
      : null;
  }, []);
  return (
    <main
      className="
      absolute
        w-screen
        h-screen
        py-10
        flex
        flex-col
        items-center
        bg-slate-800
        text-orange-200
        z-50
        "
    >
      <h2
        className="
        text-2xl
        "
      >
        Filmography
      </h2>
      <section
        className="
          w-screen
          m-5
          flex        
          flex-wrap
          items-center
          justify-center
        "
      >
        {info
          ? info.map((e, i) => {
              return e.poster_path ? (
                <section
                  key={i}
                  onClick={() => {navigate("/infoMovie"), 
                  localStorage.setItem("idMovie",e.id)
                  localStorage.setItem("movieOrTv","movie")                
                }}
                  className="
                    flex
                    flex-col
                    items-center
                    rounded-[10px]
                  "
                >
                  <img
                    className="
                    m-5
                    rounded-[10px]
                  "
                    src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`}
                  />
                </section>
              ) : null;
            })
          : null}
      </section>
    </main>
  );
}
