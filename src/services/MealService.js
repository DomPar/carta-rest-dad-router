async function getData(category, searchTerm) {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        const data = result.meals.map((meal) => ({
            id: meal.idMeal,
            name: meal.strMeal,
            category: category,
            thumb: meal.strMealThumb,
            price: (Math.random() * 20 + 5).toFixed(2),
        }));

        if (searchTerm && searchTerm.trim() !== "") {
            const lower = searchTerm.toLowerCase();
            return data.filter((item) => item.name.toLowerCase().includes(lower));
        }

        return data;
    } catch (error) {
        throw error;
    }
}

async function getMealById(id) {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        const meal = result.meals?.[0];

        if (!meal) {
            throw new Error("Plato no encontrado");
        }

        return {
            id: meal.idMeal,
            name: meal.strMeal,
            category: meal.strCategory,
            area: meal.strArea,
            thumb: meal.strMealThumb,
            instructions: meal.strInstructions,
        };
    } catch (error) {
        throw error;
    }
}

async function getCategories() {
    const url = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        const categories = (result.meals || []).map((item) => item.strCategory);

        return categories;
    } catch (error) {
        throw error;
    }
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


export { getData, getMealById, getCategories, getFirstThumbByCategory };
