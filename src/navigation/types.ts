export type RootStackParamList = {
  Welcome: undefined;
  Home: undefined;
  Recipes: { query?: string };
  RecipeDetail: { id: string };
  AIChat: undefined;
  OrderScreen: undefined;
};