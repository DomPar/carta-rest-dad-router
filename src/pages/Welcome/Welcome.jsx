// src/pages/Welcome/Welcome.jsx
import React from 'react'
import { Link } from 'react-router-dom'
import './Welcome.css'

const CATEGORIES = ['Seafood', 'Beef', 'Chicken', 'Dessert']

const Welcome = () => {
  return (
    <div className="welcomeContainer">
      <h1 className="welcomeTitle">Bienvenido al menú</h1>
      <p className="welcomeSubtitle">
        Selecciona una categoría para ver los platos disponibles:
      </p>

      <div className="categoriesGrid">
        {CATEGORIES.map((cat) => (
          <Link key={cat} to={`/${cat}`} className="categoryCard">
            <h2>{cat}</h2>
            <span className="categoryHint">Ver platos</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Welcome
