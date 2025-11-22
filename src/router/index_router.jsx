// src/router/router.jsx
import { createBrowserRouter } from 'react-router-dom'
import App from '../pages/App/App.jsx'
import Welcome from '../pages/Welcome/Welcome.jsx'
import CategoryPage from '../pages/CategoryPage/CategoryPage.jsx'
import MealDetail from '../pages/MealDetail/MealDetail.jsx'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Welcome />,
            },
            {
                path: ':categoryId',
                element: <CategoryPage />,
            },
            {
                path: ':categoryId/:mealId',
                element: <MealDetail />,
            }
        ],
    },
])

export default router
