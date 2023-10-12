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

  const [valuesMovie, setValuesMovie] = useState()
  const info = ((info) => {
    setValuesMovie(info)
  })

  return (
    <m.main>
     <h1
      className='
        flex
        items-center
        justify-center
        text-indigo-200
        h-24
        text-5xl
        font-bold
        bg-gradient-to-r from-red-900 to-red-200
      '
     >MoviesApp</h1>
      <Routes>
        <Route path='/' element={<Home value={selectValue} info={info} />} />
        <Route path='/info' element={<PageInfoMovie valuesMovie={valuesMovie} />} />
        <Route path='/infoActor' element={<PageInfoActor />} />
      </Routes>
    </m.main>
  )
}

export default App
