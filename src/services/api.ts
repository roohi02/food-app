const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const searchRecipes = async (query: string) => {
  try {
    const res = await fetch(`${BASE_URL}/search.php?s=${query}`);
    const data = await res.json();
    return data.meals || []; // ✅ FIX HERE
  } catch (error) {
    console.log("API Error:", error);
    return [];
  }
};



export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/categories.php`);
  const data = await res.json();
  return data.categories;
};