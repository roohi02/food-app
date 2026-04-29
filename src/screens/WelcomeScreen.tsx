import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";
import { RootStackParamList } from "../navigation/types";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;
export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View className="flex-1 items-center justify-center bg-amber-500 space-y-10">
      <StatusBar style="light" />
      <Pressable onPress={() => navigation.navigate("Home")}>
        <View className="bg-white/20 rounded-full items-center justify-center w-72 h-72">
          <View className="bg-white/20 rounded-full items-center justify-center w-60 h-60">
            <Image
              source={require("../../assets/Welcome.png")}
              style={{
                width: 200,
                height: 200,
                borderRadius: 100,
              }}
            />
          </View>
        </View>
      </Pressable>

      <View className="flex items-center space-y-2">
        <Text className="text-6xl font-bold text-white tracking-widest">
          Foody
        </Text>
        <Text className="text-lg font-medium text-white tracking-widest">
          Food is always right
        </Text>
      </View>
    </View>
  );
}
