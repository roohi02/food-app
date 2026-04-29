import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Pressable,
  Animated,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState, useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";
import { StatusBar } from "expo-status-bar";
type Props = NativeStackScreenProps<RootStackParamList, "RecipeDetail">;
import { getIngredients } from "../utils/getIngredients";
type RecipeDetailType = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube: string;
};

export default function RecipeDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;

  const [recipe, setRecipe] = useState<RecipeDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const ingredients = getIngredients(recipe);
  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      const json = await res.json();
      setRecipe(json.meals?.[0]);
      setLoading(false);

      // 🔥 run animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start();
    };

    fetchRecipe();
  }, []);

  const getYoutubeId = (url: string) => {
    const regExp = /v=([^&]+)/;
    const match = url.match(regExp);
    return match ? match[1] : "";
  };

  if (loading || !recipe) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // 🔥 mock calories
  const calories = Math.floor(Math.random() * 400) + 200;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      {/* BACK BUTTON */}
      <Pressable
        onPress={() => navigation.goBack()}
        style={{
          position: "absolute",
          top: 40,
          left: 20,
          zIndex: 10,
          backgroundColor: "rgba(0,0,0,0.4)",
          padding: 8,
          borderRadius: 20,
        }}
      >
        <Ionicons name="arrow-back" size={22} color="white" />
      </Pressable>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* IMAGE */}
        <View className="mx-4 mt-2 rounded-3xl overflow-hidden">
          <Image
            source={{ uri: recipe.strMealThumb }}
            className="w-full h-72"
          />
        </View>

        {/* CONTENT */}
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
          className="px-4 pt-4"
        >
          <Text className="text-2xl font-bold">{recipe.strMeal}</Text>

          <Text className="text-gray-500 mt-1">
            {recipe.strCategory} • {recipe.strArea}
          </Text>

          {/* CALORIES */}
          <View className="mt-4 bg-orange-100 p-3 rounded-xl">
            <Text className="text-orange-600 font-semibold">
              🔥 Calories: {calories} kcal
            </Text>
          </View>
          {/* INGREDIENTS */}
          <View className="mt-6">
            <Text className="text-lg font-semibold mb-2">Ingredients 🥕</Text>

            {ingredients.map((item, index) => (
              <View
                key={index}
                className="flex-row items-center py-2 border-b border-gray-100"
              >
                <View className="w-2 h-2 bg-orange-400 rounded-full mr-2" />
                <Text className="text-gray-700">{item}</Text>
              </View>
            ))}
          </View>
          {/* YOUTUBE */}
          {recipe.strYoutube && (
            <View className="mt-6">
              <Text className="text-lg font-semibold mb-2">
                Watch Recipe 🎬
              </Text>

              <YoutubePlayer
                height={200}
                play={false}
                videoId={getYoutubeId(recipe.strYoutube)}
              />
            </View>
          )}

          {/* INSTRUCTIONS */}
          <Text className="text-lg font-semibold mt-6 mb-2">
            Instructions 🍳
          </Text>

          <Text className="text-gray-700 leading-6 mb-10">
            {recipe.strInstructions}
          </Text>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
