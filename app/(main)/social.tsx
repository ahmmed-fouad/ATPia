import { BookOpen, MessageSquare, Star, Users } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Social = () => {
  const socialFeatures = [
    {
      id: 1,
      title: 'Forum',
      icon: Users,
      color: 'bg-orange-500',
      description: 'Connect with the community'
    },
    {
      id: 2,
      title: 'Blog',
      icon: BookOpen,
      color: 'bg-blue-500',
      description: 'Read health and nutrition articles'
    },
    {
      id: 3,
      title: 'Testimonials',
      icon: Star,
      color: 'bg-yellow-500',
      description: 'Success stories from members'
    },
    {
      id: 4,
      title: 'Chat',
      icon: MessageSquare,
      color: 'bg-green-500',
      description: 'Real-time community chat'
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 py-6">
        <Text className="text-2xl font-bold text-gray-900 mb-6">
          Community
        </Text>
        
        <View className="space-y-4">
          {socialFeatures.map((feature) => (
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

export default Social; 