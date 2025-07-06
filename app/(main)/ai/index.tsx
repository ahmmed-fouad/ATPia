import { useRouter } from 'expo-router';
import { Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChatDrawer } from '../../../features/ai/components/drawer/ChatDrawer';
import { ChatScreen } from '../../../features/ai/screens/chat-screen';
import { useChatStore } from '../../../features/ai/stores/chatStore';

const { width } = Dimensions.get('window');

export default function AIScreen() {
  const router = useRouter();
  const { currentChatId } = useChatStore();

  const handleNewChat = () => {
    // Create new chat logic here
  };

  const handleSelectChat = (chatId: string) => {
    router.push(`/ai/chat/${chatId}`);
  };

  const handleSelectSection = (section: 'chats' | 'library' | 'explore') => {
    switch (section) {
      case 'library':
        router.push('/ai/library');
        break;
      case 'explore':
        router.push('/ai/explore');
        break;
    }
  };

  const handleProfilePress = () => {
    // Navigate to profile
  };

  const handleSettingsPress = () => {
    // Navigate to settings
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChatDrawer
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onSelectSection={handleSelectSection}
        onProfilePress={handleProfilePress}
        onSettingsPress={handleSettingsPress}
      />
      <ChatScreen
        chatId={currentChatId || undefined}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
}); 