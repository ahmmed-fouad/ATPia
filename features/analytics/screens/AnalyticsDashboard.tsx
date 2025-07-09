import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart3, TrendingUp, Target, Lightbulb } from 'lucide-react-native';
import { useAnalytics } from '../hooks/useAnalytics';
import { ProgressChart } from '../components/charts/ProgressChart';
import { NutritionChart } from '../components/charts/NutritionChart';
import { MetricCard } from '../components/cards/MetricCard';
import { GoalCard } from '../components/cards/GoalCard';
import { InsightCard } from '../components/cards/InsightCard';
import { AnimatedProgress } from '../components/ui/AnimatedProgress';

export const AnalyticsDashboard: React.FC = () => {
  const {
    progressStats,
    nutritionStats,
    recentProgress,
    recentNutrition,
    recentHealth,
    goals,
    insights,
    selectedPeriod,
    setSelectedPeriod,
    setSelectedCategory,
  } = useAnalytics();

  const periods = [
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'quarter', label: 'Quarter' },
    { key: 'year', label: 'Year' },
  ];

  const categories = [
    { key: 'overview', label: 'Overview', icon: BarChart3 },
    { key: 'progress', label: 'Progress', icon: TrendingUp },
    { key: 'nutrition', label: 'Nutrition', icon: Target },
    { key: 'insights', label: 'AI Insights', icon: Lightbulb },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#334155']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="mb-6">
            <Text className="text-white text-3xl font-bold mb-2">Analytics</Text>
            <Text className="text-gray-400 text-base">
              Track your health journey with AI-powered insights
            </Text>
          </View>

          {/* Period Selector */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Time Period</Text>
            <View className="flex-row bg-slate-800/50 rounded-2xl p-1">
              {periods.map((period) => (
                <TouchableOpacity
                  key={period.key}
                  onPress={() => setSelectedPeriod(period.key as any)}
                  className={`flex-1 py-2 px-3 rounded-xl ${
                    selectedPeriod === period.key
                      ? 'bg-purple-600'
                      : 'bg-transparent'
                  }`}
                >
                  <Text
                    className={`text-center text-sm font-medium ${
                      selectedPeriod === period.key
                        ? 'text-white'
                        : 'text-gray-400'
                    }`}
                  >
                    {period.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Stats */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Quick Stats</Text>
            <View className="flex-row flex-wrap -mx-2">
              <View className="w-1/2 px-2 mb-4">
                <MetricCard
                  title="Current Weight"
                  value={recentProgress?.weight || 0}
                  unit="kg"
                  change={progressStats.totalLoss > 0 ? -2.5 : 0}
                  changeType={progressStats.trend}
                  subtitle="Last recorded"
                />
              </View>
              <View className="w-1/2 px-2 mb-4">
                <MetricCard
                  title="Daily Calories"
                  value={recentNutrition?.calories || 0}
                  unit="kcal"
                  change={-5}
                  changeType="decrease"
                  subtitle="Average intake"
                />
              </View>
              <View className="w-1/2 px-2 mb-4">
                <MetricCard
                  title="Sleep Quality"
                  value={recentHealth?.sleepQuality || 0}
                  unit="/10"
                  change={+2}
                  changeType="increase"
                  subtitle="Last night"
                />
              </View>
              <View className="w-1/2 px-2 mb-4">
                <MetricCard
                  title="Energy Level"
                  value={recentHealth?.energyLevel || 0}
                  unit="/10"
                  change={+1}
                  changeType="increase"
                  subtitle="Today"
                />
              </View>
            </View>
          </View>

          {/* Progress Chart */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Progress Tracking</Text>
            <ProgressChart
              data={{
                labels: ['1/1', '8/1', '15/1', '22/1', '29/1'],
                datasets: [
                  {
                    data: [75, 74.2, 73.8, 73.1, 72.5],
                    color: '#8B5CF6',
                    strokeWidth: 3,
                  },
                  {
                    data: [24.5, 24.2, 24.0, 23.8, 23.6],
                    color: '#06B6D4',
                    strokeWidth: 2,
                  },
                ],
              }}
              title="Weight & BMI Progress"
              subtitle="Last 4 weeks"
            />
          </View>

          {/* Nutrition Chart */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Nutrition Overview</Text>
            <NutritionChart
              data={{
                labels: ['1/1', '8/1', '15/1', '22/1', '29/1'],
                datasets: [
                  {
                    data: [2100, 2050, 2000, 1950, 1900],
                    color: '#F59E0B',
                    strokeWidth: 3,
                  },
                  {
                    data: [150, 155, 160, 165, 170],
                    color: '#10B981',
                    strokeWidth: 2,
                  },
                  {
                    data: [200, 190, 180, 170, 160],
                    color: '#EF4444',
                    strokeWidth: 2,
                  },
                  {
                    data: [70, 68, 65, 62, 60],
                    color: '#8B5CF6',
                    strokeWidth: 2,
                  },
                ],
              }}
              title="Daily Nutrition Intake"
              subtitle="Calories, Protein, Carbs, Fats"
            />
          </View>

          {/* Goals */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Your Goals</Text>
            {goals.slice(0, 2).map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </View>

          {/* AI Insights */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">AI Insights</Text>
            {insights.slice(0, 2).map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </View>

          {/* Category Navigation */}
          <View className="mb-8">
            <Text className="text-white text-lg font-semibold mb-3">Explore More</Text>
            <View className="flex-row flex-wrap -mx-2">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TouchableOpacity
                    key={category.key}
                    onPress={() => setSelectedCategory(category.key)}
                    className="w-1/2 px-2 mb-4"
                  >
                    <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                      <LinearGradient
                        colors={['rgba(139, 92, 246, 0.1)', 'rgba(6, 182, 212, 0.1)']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        className="absolute inset-0 rounded-2xl"
                      />
                      <IconComponent size={24} color="#8B5CF6" className="mb-2" />
                      <Text className="text-white font-semibold text-base">
                        {category.label}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}; 