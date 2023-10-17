import React from "react";
import { motion as m } from "framer-motion";

export default function Svg(props) {

  return (
    <main
      className="     
      absolute
      flex
      w-24
      mt-[170px]
      ml-[100px]
      items-end
      justify-end
        z-10
      "
    >
      <m.svg
        className="
      
        flex
      items-end
      justify-end
      "
        viewBox="0 0 20 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <m.circle
          cx="10"
          cy="10"
          r="7"
          fill="#0099"
          stroke="#929"
          strokeWidth={2}
          animate={{
            pathLength: [0, props.e /10],
            transition: {
              duration: 2,
            },
          }}
        />       
      </m.svg>
    </main>
  );
}
