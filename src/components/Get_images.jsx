import React from 'react'

export default function Get_images() {

    useEffect(() => {
        fetch(
          `http://api.themoviedb.org/3/movie/575264/images?api_key=55b2cf9d90cb74c55683e395bb1ad12b`
        )
          .then((resp) => resp.json())
          .then((resp) => setResImages(resp));
      }, []);
  return (
        <main>Get images</main>
  )
}
