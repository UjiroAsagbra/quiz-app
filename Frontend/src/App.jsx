import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './components/Landing'
import Questions from './components/Questions'
import './App.css'
import Scoreboard from './components/Scoreboard'





function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element= {<Landing/>}/>
      <Route path='/questions' element= {<Questions />}/>
       <Route path='/scoreboard' element={<Scoreboard/>}/>
</Routes>
    </BrowserRouter>
   
  )
}

export default App
