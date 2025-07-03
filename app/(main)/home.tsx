import {
    BookOpen,
    Calculator,
    Camera,
    MessageCircle,
    Target,
    Users
} from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const Home = () => {
  const quickActions = [
    {
      id: 1,
      title: 'Food Scanner',
      icon: Camera,
      color: 'bg-green-500',
      route: '/(main)/tracking'
    },
    {
      id: 2,
      title: 'Diet Calculator',
      icon: Calculator,
      color: 'bg-blue-500',
      route: '/(main)/nutrition'
    },
    {
      id: 3,
      title: 'Meal Plans',
      icon: BookOpen,
      color: 'bg-purple-500',
      route: '/(main)/nutrition'
    },
    {
      id: 4,
      title: 'Progress Tracker',
      icon: Target,
      color: 'bg-orange-500',
      route: '/(main)/tracking'
    },
    {
      id: 5,
      title: 'Chatbot',
      icon: MessageCircle,
      color: 'bg-pink-500',
      route: '/(main)/ai'
    },
    {
      id: 6,
      title: 'Forum',
      icon: Users,
      color: 'bg-indigo-500',
      route: '/(main)/social'
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="px-4 py-6">
        {/* Welcome Section */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back, User! 👋
          </Text>
          <Text className="text-gray-600">
            Ready to continue your health journey?
          </Text>
        </View>

        {/* Quick Stats */}
        <View className="bg-white rounded-xl p-4 mb-6 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Today's Progress
          </Text>
          <View className="flex-row justify-between">
            <View className="items-center">
              <Text className="text-2xl font-bold text-green-600">1,850</Text>
              <Text className="text-sm text-gray-500">Calories</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-blue-600">75g</Text>
              <Text className="text-sm text-gray-500">Protein</Text>
            </View>
            <View className="items-center">
              <Text className="text-2xl font-bold text-purple-600">8</Text>
              <Text className="text-sm text-gray-500">Days Streak</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Quick Actions
          </Text>
          <View className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                className="bg-white rounded-xl p-4 shadow-sm"
                onPress={() => console.log(`Navigate to ${action.title}`)}
              >
                <View className={`w-12 h-12 ${action.color} rounded-full items-center justify-center mb-3`}>
                  <action.icon size={24} color="white" />
                </View>
                <Text className="text-sm font-semibold text-gray-900">
                  {action.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="bg-white rounded-xl p-4 shadow-sm">
          <Text className="text-lg font-semibold text-gray-900 mb-3">
            Recent Activity
          </Text>
          <View className="space-y-3">
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-green-500 rounded-full mr-3" />
              <Text className="text-sm text-gray-600 flex-1">
                Scanned apple - 95 calories
              </Text>
              <Text className="text-xs text-gray-400">2h ago</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
              <Text className="text-sm text-gray-600 flex-1">
                Updated weight goal
              </Text>
              <Text className="text-xs text-gray-400">1d ago</Text>
            </View>
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-purple-500 rounded-full mr-3" />
              <Text className="text-sm text-gray-600 flex-1">
                Completed workout plan
              </Text>
              <Text className="text-xs text-gray-400">2d ago</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
