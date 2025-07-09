import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Loader2 } from 'lucide-react-native';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Processing...',
  size = 'medium',
  color = '#34D399',
}) => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    );
    spinAnimation.start();

    return () => spinAnimation.stop();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getSizeConfig = () => {
    switch (size) {
      case 'small':
        return { iconSize: 16, textSize: 'text-sm' };
      case 'large':
        return { iconSize: 32, textSize: 'text-lg' };
      default:
        return { iconSize: 24, textSize: 'text-base' };
    }
  };

  const sizeConfig = getSizeConfig();

  return (
    <View className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50">
      <LinearGradient
        colors={['rgba(52, 211, 153, 0.1)', 'rgba(96, 165, 250, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />
      
      <View className="items-center">
        <Animated.View
          style={{
            transform: [{ rotate: spin }],
          }}
        >
          <Loader2 size={sizeConfig.iconSize} color={color} />
        </Animated.View>
        
        <Text className={`text-white font-medium mt-3 ${sizeConfig.textSize}`}>
          {message}
        </Text>
        
        <Text className="text-gray-400 text-xs text-center mt-2">
          Analyzing your food...
        </Text>
      </View>
    </View>
  );
}; 