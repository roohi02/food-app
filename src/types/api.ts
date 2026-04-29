export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
};
export type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};
export type RecipeDetailType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string; // ✅ ADD THIS
};