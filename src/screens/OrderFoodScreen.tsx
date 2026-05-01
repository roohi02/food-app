import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getNearbyRestaurantsOSM } from "../services/openstreetmap";
import { getRestaurantImage } from "../services/unsplash";

export default function OrderScreen({ navigation }: any) {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  const cuisines = ["All", "Indian", "Italian", "Chinese", "Fast Food"];

  // 🧠 IMAGE helper (stable + better matching)
  const getRestaurantImage = async (name: string, cuisine?: string) => {
    try {
      const query = cuisine || name || "food";

      const res = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
      );

      const data = await res.json();

      return data?.meals?.[0]?.strMealThumb || null;
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);

        const loc = {
          coords: {
            latitude: 53.4084,
            longitude: -2.9916,
          },
        };

        const results = await getNearbyRestaurantsOSM(
          loc.coords.latitude,
          loc.coords.longitude,
        );

        console.log("OSM RESULTS:", results.length);
        const mapped = await Promise.all(
          results.map(async (r: any) => {
            const name = r.tags?.name || "Restaurant";

            // 👇 FIX HERE
            const rawCuisine = r.tags?.cuisine || "food";
            const cuisine = rawCuisine.split(";")[0]; // take first

            const image = await getRestaurantImage(name, cuisine);

            return {
              id: r.id,
              name,
              cuisine,
              rating: Math.floor(Math.random() * 2) + 3,
              image,
            };
          }),
        );

        setRestaurants(mapped);
      } catch (e) {
        console.log("ERROR:", e);
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // 🧠 FIX: better filtering (case + partial match safe)
  const filtered =
    selectedCuisine === "All"
      ? restaurants
      : restaurants.filter((r) =>
          r.cuisine?.toLowerCase().includes(selectedCuisine.toLowerCase()),
        );

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 40 }}>
      {/* HEADER */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "700" }}>🍔 Order Food</Text>

        <Pressable onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} />
        </Pressable>
      </View>

      {/* CUISINES */}
      <View style={{ marginTop: 12 }}>
        <FlatList
          horizontal
          data={cuisines}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 12 }}
          renderItem={({ item }) => {
            const isActive = selectedCuisine === item;

            return (
              <Pressable
                onPress={() => setSelectedCuisine(item)}
                style={{
                  height: 34,
                  paddingHorizontal: 14,
                  borderRadius: 999,
                  marginRight: 8,
                  backgroundColor: isActive ? "#111827" : "#F3F4F6",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: isActive ? "#fff" : "#111827",
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {/* CONTENT */}
      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 12 }}
          renderItem={({ item }) => (
            <View
              style={{
                backgroundColor: "#fff",
                borderRadius: 16,
                marginBottom: 16,
                overflow: "hidden",
                elevation: 3,
              }}
            >
              <Image
                source={{ uri: item.image }}
                style={{ width: "100%", height: 160 }}
              />

              <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: "700" }}>
                  {item.name}
                </Text>

                <Text style={{ color: "#6b7280" }}>{item.cuisine}</Text>

                <Text style={{ marginTop: 4 }}>⭐ {item.rating}</Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}
