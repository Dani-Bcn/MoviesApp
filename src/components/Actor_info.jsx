import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Actor_info = (props) => {
  const { idPerson } = props;
  console.log(idPerson, "id");
  const navigate = useNavigate();
  const [infoActor, setInfoActor] = useState();
  useEffect(() => {
    idPerson
      ? fetch(
          `https://api.themoviedb.org/3/person/${idPerson}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
        )
          .then((resp) => resp.json())
          .then((resp) => setInfoActor(resp))
      : null;
  }, []);
  idPerson ? console.log(infoActor) : null;
  return (
    <main
      className="
      absolute
        w-screen
        bg-slate-700
        flex
        flex-col
        items-center
        justify-center
        text-indigo-200
        text-[1.1rem]
        z-50
      "
    >
      <div>
        {infoActor !== undefined ? (
          <section
            className="
            flex
            flex-col
            w-screen
            justify-center
            items-center
            p-10
            gap-5
            "
          >
            <img
              className="
                flex
                justify-center
                items-center                
                w-[150px]
                my-5
                cursor-auto
                m-auto
            "
              src={`https://image.tmdb.org/t/p/w500/${infoActor.profile_path}`}
              alt=""
            />
            <h2>{infoActor.name}</h2>
            <p>{infoActor.birthday}</p>
            <p>{infoActor.place_of_birth}</p>
            <a href={infoActor.homepage}>Home page</a>
            <p>{infoActor.biography}</p>
          </section>
        ) : null}
      </div>
    </main>
  );
};

export default Actor_info;
