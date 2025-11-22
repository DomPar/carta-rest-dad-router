Esta aplicación es una carta de restaurante desarrollada con React y Vite. La navegación se organiza en tres niveles de rutas utilizando react-router-dom. La ruta raíz "/" muestra la pantalla de bienvenida, donde se listan las categorías obtenidas dinámicamente desde la API de TheMealDB. Cada categoría enlaza a una ruta de tipo /:categoryId, que renderiza el listado de platos de esa categoría. Desde ese listado, al hacer clic en cualquier plato se navega a la ficha de detalle en la ruta /:categoryId/:mealId. 

El enrutado se configura con createBrowserRouter y un componente de layout principal (App) que contiene el <Outlet /> para las páginas hijas. El router se declara en un archivo especifico para ello, en este caso src/router/index_router.jsx.

```jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../pages/App/App.jsx";
import Welcome from "../pages/Welcome/Welcome.jsx";
import CategoryPage from "../pages/CategoryPage/CategoryPage.jsx";
import MealDetail from "../pages/MealDetail/MealDetail.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: ":categoryId",
        element: <CategoryPage />,
      },
      {
        path: ":categoryId/:mealId",
        element: <MealDetail />,
      },
    ],
  },
]);

export default router;
```
## Consumo de la API: archivo `MealService.js`
La lógica de la interfaz se apoya en los hooks useState y useEffect. Cada página mantiene su propio estado de carga y error mientras se realizan peticiones se muestran mensajes de “Cargando…” y, si algo falla, se enseña un mensaje de error en lugar de dejar la pantalla vacía. En la vista de categorías se mantiene además el término de búsqueda y el modo de ordenación, que se aplican sobre los datos ya recibidos para no repetir llamadas innecesarias. En la vista de detalle de un plato se vuelve a usar useEffect para lanzar la petición a partir del identificador mealId recibido por parámetros de ruta.

El consumo de la API se centraliza en un archivo de servicios, src/services/MealService.js. Este archivo contiene las funciones que utilizan el fetch nativo del navegador para acceder a TheMealDB y transformar las respuestas al formato que usan los componentes. La función getData(category, searchTerm) devuelve la lista de platos de una categoría, aplicando un filtrado opcional por nombre y añadiendo un precio simulado. La función getCategories() obtiene todas las categorías disponibles, que se utilizan en la pantalla de bienvenida para generar de forma dinámica los botones de navegación, junto a getFirstThumbByCategory(category) que se usa para añadir una imagen a cada botón de categoría. Por último, getMealById(id) devuelve la información detallada de un plato concreto para la ficha de detalle. La estructura básica de este archivo es la siguiente:

```jsx
async function getData(category, searchTerm) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    const response = await fetch(url);
    const result = await response.json();

    const data = result.meals.map((meal) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        category,
        thumb: meal.strMealThumb,
        price: (Math.random() * 20 + 5).toFixed(2),
    }));

    if (searchTerm && searchTerm.trim() !== "") {
        const lower = searchTerm.toLowerCase();
        return data.filter((item) => item.name.toLowerCase().includes(lower));
    }

    return data;
}

async function getCategories() {
    const url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
    const response = await fetch(url);
    const result = await response.json();
    return result.meals.map((item) => item.strCategory);
}
    
async function getFirstThumbByCategory(category) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
    }
    
    const result = await response.json()
    const firstMeal = result.meals?.[0]
    
    return firstMeal ? firstMeal.strMealThumb : null
}

async function getMealById(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await fetch(url);
    const result = await response.json();
    const meal = result.meals?.[0];

    return {
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        thumb: meal.strMealThumb,
        instructions: meal.strInstructions,
    };
}

export { getData, getMealById, getCategories, getFirstThumbByCategory };
```

## Uso de parámetros dinámicos (`useParams`) y paso a funciones del servicio
Los componentes de categoría y detalle reciben parámetros dinámicos desde la URL usando `useParams`.  
Luego estos valores se pasan directamente a las funciones del servicio.

### Ejemplo en la vista de categoría:

```jsx
import { useParams } from 'react-router-dom'
import getData from '../../services/MealService'

const { categoryId } = useParams()
const data = await getData(categoryId, searchTerm)
```

### Ejemplo en la vista de detalle:
```jsx
import { useParams } from 'react-router-dom'
import { getMealById } from '../../services/MealService'

const { mealId } = useParams()
const meal = await getMealById(mealId)
```

Esto conecta directamente las rutas dinámicas con las consultas a la API.

## Enlace al repositorio

*https://github.com/DomPar/carta-rest-dad-router*

