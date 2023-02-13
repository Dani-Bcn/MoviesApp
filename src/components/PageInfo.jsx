import React, { useState, useEffect } from 'react';

const Information = (value) => {
    const [values, setValues] = useState(null)
    const [failTitle, setFailTitle] = useState("title")
    const [idMovie, setIdMovie] = useState(value.valuesMovie.id)

    useEffect(() => {
        if (value.valuesMovie !== undefined) {
            console.log(values)
            setValues(value.valuesMovie)
            setFailTitle("title")
            value.valuesMovie.title ? setFailTitle(value.valuesMovie.title) : setFailTitle(value.valuesMovie.name)
        }

    }, [value])

    useEffect(()=>{
        fetch(`https://api.themoviedb.org/3/movie/${idMovie}/credits?api_key=55b2cf9d90cb74c55683e395bb1ad12b&language=en-US`)
    .then(resp => resp.json())
    .then(resp => console.log(resp)) 
    },[])
   

    return (
        <div className='info'>
            {
                values && (
                    <main>
                        <section className='card-info'>
                            <img src={`https://image.tmdb.org/t/p/w500/${values.poster_path}`} alt="" />
                            <article>
                                <h1>{failTitle}</h1>
                                <h3></h3>
                            </article>

                        </section>

                    </main>
                )
            }
        </div>
    );
}

export default Information;
