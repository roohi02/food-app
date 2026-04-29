// src/utils/getIngredients.ts

export const getIngredients = (recipe: any) => {
  if (!recipe) return [];

  const ingredients: string[] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim()) {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return ingredients;
};