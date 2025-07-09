import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AIInsight } from '../../types';
import { AnalyticsService } from '../../services/analyticsService';
import { Lightbulb, TrendingUp, AlertTriangle, Award } from 'lucide-react-native';

interface InsightCardProps {
  insight: AIInsight;
  onPress?: () => void;
  onActionPress?: () => void;
}

export const InsightCard: React.FC<InsightCardProps> = ({ 
  insight, 
  onPress, 
  onActionPress 
}) => {
  const getGradientColors = () => {
    switch (insight.type) {
      case 'achievement':
        return ['rgba(16, 185, 129, 0.2)', 'rgba(34, 197, 94, 0.1)'];
      case 'recommendation':
        return ['rgba(59, 130, 246, 0.2)', 'rgba(96, 165, 250, 0.1)'];
      case 'warning':
        return ['rgba(245, 158, 11, 0.2)', 'rgba(251, 191, 36, 0.1)'];
      case 'pattern':
        return ['rgba(139, 92, 246, 0.2)', 'rgba(168, 85, 247, 0.1)'];
      default:
        return ['rgba(107, 114, 128, 0.2)', 'rgba(156, 163, 175, 0.1)'];
    }
  };

  const getIcon = () => {
    switch (insight.type) {
      case 'achievement':
        return <Award size={20} color="#10B981" />;
      case 'recommendation':
        return <Lightbulb size={20} color="#3B82F6" />;
      case 'warning':
        return <AlertTriangle size={20} color="#F59E0B" />;
      case 'pattern':
        return <TrendingUp size={20} color="#8B5CF6" />;
      default:
        return <Lightbulb size={20} color="#6B7280" />;
    }
  };

  const getConfidenceColor = () => {
    if (insight.confidence >= 90) return '#10B981';
    if (insight.confidence >= 70) return '#F59E0B';
    return '#EF4444';
  };

  const CardContent = () => (
    <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
      <LinearGradient
        colors={getGradientColors()}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />
      
      <View className="flex-row items-start mb-3">
        <View className="mr-3 mt-1">
          {getIcon()}
        </View>
        <View className="flex-1">
          <View className="flex-row items-center justify-between mb-1">
            <Text className="text-white font-semibold text-base">{insight.title}</Text>
            <View className="flex-row items-center">
              <View 
                className="w-2 h-2 rounded-full mr-1"
                style={{ backgroundColor: getConfidenceColor() }}
              />
              <Text className="text-gray-400 text-xs">{insight.confidence}%</Text>
            </View>
          </View>
          <Text className="text-gray-300 text-sm leading-5">{insight.message}</Text>
        </View>
      </View>

      {/* Category badge */}
      <View className="flex-row items-center justify-between">
        <View className="bg-slate-700/50 rounded-full px-3 py-1">
          <Text className="text-gray-300 text-xs capitalize">{insight.category}</Text>
        </View>
        
        {insight.actionable && insight.actionText && (
          <TouchableOpacity
            onPress={onActionPress}
            className="bg-blue-600 rounded-full px-4 py-2"
            activeOpacity={0.8}
          >
            <Text className="text-white text-xs font-medium">{insight.actionText}</Text>
          </TouchableOpacity>
        )}
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