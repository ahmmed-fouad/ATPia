import { CustomBottomBar } from '@/components';
import { images } from '@/constans';
import { useMainNavigation } from '@/hooks';
import { Bell, HomeIcon, Menu, Search, Settings } from 'lucide-react-native';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainLayout = () => {
  // Check if we're coming from login (you can add more sophisticated logic here)
  const { activeTab, handleTabPress, renderScreen } = useMainNavigation('home');

  // Check if we're on home screen
  const isHomeScreen = activeTab === 'home';



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

      {/* Screen Content */}
      <View className="flex-1">
        {renderScreen()}
      </View>

      {/* Custom Bottom Bar */}
      <CustomBottomBar
        activeTab={isHomeScreen ? "none" : activeTab}
        onTabPress={handleTabPress}
      />
    </SafeAreaView>
  );
};

export default MainLayout;
