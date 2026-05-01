import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types";
import HomeScreen from "../screens/HomeScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import RecipeDetailScreen from "../screens/RecipeDetailsScreen";
import AIChatScreen from "../screens/AIChatScreen";
import OrderScreen from "../screens/OrderFoodScreen";
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
        <Stack.Screen name="AIChat" component={AIChatScreen} />
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
