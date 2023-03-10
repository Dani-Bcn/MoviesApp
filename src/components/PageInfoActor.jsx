import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const PageInfoActor = () => {
    const navigate = useNavigate()
    const [infoLocale, setInfoLocale] = useState(JSON.parse(localStorage.getItem("infoActor")))
    const [indexActor, setIndexActor] = useState(localStorage.getItem("indexActor"))
    const [idActor, setIdActor] = useState(infoLocale.cast[indexActor].id)
    const [infoActor, setInfoActor] = useState()

    useEffect(() => {
        if (idActor) {
            fetch(`https://api.themoviedb.org/3/person/${idActor}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`)
                .then(resp => resp.json())
                .then(resp => setInfoActor(resp))
        }
    }, [])

    return (
        <main className='info-actor'>
            <section className='container-actor'>
                {
                    infoActor !== undefined && (
                        <img src={`https://image.tmdb.org/t/p/w500/${infoActor.profile_path}`} alt="" />
                    )
                }
                {
                    infoActor && (
                        <article className='card-info'>
                            {
                                infoActor.name && (
                                    <h1>{infoActor.name}</h1>
                                )
                            }
                            {
                                infoActor.birthday && (
                                    <h3>Birhtday  &nbsp;  &nbsp; <span>{infoActor.birthday}</span></h3>
                                )
                            }
                            {
                                infoActor.place_of_birth && (
                                    <h3>Place of birth  &nbsp;  &nbsp; <span>{infoActor.place_of_birth}</span></h3>
                                )
                            }
                            {
                                infoActor.homepage && (
                                    <h3>Homepage  &nbsp;  &nbsp; <a href={infoActor.homepage} target="_blank">{infoActor.homepage}</a></h3>
                                )
                            }
                            {
                                infoActor.popularity && (
                                    <h3>Popularity  &nbsp;  &nbsp;<span>{infoActor.popularity}</span></h3>
                                )
                            }
                            <button onClick={() => navigate(-1)}>Back</button>
                        </article>
                    )
                }
            </section>
            <article className='card-biography'>
                {
                    infoActor && (
                        <article>
                            <h3>Biography
                            </h3>
                            <br />
                            <br />
                            <p>{infoActor.biography}</p>
                        </article>
                    )
                }
            </article>
        </main>
    );
}

export default PageInfoActor;
