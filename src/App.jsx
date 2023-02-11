import React, { useEffect, useState } from 'react'
import './App.css'
import Home from './components/Home'
import Navbar from './components/Navbar'

function App() {
  const [selectValue, setSelectValues] = useState()
  const handleValues = (value) => {
    setSelectValues(value[0])

  }



  return (
    <>
      <Navbar handleValues={handleValues}></Navbar>
      <Home value={selectValue}></Home>
    </>
  )
}

export default App
