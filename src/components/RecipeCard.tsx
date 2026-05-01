import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, Pressable } from "react-native";
import { Recipe } from "../types/api";

type Props = {
  item: Recipe;
  onPress: () => void;
};

export default function RecipeCard({ item, onPress }: Props) {
  const anim = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        opacity: anim,
        transform: [
          {
            translateY: anim.interpolate({
              inputRange: [0, 1],
              outputRange: [15, 0],
            }),
          },
          { scale },
        ],
      }}
    >
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <View className="bg-white rounded-3xl overflow-hidden shadow-md">
          <Image source={{ uri: item.strMealThumb }} className="w-full h-44" />

          <View className="p-4">
            <Text className="text-lg font-bold" numberOfLines={1}>
              {item.strMeal}
            </Text>

            <Text className="text-xs text-gray-400 mt-1">
              Tap to view recipe
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
