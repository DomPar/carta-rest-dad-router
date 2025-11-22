import { Outlet, Link } from 'react-router-dom'
import './App.css'

const App = () => {
    return (
        <div id="mainContainer">
            <header className="appHeader">
                <div className="restaurantTitle">
                    <h2>Reactorant</h2>
                </div>

                <Link to="/" className="categoriesLink">
                    <h3>Categories</h3>
                </Link>
            </header>
            <main className="appContent">
                <Outlet />
            </main>
        </div>
    )
}

export default App
