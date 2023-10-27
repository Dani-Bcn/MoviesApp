import React, { useState, useEffect } from "react";

export default function Trailers() {
  const movieOrTv = localStorage.getItem("movieOrTv");
  const [idMovie, setIdMovie] = useState(localStorage.getItem("idMovie"));

  const [dataVideos, setDataVideos] = useState();

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}/videos?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => setDataVideos(resp.results));
  }, [idMovie]);

  dataVideos ? console.log(dataVideos) : null;

  return (
    <main className="my-20">
      <h1 className="m-5 text-2xl text-orange-100">Trailes</h1>
      {dataVideos
        ? dataVideos.map((e, i) => (
            <section key={i} className="z-10 my-10">
              <iframe
                className="w-screen h-60 mr-5 md:h-96"
                src={`//www.youtube.com/embed/${e.key}/?autoplay=0;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1`}
              ></iframe>
            </section>
          ))
        : null}
    </main>
  );
}
