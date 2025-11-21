import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './pages/CategoryPage/CategoryPage.jsx'
import {RouterProvider} from 'react-router-dom'
import router from './router/index_router.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
