import React, { useEffect, useState } from "react";

export default function Get_videos() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/299054/videos?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
    )
      .then((resp) => resp.json())
      .then((resp) => console.log(resp));
  }, [active]);
  return (
    <main
    className="w-screen h-screen bg-slate-600 z-50"
    >
      <h1 className="text-10xl text-red-800" onClick={() => setActive(!active)}>
        videos
      </h1> 
      <iframe type="text/html"         
      className="
        m-auto
        w-full
        h-96  
      "
      src="//www.youtube.com/embed/DvJO4UZN_-w?autoplay=1;origin=https%3A%2F%2Fwww.themoviedb.org&amp;hl=es&amp;modestbranding=1&amp;fs=1&amp;autohide=1"></iframe>
    </main>
  );
}
