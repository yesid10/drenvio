import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'
import NotLoggedIn from '../pages/NotLoggedIn'

const AppRouter = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<LoginPage/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/not-logged-in' element={<NotLoggedIn/>}/>
        </Routes>
    </BrowserRouter>
  )
}

export default AppRouter