import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ChatDrawer } from '../../../features/ai/components/drawer/ChatDrawer';
import { LibraryScreen } from '../../../features/ai/screens/library-screen';

export default function LibraryRoute() {
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
        // Already on library
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
      <LibraryScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
}); 