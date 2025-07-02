import { BookOpen, Calculator, Camera, ShoppingCart } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Nutrition = () => {
  const nutritionFeatures = [
    {
      id: 1,
      title: 'Food Scanner',
      icon: Camera,
      color: 'bg-green-500',
      description: 'Scan food items to get nutritional info'
    },
    {
      id: 2,
      title: 'Diet Calculator',
      icon: Calculator,
      color: 'bg-blue-500',
      description: 'Calculate your daily nutritional needs'
    },
    {
      id: 3,
      title: 'Meal Plans',
      icon: BookOpen,
      color: 'bg-purple-500',
      description: 'Personalized meal plans and recipes'
    },
    {
      id: 4,
      title: 'Grocery List',
      icon: ShoppingCart,
      color: 'bg-orange-500',
      description: 'Smart grocery shopping lists'
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Nutrition Center
        </Text>
        
        <View className="space-y-4">
          {nutritionFeatures.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              className="bg-white rounded-xl p-4 shadow-sm"
              onPress={() => console.log(`Navigate to ${feature.title}`)}
            >
              <View className="flex-row items-center">
                <View className={`w-12 h-12 ${feature.color} rounded-full items-center justify-center mr-4`}>
                  <feature.icon size={24} color="white" />
                </View>
                <View className="flex-1">
                  <Text className="text-lg font-semibold text-gray-900">
                    {feature.title}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    {feature.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Nutrition; 