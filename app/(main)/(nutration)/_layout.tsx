import { Slot, usePathname, useRouter } from "expo-router";
import { View } from "react-native";
import { CustomBar } from "@/components";
import { nutritionFeatures } from "@/shared/data/tabItems";

const NutritionLayout = () => {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname.includes("/food-scanner")) return "food-scanner";
    if (pathname.includes("/diet-calculator")) return "diet-calculator";
    if (pathname.includes("/meal-plans")) return "meal-plans";
    if (pathname.includes("/grocery-list")) return "grocery-list";
    return "food-scanner"; // default
  };

  const activeTab = getActiveTab();

  const handleTabPress = (
    tabName: "food-scanner" | "diet-calculator" | "meal-plans" | "grocery-list"
  ) => {
    router.push(`/(main)/(nutration)/${tabName}`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* CustomBar at the top */}
      <CustomBar
        tabItems={nutritionFeatures}
        activeTab={activeTab}
        onTabPress={handleTabPress}
      />

      {/* Content area - child screens will render here */}
      <View className="flex-1">
        <Slot />
      </View>
    </View>
  );
};

export default NutritionLayout;
