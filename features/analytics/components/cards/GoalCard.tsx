import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Goal } from '../../types';
import { AnalyticsService } from '../../services/analyticsService';

interface GoalCardProps {
  goal: Goal;
  onPress?: () => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({ goal, onPress }) => {
  const progressColor = AnalyticsService.getProgressColor(goal.progress);
  const progressPercentage = Math.min(goal.progress, 100);
  
  const getGradientColors = () => {
    if (goal.progress >= 80) {
      return ['rgba(16, 185, 129, 0.2)', 'rgba(34, 197, 94, 0.1)'];
    } else if (goal.progress >= 60) {
      return ['rgba(245, 158, 11, 0.2)', 'rgba(251, 191, 36, 0.1)'];
    } else {
      return ['rgba(239, 68, 68, 0.2)', 'rgba(248, 113, 113, 0.1)'];
    }
  };

  const getCategoryIcon = () => {
    switch (goal.category) {
      case 'weight':
        return '⚖️';
      case 'nutrition':
        return '🥗';
      case 'health':
        return '❤️';
      case 'exercise':
        return '💪';
      default:
        return '🎯';
    }
  };

  const CardContent = () => (
    <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />
      
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center">
          <Text className="text-2xl mr-2">{getCategoryIcon()}</Text>
          <View>
            <Text className="text-white font-semibold text-base">{goal.title}</Text>
            <Text className="text-gray-400 text-xs">
              Due: {AnalyticsService.formatDate(goal.deadline)}
            </Text>
          </View>
        </View>
        <Text className="text-white font-bold text-lg">
          {goal.progress}%
        </Text>
      </View>

      <View className="mb-3">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-gray-300 text-sm">Progress</Text>
          <Text className="text-gray-400 text-xs">
            {goal.current} / {goal.target} {goal.unit}
          </Text>
        </View>
        
        {/* Progress Bar */}
        <View className="bg-slate-700 rounded-full h-2 overflow-hidden">
          <LinearGradient
            colors={[progressColor, progressColor + '80']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            className="h-full rounded-full"
            style={{ width: `${progressPercentage}%` }}
          />
        </View>
      </View>

      {/* Status indicator */}
      <View className="flex-row items-center">
        <View 
          className="w-2 h-2 rounded-full mr-2"
          style={{ backgroundColor: progressColor }}
        />
        <Text className="text-gray-400 text-xs">
          {goal.progress >= 100 ? 'Completed' : 
           goal.progress >= 80 ? 'Almost there!' :
           goal.progress >= 60 ? 'Good progress' : 'Keep going!'}
        </Text>
      </View>
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        className="mb-4"
        onPress={onPress}
        activeOpacity={0.8}
      >
        <CardContent />
      </TouchableOpacity>
    );
  }

  return (
    <View className="mb-4">
      <CardContent />
    </View>
  );
}; 