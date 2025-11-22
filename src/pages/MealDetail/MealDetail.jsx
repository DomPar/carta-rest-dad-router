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
                ← Volver
            </button>

            <div className="mealDetailCard">
                <div className="mealDetailImage">
                    <img src={meal.thumb} alt={meal.name} />
                </div>

                <div className="mealDetailInfo">
                    <h1>{meal.name}</h1>
                    <p><strong>Category:</strong> {meal.category}</p>
                    {meal.area && <p><strong>Origin:</strong> {meal.area}</p>}
                    <h2>Intructions:</h2>
                    <div className="mealInstructions">
                        {meal.instructions}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MealDetail
