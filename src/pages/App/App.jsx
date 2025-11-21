// src/App.jsx
import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './App.css'

const App = () => {
  return (
    <div id="mainContainer">
      <header className="appHeader">
        <div className="restaurantTitle">RESTAURANTE BLABLABLA</div>

        <Link to="/" className="categoriesLink">
          Categorías
        </Link>
      </header>
      <main className="appContent">
        <Outlet />
      </main>
    </div>
  )
}

export default App
