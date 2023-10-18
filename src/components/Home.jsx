import React, { useState } from "react";
import Calls_Api from "../Functions-Api/Calls_Api";
import Svg from "./Svg";
import Search from "./Search";

export default function Home() {
  const dataOverage = (e) => <Svg e={e} />;
  return (
    <main
      className="
      overfolw-hidden    
        bg-slate-800
        z-20
      "
    >
     

      <Calls_Api dataOverage={dataOverage}/> 
    </main>
  );
}
