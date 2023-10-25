import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion as m } from "framer-motion";

const Actor_info = (props) => {
  const { idPerson } = props;
  const { getKeyWord } = props;
  const navigate = useNavigate();
  const [infoActor, setInfoActor] = useState();
  const [activeBiography, setActiveBiography] = useState(false);

useEffect(()=>{
  fetch(
    `https://api.themoviedb.org/3/person/${idPerson}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
  )
    .then((resp) => resp.json())
    .then((resp) => setInfoActor(resp));

  },[infoActor])
  const variantsBiography = {
    open: {
      height: "auto",
      transition: {
        duration: 1,
      },
    },
    closed: {
      height: "0vh",
      transition: {
        duration: 1,
      },
    },
  };
  return (
    <main
      className="
      absolute
        w-screen
        bg-slate-800
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
            {infoActor.homepage ? (
              <a href={infoActor.homepage}>Home page</a>
            ) : null}
            <section>
              <section
                className="
                w-full
                h-20
                flex
                flex-col
                items-start
                justify-around
                "              
              >
                <button
                  className="
                    w-0                                              
                  "
                  onClick={() => {
                    navigate("/filmography"), getKeyWord(idPerson);
                  }}
                >
                  Filmography
                </button>
                <button
                  className="
                    w-0                  
                  "
                  onClick={() => setActiveBiography(!activeBiography)}
                >
                  Biography
                </button>
              </section>
              <m.section
                className="
                  overflow-hidden
                  h-0
                "
              variants={variantsBiography}
                animate={
                  activeBiography? "open" : "closed"
                }
              >
                <p>{infoActor.biography}</p>
              </m.section>
            </section>
          </section>
        ) : null}
      </div>
    </main>
  );
};

export default Actor_info;
