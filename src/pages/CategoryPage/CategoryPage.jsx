// src/pages/CategoryPage/CategoryPage.jsx
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './CategoryPage.css'
import {getData} from '../../services/MealService'
import MenuList from '../../components/MenuList/MenuList'
import Navbar from '../../components/Navbar/Navbar'

function CategoryPage() {
  const { categoryId } = useParams()
  const navigate = useNavigate()

  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortMode, setSortMode] = useState('none')

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true)
        setError(null)
        const data = await getData(categoryId, searchTerm)
        setItems(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    if (categoryId) {
      loadData()
    }
  }, [categoryId, searchTerm])

  const handleSort = () =>
    setSortMode(prev =>
      prev === 'none' ? 'asc' : prev === 'asc' ? 'desc' : 'none'
    )

  const displayedItems = [...items].sort((a, b) => {
    if (sortMode === 'asc') return a.price - b.price
    if (sortMode === 'desc') return b.price - a.price
    return 0
  })

  return (
    <div className="categoryPageContainer">
      <Navbar
        categoryName={categoryId}
        onSearchChange={setSearchTerm}
        onSort={handleSort}
        sortMode={sortMode}
      />

      {isLoading && (
        <div className="msgContainer">
          <h2>Cargando los datos...</h2>
        </div>
      )}
      {error && (
        <div className="msgContainer">
          <h2>Error: No se ha podido acceder a los datos de la carta.</h2>
        </div>
      )}
      {!isLoading && !error && (
        <MenuList items={displayedItems} />
      )}
    </div>
  )
}

export default CategoryPage
