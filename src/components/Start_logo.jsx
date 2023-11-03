import React, { useEffect } from "react";
import { motion as m } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Start_logo() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate("/home");
    }, 2000);
  },[]);

  return (
    <m.main
      className="fixed bg-black w-screen h-screen flex justify-center items-center z-50"
     
      exit={{
        opacity:0,
        transition:{
            duration:2
        }
      }}
    >
      <m.section
        animate={{
          scale: [0,10],
          transition: {
            duration: 4,
          },
        }}
      >
        <div className="w-52 h-52 bg-orange-300 clip-arrow-logo"> </div>
      </m.section>
      <m.section
        className=" absolute w-screen h-screen flex flex-col items-center justify-center"
        animate={{
          scale: [10,1],
          y:[-200,200,-200],
          transition: {
            duration: 2,            
          },
        }}
      >
        <m.h1
          className=" text-indigo-400 text-8xl font-Josefin"
          animate={{
            textShadow: "2px 1px 10px black",
          }}
        >
          Movies
        </m.h1>
        <m.h1
          className="text-indigo-400 text-8xl font-Josefin"
          animate={{
            textShadow: "2px 1px 10px black",
          }}
        >
          App
        </m.h1>
      </m.section>
    </m.main>
  );
}
