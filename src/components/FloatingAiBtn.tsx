import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

type Props = {
  onPress: () => void;
};

export default function FloatingAIBtn({ onPress }: Props) {
  // 🔥 animations
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  // 🔥 pulse loop
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  // 🔥 press animation
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        position: "absolute",
        right: 16,
        top: height * 0.72,
        transform: [{ scale: pulseAnim }],
      }}
    >
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View
          style={{
            transform: [{ scale: scaleAnim }],
            width: 58,
            height: 58,
            borderRadius: 999,
            backgroundColor: "#f97316",
            justifyContent: "center",
            alignItems: "center",

            // glow effect
            shadowColor: "#f97316",
            shadowOpacity: 0.6,
            shadowRadius: 12,
            elevation: 10,
          }}
        >
          <Ionicons name="chatbubble-ellipses" size={24} color="white" />
        </Animated.View>
      </Pressable>
    </Animated.View>
  );
}
