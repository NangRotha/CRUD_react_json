import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AddNewStudent from './pages/AddNewStudent'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage/>} />
          <Route path='/add' element={<AddNewStudent/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
