import { View, Text, TextInput, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { getCategories, searchRecipes } from "../services/api";
import { Category, Recipe } from "../types/api";
import { Pressable, Animated, Dimensions } from "react-native";
import RecipeCard from "../components/RecipeCard";
import CategoryList from "../components/CategoryList";
import { useRef } from "react";
import { Ionicons } from "@expo/vector-icons";
import FloatingAIBtn from "../components/FloatingAiBtn";
type Props = NativeStackScreenProps<any, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [activeCategory, setActiveCategory] = useState<string>("");
  const [initialized, setInitialized] = useState(false);
  const { height } = Dimensions.get("window");
  // =========================
  // INIT APP DATA
  // =========================
  useEffect(() => {
    const init = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);

        if (data?.length) {
          setActiveCategory(data[0].strCategory);
        }
      } catch (error) {
        console.log("Init error:", error);
      } finally {
        setInitialized(true);
      }
    };

    init();
  }, []);

  // =========================
  // SEARCH (DEBOUNCE)
  // =========================
  useEffect(() => {
    const loadRecipes = async () => {
      if (!activeCategory) return;

      try {
        setLoading(true);
        const data = await searchRecipes(activeCategory);
        setRecipes(data);
        console.log(
          "Loaded recipes for category:",
          activeCategory,
          data?.length,
        );
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [activeCategory]);
  useEffect(() => {
    const delay = setTimeout(() => {
      if (query.length > 2) {
        handleSearch(query);
      }
    }, 400);

    return () => clearTimeout(delay);
  }, [query]);

  const handleSearch = async (text: string) => {
    try {
      setLoading(true);
      const data = await searchRecipes(text);
      setRecipes(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CATEGORY CLICK
  // =========================
  const handleCategoryPress = (category: string) => {
    if (!initialized) return;

    setActiveCategory(category);
    setQuery("");
  };

  // =========================
  // UI
  // =========================
  const scale = useRef(new Animated.Value(1)).current;

  return (
    <View className="flex-1 bg-white px-4 pt-10">
      {/* HEADER */}
      <Text className="text-3xl font-extrabold text-gray-900">Hello 👋</Text>

      <Text className="text-base text-gray-500 mt-1">
        What food is on your mind today?
      </Text>

      <Text className="text-2xl font-bold mt-4 mb-3">Discover 🍽️</Text>

      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        {/* RECIPES CARD */}
        <Pressable
          onPress={() => navigation.navigate("AIChat")}
          style={{
            flex: 1,
            backgroundColor: "#f97316",
            padding: 16,
            borderRadius: 16,
            marginRight: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
            🍳 Recipes
          </Text>
          <Text style={{ color: "white", fontSize: 12, marginTop: 4 }}>
            Cook from ingredients
          </Text>
        </Pressable>

        {/* ORDER FOOD CARD */}
        <Pressable
          onPress={() => navigation.navigate("OrderScreen")}
          style={{
            flex: 1,
            backgroundColor: "#111827",
            padding: 16,
            borderRadius: 16,
            marginLeft: 8,
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>
            🍔 Order
          </Text>
          <Text style={{ color: "white", fontSize: 12, marginTop: 4 }}>
            Nearby restaurants
          </Text>
        </Pressable>
      </View>

      {/* SEARCH */}
      <TextInput
        placeholder="Search dishes (pizza, pasta, biryani...)"
        value={query}
        onChangeText={setQuery}
        className="bg-gray-100 p-3 rounded-xl"
      />

      {/* CATEGORIES */}
      <CategoryList
        categories={categories}
        activeCategory={activeCategory}
        onSelect={handleCategoryPress}
      />

      {/* LOADING */}
      {loading && (
        <Text className="text-gray-400 mt-3">Loading recipes...</Text>
      )}

      {/* RECIPES */}
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.idMeal}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 120,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={{ flex: 1, margin: 6 }}>
            <RecipeCard
              item={item}
              onPress={() =>
                navigation.navigate("RecipeDetail", {
                  id: item.idMeal,
                })
              }
            />
          </View>
        )}
      />
      <FloatingAIBtn onPress={() => navigation.navigate("AIChat")} />
    </View>
  );
}
