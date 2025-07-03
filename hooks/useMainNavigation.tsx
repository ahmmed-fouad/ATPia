import { useState } from 'react';

// Import your screen components
import AIScreen from '@/app/(main)/ai';
import HomeScreen from '@/app/(main)/home';
import NutritionScreen from '@/app/(main)/nutrition';
import SocialScreen from '@/app/(main)/social';
import TrackingScreen from '@/app/(main)/tracking';

export const useMainNavigation = (initialTab: 'ai' | 'tracking' | 'nutrition' | 'social' | 'home' = 'ai') => {
  const [activeTab, setActiveTab] = useState(initialTab);

  const handleTabPress = (tabName: 'ai' | 'tracking' | 'nutrition' | 'social' | 'home') => {
    setActiveTab(tabName);
  };

  const renderScreen = () => {
    switch(activeTab) {
      case 'ai': return <AIScreen />;
      case 'tracking': return <TrackingScreen />;
      case 'nutrition': return <NutritionScreen />;
      case 'social': return <SocialScreen />;
      case 'home': return <HomeScreen />;
      default: return <AIScreen />;
    }
  };

  return {
    activeTab,
    handleTabPress,
    renderScreen,
  };
}; 