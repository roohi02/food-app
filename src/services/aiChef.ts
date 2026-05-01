export const aiChef = (message: string) => {
  const text = message.toLowerCase();

  // 🍗 Chicken ideas
  if (text.includes("chicken")) {
    return {
      title: "Chicken Meal Idea 🍗",
      recipe:
        "Garlic Butter Chicken Rice Bowl\n\nIngredients:\n- Chicken\n- Rice\n- Garlic\n- Butter\n- Salt & Pepper\n\nSteps:\n1. Cook rice\n2. Fry chicken with garlic butter\n3. Mix and serve hot",
      calories: 520,
    };
  }

  // 🍳 Eggs
  if (text.includes("egg")) {
    return {
      title: "Egg Breakfast 🍳",
      recipe:
        "Scrambled Eggs Toast\n\nIngredients:\n- Eggs\n- Bread\n- Butter\n- Salt\n\nSteps:\n1. Whisk eggs\n2. Cook on pan\n3. Toast bread\n4. Serve together",
      calories: 320,
    };
  }

  // 🥗 Healthy / diet
  if (text.includes("diet") || text.includes("healthy")) {
    return {
      title: "Healthy Bowl 🥗",
      recipe:
        "Veggie Protein Bowl\n\nIngredients:\n- Vegetables\n- Olive oil\n- Rice or quinoa\n\nSteps:\n1. Steam veggies\n2. Cook base\n3. Mix & serve",
      calories: 280,
    };
  }

  // 🍕 default fallback
  return {
    title: "Chef Suggestion 👨‍🍳",
    recipe:
      "Try a simple pasta:\n\nIngredients:\n- Pasta\n- Tomato sauce\n- Cheese\n\nSteps:\n1. Boil pasta\n2. Add sauce\n3. Serve hot",
    calories: 450,
  };
};