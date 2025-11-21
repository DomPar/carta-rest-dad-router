import './Navbar.css'

const Navbar = ({ categoryName, onSearchChange, onSort, sortMode }) => {
  const handleInputChange = (e) => {
    onSearchChange?.(e.target.value)
  }

  const handleSortClick = () => {
    onSort?.()
  }

  return (
    <div className="navbar">
      <h2 className="navbar-category">
        {categoryName}
      </h2>

      <input
        className="navbar-search"
        type="text"
        placeholder="Buscar plato..."
        onChange={handleInputChange}
      />

      <button
        onClick={handleSortClick}
      >
        {sortMode === 'none' && 'abc'}
        {sortMode === 'asc' && '$↑'}
        {sortMode === 'desc' && '$↓'}
      </button>
    </div>
  )
}

export default Navbar
