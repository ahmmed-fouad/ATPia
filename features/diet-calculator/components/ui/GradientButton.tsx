import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return disabled 
          ? ['#6B7280', '#4B5563'] 
          : ['#8B5CF6', '#7C3AED'];
      case 'secondary':
        return disabled 
          ? ['#6B7280', '#4B5563'] 
          : ['#3B82F6', '#2563EB'];
      case 'success':
        return disabled 
          ? ['#6B7280', '#4B5563'] 
          : ['#10B981', '#059669'];
      case 'warning':
        return disabled 
          ? ['#6B7280', '#4B5563'] 
          : ['#F59E0B', '#D97706'];
      case 'danger':
        return disabled 
          ? ['#6B7280', '#4B5563'] 
          : ['#EF4444', '#DC2626'];
      default:
        return disabled 
          ? ['#6B7280', '#4B5563'] 
          : ['#8B5CF6', '#7C3AED'];
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'py-2 px-4';
      case 'medium':
        return 'py-3 px-6';
      case 'large':
        return 'py-4 px-8';
      default:
        return 'py-3 px-6';
    }
  };

  const getTextSize = () => {
    switch (size) {
      case 'small':
        return 'text-sm';
      case 'medium':
        return 'text-base';
      case 'large':
        return 'text-lg';
      default:
        return 'text-base';
    }
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 20;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      className={`rounded-xl ${getSizeClasses()} ${fullWidth ? 'w-full' : ''}`}
      activeOpacity={disabled ? 1 : 0.8}
    >
      <LinearGradient
        colors={getGradientColors() as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-xl"
      />
      
      <View className="flex-row items-center justify-center">
        {Icon && iconPosition === 'left' && (
          <Icon 
            size={getIconSize()} 
            color="white" 
            className="mr-2" 
          />
        )}
        
        <Text 
          className={`font-semibold text-white ${getTextSize()}`}
          style={{ opacity: disabled ? 0.6 : 1 }}
        >
          {title}
        </Text>
        
        {Icon && iconPosition === 'right' && (
          <Icon 
            size={getIconSize()} 
            color="white" 
            className="ml-2" 
          />
        )}
      </View>
    </TouchableOpacity>
  );
}; 