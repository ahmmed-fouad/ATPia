import { BarChart3, Calendar, Target, TrendingUp } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Tracking = () => {
  const trackingFeatures = [
    {
      id: 1,
      title: 'Progress Tracker',
      icon: Target,
      color: 'bg-purple-500',
      description: 'Track your fitness and nutrition goals'
    },
    {
      id: 2,
      title: 'Habits',
      icon: TrendingUp,
      color: 'bg-green-500',
      description: 'Build healthy habits and routines'
    },
    {
      id: 3,
      title: 'Forms',
      icon: Calendar,
      color: 'bg-blue-500',
      description: 'Log your daily activities and meals'
    },
    {
      id: 4,
      title: 'Analytics',
      icon: BarChart3,
      color: 'bg-orange-500',
      description: 'View detailed progress analytics'
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Progress Tracking
        </Text>
        
        <View className="space-y-4">
          {trackingFeatures.map((feature) => (
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

export default Tracking; 