import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { askGroqAI } from "../services/groq";
import RecipeAiCard from "../components/RecipeAiCard";

type Message = {
  id: string;
  text: string;
  from: "user" | "ai";
};

export default function AIChatScreen() {
  const navigation = useNavigation();

  const [input, setInput] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("Any 🌎");

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Tell me what ingredients you have and pick a cuisine!",
      from: "ai",
    },
  ]);

  const cuisines = [
    "Any 🌎",
    "Indian 🇮🇳",
    "Italian 🇮🇹",
    "Chinese 🇨🇳",
    "Mexican 🇲🇽",
    "Healthy 🥗",
  ];

  const parseRecipes = (text: string) => {
    if (!text) return [];

    return text
      .split("### Recipe")
      .map((t) => t.trim())
      .filter((t) => t.length > 30); // 👈 removes junk/partial blocks
  };
  const sendMessage = async (text?: string) => {
    const messageText = text ?? input;

    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      from: "user",
    };

    setMessages((prev) => [userMessage, ...prev]);
    setInput("");

    try {
      const prompt = `
Ingredients: ${messageText}
Cuisine: ${selectedCuisine}

Return EXACTLY in this format:

### Recipe
Name: <name>

Ingredients:
- item 1
- item 2

Steps:
1. step one
2. step two

Calories: <number>

### Recipe
Name: <name>

### Recipe
Name: <name>
`;

      const aiText = await askGroqAI(prompt);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText || "No response from AI",
        from: "ai",
      };

      setMessages((prev) => [aiMessage, ...prev]);
    } catch (error) {
      console.log("AI ERROR:", error);

      setMessages((prev) => [
        {
          id: Date.now().toString(),
          text: "⚠️ Something went wrong. Try again.",
          from: "ai",
        },
        ...prev,
      ]);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-yellow-100"
    >
      {/* HEADER */}
      <View className="p-4 bg-white shadow flex-row items-center justify-between">
        <View>
          <Text className="text-xl font-bold">🍳 AI Chef</Text>
          <Text className="text-gray-500 text-sm">
            Find recipes from ingredients
          </Text>
        </View>

        <Pressable
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-gray-100"
        >
          <Ionicons name="close" size={22} color="black" />
        </Pressable>
      </View>

      {/* CUISINE SELECTOR */}
      <View className="px-3 mt-3">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={cuisines}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedCuisine(item)}
              className={`px-4 py-2 mr-2 rounded-full ${
                selectedCuisine === item
                  ? "bg-orange-500"
                  : "bg-white border border-gray-200"
              }`}
            >
              <Text
                className={
                  selectedCuisine === item ? "text-white" : "text-gray-700"
                }
              >
                {item}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* CHAT */}
      <FlatList
        data={messages}
        inverted
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => {
          const isUser = item.from === "user";

          return (
            <View
              style={{
                alignSelf: isUser ? "flex-end" : "stretch",
                marginBottom: 14,
              }}
            >
              {/* USER */}
              {isUser ? (
                <View
                  style={{
                    backgroundColor: "#f97316",
                    padding: 14,
                    borderRadius: 20,
                    maxWidth: "90%",
                  }}
                >
                  <Text style={{ color: "white" }}>{item.text}</Text>
                </View>
              ) : (
                // AI RECIPES
                <View>
                  {parseRecipes(item.text).map((recipe, index) => {
                    const getValue = (key: string) => {
                      const match = recipe.match(
                        new RegExp(
                          `${key}:\\s*([\\s\\S]*?)(?=\\n[A-Za-z]+:|$)`,
                          "i",
                        ),
                      );
                      return match?.[1]?.trim() || "";
                    };

                    const name = getValue("Name");
                    const ingredients = getValue("Ingredients");
                    const steps = getValue("Steps");
                    const calories = getValue("Calories");

                    // 🚨 skip broken/empty recipes
                    if (!name) return null;

                    return (
                      <RecipeAiCard
                        key={index}
                        name={name}
                        ingredients={ingredients}
                        steps={steps}
                        calories={calories}
                        imageQuery={name}
                      />
                    );
                  })}
                </View>
              )}
            </View>
          );
        }}
      />
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 12, color: "#6b7280", marginBottom: 6 }}>
          💡 Try these ideas
        </Text>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            "🍗 chicken, rice",
            "🍝 pasta, cheese",
            "🥗 tomato, cucumber",
            "🍳 eggs, bread",
          ]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => sendMessage(item)}
              style={{
                backgroundColor: "#ffffff",
                paddingVertical: 10,
                paddingHorizontal: 14,
                borderRadius: 16,
                marginRight: 10,
                borderWidth: 1,
                borderColor: "#e5e7eb",

                // 👇 premium feel
                shadowColor: "#000",
                shadowOpacity: 0.05,
                shadowRadius: 6,
                elevation: 2,
              }}
            >
              <Text style={{ fontSize: 13, color: "#111827" }}>{item}</Text>
            </Pressable>
          )}
        />
      </View>
      {/* INPUT */}
      <View className="flex-row items-center p-3 bg-white border-t border-gray-200">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Enter ingredients (e.g. chicken, rice)"
          className="flex-1 bg-gray-100 p-3 rounded-full"
        />

        <Pressable
          onPress={() => sendMessage()}
          className="ml-2 bg-orange-500 px-4 py-3 rounded-full"
        >
          <Text className="text-white font-bold">Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
