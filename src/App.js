import React, { Fragment } from 'react'
import { BrowserRouter ,Link } from 'react-router-dom'
import { CartContextProvider } from './Context/CartContext'
import MainRouter from './MainRouter'

export default function App() {
  return (
    <CartContextProvider>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </CartContextProvider>
  )
} 


