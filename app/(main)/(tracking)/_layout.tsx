import { Slot, usePathname, useRouter } from "expo-router";
import { View } from "react-native";
import { CustomBar } from "@/components";
import { trackingFeatures } from "@/shared/data/tabItems";

const TrackingLayout = () => {
  const router = useRouter();
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname.includes("/tracker")) return "tracker";
    if (pathname.includes("/habits")) return "habits";
    if (pathname.includes("/form")) return "form";
    if (pathname.includes("/analytics")) return "analytics";
    return "tracker"; // default
  };

  const activeTab = getActiveTab();

  const handleTabPress = (
    tabName: "tracker" | "habits" | "form" | "analytics"
  ) => {
    router.push(`/(main)/(tracking)/${tabName}`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* CustomBar at the top */}
      <CustomBar
        tabItems={trackingFeatures}
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

export default TrackingLayout;
