import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Form1 from './pages/Form1'
import Form2 from './pages/Form2'
import List from './pages/List'


const App = () => {
  return (
    <>
   <Routes>
    <Route path='/' Component={Form1} />
    <Route path='/form2' Component={Form2} />
    <Route path='/list' Component={List} />
   </Routes>
    </>
  )
}

export default App
