import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getMealById } from '../../services/MealService'
import './MealDetail.css'

const MealDetail = () => {
  const { categoryId, mealId } = useParams()
  const navigate = useNavigate()

  const [meal, setMeal] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadMeal() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getMealById(mealId)
        setMeal(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (mealId) {
      loadMeal()
    }
  }, [mealId])

  if (isLoading) {
    return (
      <div className="mealDetailContainer">
        <h2>Cargando plato...</h2>
      </div>
    )
  }

  if (error || !meal) {
    return (
      <div className="mealDetailContainer">
        <h2>Error al cargar el plato</h2>
        <button onClick={() => navigate(-1)}>Volver</button>
      </div>
    )
  }

  return (
    <div className="mealDetailContainer">
      <button
        className="mealBackButton"
        onClick={() => navigate(-1)}
      >
        ← Volver a {categoryId}
      </button>

      <div className="mealDetailCard">
        <div className="mealDetailImageWrapper">
          <img src={meal.thumb} alt={meal.name} />
        </div>

        <div className="mealDetailInfo">
          <h1>{meal.name}</h1>
          <p><strong>Categoría:</strong> {meal.category}</p>
          {meal.area && <p><strong>Origen:</strong> {meal.area}</p>}

          <h2>Preparación</h2>
          <p className="mealInstructions">
            {meal.instructions}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MealDetail
