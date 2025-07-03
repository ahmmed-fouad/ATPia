import ChatbotScreen from '@/features/ai/screens/chatbot';
import { Text, View } from 'react-native';

const AIScreen = () => {
  return (
    <View className="flex-1 bg-white p-4">
      <ChatbotScreen />
      <Text className="text-gray-500 text-center text-2xl font-bold">
        This is the AI screen
      </Text>
    </View>
  )
};

export default AIScreen; 