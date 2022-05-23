import React, { Fragment } from 'react'
import { BrowserRouter ,Link } from 'react-router-dom'
import MainRouter from './MainRouter'

export default function App() {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  )
} 
