import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { motion as m } from 'framer-motion'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import PageInfo from './components/PageInfo'

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
    <m.main
      animate={{
        opacity: [0, 1],
        y: [50, 0],
        transition: {
          duration: 1.5,
        }
      }}
    >
      <Navbar handleValues={handleValues}></Navbar>
      <Routes>
        <Route path='/' element={<Home value={selectValue} info={info} />} />
        <Route path='/info' element={<PageInfo valuesMovie={valuesMovie} />} />
      </Routes>
    </m.main>
  )
}

export default App
