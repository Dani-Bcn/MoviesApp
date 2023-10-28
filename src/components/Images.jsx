import { useEffect, useState } from "react";

export default function Images() {
  const imagesTypes = localStorage.getItem("imagesTypes") 
  const [dataImages,setDataImages]= useState()
  const idMovie = localStorage.getItem("idMovie");
  const movieOrTv = localStorage.getItem("movieOrTv");

  useEffect(() => {
  idMovie?

       fetch(
          `https://api.themoviedb.org/3/${movieOrTv}/${idMovie}/images?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
        )
          .then((resp) => resp.json())
          .then((resp) => setDataImages(resp))
     :null
  }, [idMovie])

  return (
    <div className=" absolute text-orange-100 flex flex-wrap w-screen  h-screen justify-center items-center px-5 gap-5 py-10">
   {  
   imagesTypes ==="Backdrops" ?
   dataImages?
   dataImages.backdrops.map((e, i) => {
   console.log(e.width)

            return (               
              <img 
                key={i}
                className={`z-10 w-[350px] rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-black/100`}
                src={`https://image.tmdb.org/t/p/w500/${e.file_path}`}
              />           
            );
          }):null:null
        } 
        {  
   imagesTypes ==="Logos" ?
   dataImages?
   dataImages.logos.map((e, i) => {
            return (
           
              <img
                key={i}
                className={`w-[350px] h-[150px] z-10 p-5 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-black/100 `}
                src={`https://image.tmdb.org/t/p/w500/${e.file_path}`}
              />
          
            );
          }):null:null
        } 
        {  
   imagesTypes ==="Posters" ?
   dataImages?
   dataImages.posters.map((e, i) => {
            return (
              <img
                key={i}
                className="w-[150px] z-10 rounded-2xl border-[3px] border-orange-300 shadow-xl shadow-black/100 "
                src={`https://image.tmdb.org/t/p/w500/${e.file_path}`}
              />
            );
          }):null:null
        } 



    </div>
  );
}
