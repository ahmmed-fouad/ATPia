import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ChatDrawer } from '../../../features/ai/components/drawer/ChatDrawer';
import { ExploreScreen } from '../../../features/ai/screens/explore-screen';

export default function ExploreRoute() {
  const router = useRouter();

  const handleNewChat = () => {
    // Create new chat logic
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
        // Already on explore
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
      <ExploreScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
}); 