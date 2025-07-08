import { CustomBottomBar } from '@/components';
import { images } from '@/constans';
import { ChatDrawer } from '@/features/ai/components/drawer/ChatDrawer';
import { ChatService } from '@/features/ai/services/chatService';
import { useChatStore } from '@/features/ai/stores/chatStore';
import { Slot, usePathname, useRouter } from 'expo-router';
import { Bell, HomeIcon, Menu, Search, Settings } from 'lucide-react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainLayout = () => {
  const router = useRouter();
  const pathname = usePathname();
  const addChat = useChatStore((state) => state.addChat);
  const deleteChat = useChatStore((state) => state.deleteChat);

  // Determine active tab based on current route
  const getActiveTab = () => {
    if (pathname.includes('/ai')) return 'ai';
    if (pathname.includes('/tracking')) return 'tracking';
    if (pathname.includes('/nutrition')) return 'nutrition';
    if (pathname.includes('/social')) return 'social';
    if (pathname.includes('/home')) return 'home';
    return 'ai'; // default
  };

  const activeTab = getActiveTab();
  const isHomeScreen = activeTab === 'home';

  const handleTabPress = (tabName: 'ai' | 'tracking' | 'nutrition' | 'social' | 'home') => {
    router.push(`/(main)/${tabName}`);
  };

  // Drawer navigation handlers
  const handleNewChat = () => {
    const newChat = ChatService.createNewChat();
    addChat(newChat);
    router.push(`/ai/(chat)/${newChat.id}`);
  };

  const handleSelectChat = (chatId: string) => {
    router.push(`/ai/(chat)/${chatId}`);
  };

  const handleSelectSection = (section: 'chats' | 'library' | 'explore') => {
    if (section === 'library') router.push('/ai/library');
    else if (section === 'explore') router.push('/ai/explore');
  };

  const handleDeleteChat = (chatId: string) => {
    deleteChat(chatId);
    // If we're currently on the deleted chat, navigate to a new chat or home
    if (pathname.includes(`/ai/(chat)/${chatId}`)) {
      router.push('/ai');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/*1st Top Bar */}
      {/* Logo & avatar*/}
      <View className="flex-row items-center justify-between px-4 py-3 bg-white border-b border-gray-200">
        <View className="flex-row items-center">
          <Image
            source={images.ATPiaLogo}
            className="w-10 h-10"
            resizeMode="contain"
          />
          <Text className="text-gray-500 ml-2 text-xl font-bold">ATPia</Text>
        </View>
        <View className="flex-row gap-2 items-center">
          <Text className="text-gray-500 ml-2 text-xl font-bold">Ahmed</Text>
          <Image
            source={images.avatarr}
            className="w-10 h-10"
            resizeMode="contain"
          />
        </View>
      </View>

      {/* 2nd Top Bar */}
      <View className="flex-row items-center space-x-3 justify-between px-4  bg-white border-b border-gray-200">
        {/* Left Icons */}
        <View className="flex-row items-center space-x-3  py-3 gap-4">
          <TouchableOpacity onPress={() => handleTabPress('home')}>
            <HomeIcon size={25} color={isHomeScreen ? "#3b82f6" : "#374151"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Bell size={25} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View className="flex-row items-center space-x-3 px-2 py-3 gap-2">
          <TouchableOpacity
            className="flex-row h-10 w-[160px] items-center
             border border-gray-300 rounded-full px-4 py-2"
          >
            <Search size={25} color="#374151" />
            <Text className="text-gray-500 ml-2 text-sm ">Search...</Text>
          </TouchableOpacity>
        </View>

        {/* Right Icons */}
        <View className="flex-row items-center space-x-3  py-3 gap-4">
          <TouchableOpacity>
            <Settings size={25} color="#374151" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Menu size={25} color="#374151" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Screen Content - Expo Router handles this automatically */}
      <View className="flex-1">
        <Slot />
      </View>

      {/* Chat Drawer as a global portal */}
      <ChatDrawer
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onSelectSection={handleSelectSection}
        onProfilePress={() => {}}
        onSettingsPress={() => {}}
        onDeleteChat={handleDeleteChat}
      />

      {/* Custom Bottom Bar */}
      <CustomBottomBar
        activeTab={isHomeScreen ? "none" : activeTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
};

export default MainLayout;
