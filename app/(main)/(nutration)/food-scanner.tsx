import { View, Text, TouchableOpacity } from "react-native";
import { Camera } from "lucide-react-native";

const FoodScanner = () => {
  return (
    <View className="flex-1 p-4">
      <View className="bg-white rounded-xl p-6 shadow-sm">
        <View className="items-center mb-6">
          <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center mb-4">
            <Camera size={32} color="white" />
          </View>
          <Text className="text-2xl font-bold text-gray-900">Food Scanner</Text>
          <Text className="text-gray-600 text-center mt-2">
            Scan food items to get nutritional information
          </Text>
        </View>

        <TouchableOpacity className="bg-blue-500 rounded-lg py-4 items-center">
          <Text className="text-white font-semibold text-lg">
            Scan Food Item
          </Text>
        </TouchableOpacity>

        <View className="mt-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Recent Scans
          </Text>
          <View className="space-y-3">
            <View className="bg-gray-50 rounded-lg p-3">
              <Text className="font-medium text-gray-900">Apple</Text>
              <Text className="text-sm text-gray-600">
                52 calories • 14g carbs
              </Text>
            </View>
            <View className="bg-gray-50 rounded-lg p-3">
              <Text className="font-medium text-gray-900">Banana</Text>
              <Text className="text-sm text-gray-600">
                89 calories • 23g carbs
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FoodScanner;
