import React, { useEffect, useState } from "react";

export default function Filmography(props) {
  const { keyWord } = props;
  const [info, setInfo] = useState();

  useEffect(() => {
    keyWord
      ? fetch(
          `http://api.themoviedb.org/3/discover/movie?with_cast=${keyWord}&sort_by=release_date.desc&api_key=55b2cf9d90cb74c55683e395bb1ad12b&page=1`
        )
          .then((resp) => resp.json())
          .then((resp) => setInfo(resp.results))
      : null;
  }, []);
  keyWord ? console.log(info) : null;
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
              return (
                <img key={i}
                className="
                m-5
                "
                src={`https://image.tmdb.org/t/p/w500/${e.poster_path}`} />
              );
            })
          : null}
      </section>
    </main>
  );
}
