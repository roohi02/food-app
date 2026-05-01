import { View, Text, Image, Pressable, FlatList } from "react-native";
import { Category } from "../types/api";

type Props = {
  categories: Category[];
  activeCategory: string;
  onSelect: (category: string) => void;
};

export default function CategoryList({
  categories,
  activeCategory,
  onSelect,
}: Props) {
  return (
    <FlatList
      data={categories}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item.idCategory}
      contentContainerStyle={{ marginTop: 12, paddingBottom: 10 }}
      style={{ minHeight: 100 }}
      renderItem={({ item }) => {
        const isActive = activeCategory === item.strCategory;

        return (
          <Pressable
            onPress={() => onSelect(item.strCategory)}
            className="mr-3 items-center"
          >
            <Image
              source={{ uri: item.strCategoryThumb }}
              className={`w-16 h-16 rounded-full ${
                isActive ? "border-2 border-orange-500" : ""
              }`}
            />

            <Text
              className={`text-xs mt-1 ${
                isActive ? "text-orange-500 font-bold" : "text-black"
              }`}
            >
              {item.strCategory}
            </Text>
          </Pressable>
        );
      }}
    />
  );
}
