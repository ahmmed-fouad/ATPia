import { Text, TouchableOpacity, View } from 'react-native';

import { tabItems } from '@/shared/data/tabItems';

interface CustomBottomBarProps {
  activeTab: string;
  onTabPress: (tabName: 'ai' | 'tracking' | 'nutrition' | 'social' | 'home') => void;
}

const CustomBottomBar = ({ activeTab, onTabPress }: CustomBottomBarProps) => {
  return (
    <View className="flex-row bg-white border-t border-gray-200 py-2">
      {tabItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <TouchableOpacity 
            key={item.id}
            className="flex-1 items-center py-2"
            onPress={() => onTabPress(item.id)}
          >
            <IconComponent 
              size={24} 
              color={activeTab === item.id ? "#3b82f6" : "#6b7280"} 
            />
            <Text 
              className={`text-xs mt-1 font-semibold ${
                activeTab === item.id ? 'text-blue-500' : 'text-gray-500'
              }`}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomBottomBar; 