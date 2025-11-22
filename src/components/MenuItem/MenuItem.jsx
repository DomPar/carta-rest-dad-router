import { Link } from 'react-router-dom'
import './MenuItem.css'

const MenuItem = ({ id, category, name, thumb, price }) => {
    return (
        <Link to={`/${category}/${id}`} className="menuItemLink">
            <div className="menuItem">
                <img src={thumb} alt={name} />
                <h3>{name}</h3>
                <span>{price} €</span>
            </div>
        </Link>
    )
}

export default MenuItem
