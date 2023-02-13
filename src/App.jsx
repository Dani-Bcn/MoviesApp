import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Information from './components/PageInfo'

function App() {
  const [selectValue, setSelectValues] = useState()
  const handleValues = (value) => {
    setSelectValues(value[0])
    
  }


     const [valuesMovie ,setValuesMovie ] = useState()
    const info=((info)=>{
      setValuesMovie(info)
    })
    console.log(valuesMovie)

  return (
    <>
      <Navbar handleValues={handleValues}></Navbar>
    
      <Routes>
        <Route path='/' element={<Home value={selectValue}  info={info}/>}/>
        <Route path='/info' element={<Information valuesMovie={valuesMovie}/>} />
      </Routes>
    </>
  )
}

export default App
