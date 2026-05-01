import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

export default function RecipeAiCard({
  name,
  ingredients,
  steps,
  calories,
}: any) {
  const [image, setImage] = useState<string | null>(null);
  const getRecipeImage = async (name: string) => {
    try {
      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`,
      );

      const data = await res.json();

      return data?.meals?.[0]?.strMealThumb || null;
    } catch (e) {
      return null;
    }
  };
  useEffect(() => {
    const loadImage = async () => {
      const img = await getRecipeImage(name);
      setImage(img);
    };

    loadImage();
  }, [name]);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 14,
      }}
    >
      <Image
        source={{
          uri:
            image ||
            "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
        }}
        style={{ width: "100%", height: 180 }}
        resizeMode="cover"
      />

      <View style={{ padding: 14 }}>
        <Text style={{ fontSize: 18, fontWeight: "700" }}>🍽️ {name}</Text>

        <Text style={{ marginTop: 6 }}>🧾 {ingredients}</Text>
        <Text style={{ marginTop: 6 }}>👨‍🍳 {steps}</Text>
        <Text style={{ marginTop: 6, color: "#f97316" }}>🔥 {calories}</Text>
      </View>
    </View>
  );
}
