import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/home' element={<Home/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter