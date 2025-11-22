import { Link } from 'react-router-dom'
import { getCategories, getFirstThumbByCategory } from '../../services/MealService'
import { useEffect, useState } from 'react'
import './Welcome.css'

const Welcome = () => {

    const [categories, setCategories] = useState([])
    const [categoryImages, setCategoryImages] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function loadCategories() {
            try {
                setIsLoading(true)
                setError(null)
                const data = await getCategories()
                setCategories(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }

        loadCategories()
    }, [])

    useEffect(() => {
        if (!categories.length) return

        async function loadThumbs() {
            const entries = await Promise.all(
                categories.map(async (cat) => {
                    try {
                        const thumb = await getFirstThumbByCategory(cat)
                        return [cat, thumb]
                    } catch {
                        return [cat, null]
                    }
                })
            )

            setCategoryImages(Object.fromEntries(entries))
        }

        loadThumbs()
    }, [categories])


    if (isLoading) {
        return (
            <div className="msgContainer">
                <h2>Loading categories...</h2>
            </div>
        )
    }

    if (error) {
        return (
            <div className="msgContainer">
                <h2>Error at loading categories</h2>
            </div>
        )
    }

    return (
        <div className="welcomeContainer">
            <h1 className="welcomeTitle">Welcome to the Reactorant</h1>
            <p className="welcomeSubtitle">
                Select a category to explore delicious meals:
            </p>

            <div className="categoriesGrid">
                {categories.map((cat) => {
                    const bgImage = categoryImages[cat]

                    return (
                        <Link
                            key={cat}
                            to={`/${cat}`}
                            className="categoryCard"
                            style={
                                bgImage
                                    ? {
                                        backgroundImage: `url(${bgImage})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }
                                    : {}
                            }
                        >
                            <div className="categoryOverlay">
                                <h2>{cat}</h2>
                                <span className="categoryHint">Show meals</span>
                            </div>
                        </Link>
                    )
                })}
            </div>

        </div>
    )
}

export default Welcome
