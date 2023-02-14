import React, { useState, useEffect } from 'react';

const PageInfo = () => {

    const [localeValue, setLocaleValue] = useState(false)
    const [valuesMovieOrTv, setValuesMovieOrTv] = useState(false)
    const [valueId, setValueId] = useState(false)

    useEffect(() => {
        setLocaleValue(window.localStorage.getItem("value"))
        console.log(localeValue[0])
    },)

    useEffect(() => {
        if (localeValue) {
            if (localeValue[0] === "m") {
                setValuesMovieOrTv(localeValue.split("").splice(0, 5).join(""))
                setValueId(localeValue.split("").splice(5,).join(""))
            } else {
                setValuesMovieOrTv(localeValue.split("").splice(0, 2).join(""))
                setValueId(localeValue.split("").splice(2,).join(""))
            }
        }
    },)

    useEffect(() => {
        if (valueId) {
            console.log(valueId, valuesMovieOrTv)
            fetch(`https://api.themoviedb.org/3/${valuesMovieOrTv}/${valueId}?api_key=55b2cf9d90cb74c55683e395bb1ad12b`)
                .then(resp => resp.json())
                .then(resp => console.log(resp))
        }
    },)

    return (
        <div>
            <h1>Info</h1>
            {
                valueId && (
                    <h2>{valueId}</h2>
                )
            }
        </div>
    );
}

export default PageInfo;
