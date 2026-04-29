import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

type Message = {
  id: string;
  text: string;
  from: "user" | "ai";
};

export default function AIChatScreen() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "👋 Hi! I’m your AI Chef. Ask me what to cook!",
      from: "ai",
    },
  ]);

  // 🧠 simple AI logic
  const getAIResponse = (text: string) => {
    const q = text.toLowerCase();

    if (q.includes("chicken")) {
      return "🍗 Try grilled chicken salad (~450 kcal) or spicy chicken curry.";
    }
    if (q.includes("rice")) {
      return "🍚 Fried rice or veggie rice bowl (~400 kcal).";
    }
    if (q.includes("healthy")) {
      return "🥗 Go for salad bowl, eggs, avocado toast (~300 kcal).";
    }

    return "🤖 Try asking with ingredients like chicken, rice, eggs, or vegetables.";
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text,
      from: "user",
    };

    const aiMsg: Message = {
      id: (Date.now() + 1).toString(),
      text: getAIResponse(text),
      from: "ai",
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInput("");
  };

  const quickPrompts = [
    "🍗 Chicken recipes",
    "🍚 Rice meals",
    "🥗 Healthy food",
    "🔥 High protein meals",
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-yellow-100"
    >
      {/* HEADER */}
      <View className="p-4 bg-white shadow">
        <Text className="text-xl font-bold">🤖 AI Chef</Text>
        <Text className="text-gray-500 text-sm">
          Your personal meal assistant
        </Text>
      </View>

      {/* CHAT AREA */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf: item.from === "user" ? "flex-end" : "flex-start",
              backgroundColor: item.from === "user" ? "#f97316" : "#e5e7eb",
              padding: 12,
              borderRadius: 18,
              marginBottom: 10,
              maxWidth: "80%",
            }}
          >
            <Text
              style={{
                color: item.from === "user" ? "white" : "#111827",
              }}
            >
              {item.text}
            </Text>
          </View>
        )}
      />

      {/* QUICK PROMPTS */}
      <View className="px-3 mb-2">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={quickPrompts}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => sendMessage(item)}
              className="bg-white px-4 py-2 mr-2 rounded-full border border-gray-200"
            >
              <Text className="text-sm">{item}</Text>
            </Pressable>
          )}
        />
      </View>

      {/* INPUT */}
      <View className="flex-row items-center p-3 bg-white border-t border-gray-200">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Ask your AI chef..."
          className="flex-1 bg-gray-100 p-3 rounded-full"
        />

        <Pressable
          onPress={() => sendMessage(input)}
          className="ml-2 bg-orange-500 px-4 py-3 rounded-full"
        >
          <Text className="text-white font-bold">Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
