import React, { useEffect, useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { motion as m } from 'framer-motion'
import './App.css'
import Home from './components/Home'

import PageInfoMovie from './components/PageInfoMovie'
import PageInfoActor from './components/PageInfoActor'


function App() {

  const [selectValue, setSelectValues] = useState()
  const handleValues = (value) => {
    setSelectValues(value[0])
  }
const navigate = useNavigate()
  const [valuesMovie, setValuesMovie] = useState()
  const info = ((info) => {
    setValuesMovie(info)
  })

  return (
    <m.main
      animate={{
        opacity:[0,0.1,1],
        x:[-200,0],
        transition:{
          duration:1
        }
      }}
    >
     <m.h1
      className='
        flex
        w-64
        h-16
        mt-10
        m-auto
        items-center
        justify-center
        text-indigo-200
        text-5xl
        font-bold
        cursor-pointer
      '
     onClick={()=>navigate("/")}
     
     animate={{
      opacity:[0,1],
        transition:{
          duration:0.5,
          delay:1.2,
        }
     }}
     >MoviesApp</m.h1>
      <Routes>
        <Route path='/' element={<Home value={selectValue} info={info} />} />
        <Route path='/info' element={<PageInfoMovie valuesMovie={valuesMovie} />} />
        <Route path='/infoActor' element={<PageInfoActor />} />
      </Routes>
    </m.main>
  )
}

export default App
