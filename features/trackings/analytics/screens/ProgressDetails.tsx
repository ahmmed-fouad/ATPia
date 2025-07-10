import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Calendar, Target, TrendingUp } from 'lucide-react-native';
import { useAnalytics } from '../hooks/useAnalytics';
import { ProgressChart } from '../components/charts/ProgressChart';
import { MetricCard } from '../components/cards/MetricCard';
import { GoalCard } from '../components/cards/GoalCard';
import { AnimatedProgress } from '../components/ui/AnimatedProgress';

export const ProgressDetails: React.FC = () => {
  const {
    progressData,
    progressStats,
    goals,
    selectedPeriod,
    setSelectedPeriod,
  } = useAnalytics();

  const periods = [
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'quarter', label: 'Quarter' },
    { key: 'year', label: 'Year' },
  ];

  const progressGoals = goals.filter(goal => goal.category === 'weight');

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
          <View className="flex-row items-center mb-6">
            <TouchableOpacity className="mr-4">
              <ArrowLeft size={24} color="#8B5CF6" />
            </TouchableOpacity>
            <View>
              <Text className="text-white text-2xl font-bold">Progress Details</Text>
              <Text className="text-gray-400 text-sm">Track your weight loss journey</Text>
            </View>
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

          {/* Key Statistics */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Key Statistics</Text>
            <View className="flex-row flex-wrap -mx-2">
              <View className="w-1/2 px-2 mb-4">
                <MetricCard
                  title="Total Weight Loss"
                  value={progressStats.totalLoss}
                  unit="kg"
                  change={-2.5}
                  changeType="decrease"
                  subtitle="Since start"
                />
              </View>
              <View className="w-1/2 px-2 mb-4">
                <MetricCard
                  title="Weekly Average"
                  value={progressStats.weeklyAverage}
                  unit="kg/week"
                  change={-0.6}
                  changeType="decrease"
                  subtitle="Consistent loss"
                />
              </View>
              <View className="w-1/2 px-2 mb-4">
                <MetricCard
                  title="Current BMI"
                  value={progressData[progressData.length - 1]?.bmi || 0}
                  unit=""
                  change={-0.9}
                  changeType="decrease"
                  subtitle="Healthy range"
                />
              </View>
              <View className="w-1/2 px-2 mb-4">
                <MetricCard
                  title="Body Fat"
                  value={progressData[progressData.length - 1]?.bodyFat || 0}
                  unit="%"
                  change={-2}
                  changeType="decrease"
                  subtitle="Last measurement"
                />
              </View>
            </View>
          </View>

          {/* Progress Chart */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Weight Progress</Text>
            <ProgressChart
              data={{
                labels: progressData.map(item => {
                  const date = new Date(item.date);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }),
                datasets: [
                  {
                    data: progressData.map(item => item.weight),
                    color: '#8B5CF6',
                    strokeWidth: 3,
                  },
                  {
                    data: progressData.map(item => item.bmi),
                    color: '#06B6D4',
                    strokeWidth: 2,
                  },
                ],
              }}
              title="Weight & BMI Tracking"
              subtitle={`${selectedPeriod} overview`}
            />
          </View>

          {/* Body Composition */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Body Composition</Text>
            <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.1)', 'rgba(6, 182, 212, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-2xl"
              />
              
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-white font-semibold text-base">Body Fat vs Muscle</Text>
                <Calendar size={20} color="#8B5CF6" />
              </View>

              <View className="flex-row justify-between mb-4">
                <View className="items-center">
                  <Text className="text-white text-2xl font-bold">
                    {progressData[progressData.length - 1]?.bodyFat || 0}%
                  </Text>
                  <Text className="text-gray-400 text-sm">Body Fat</Text>
                </View>
                <View className="items-center">
                  <Text className="text-white text-2xl font-bold">
                    {progressData[progressData.length - 1]?.muscleMass || 0}kg
                  </Text>
                  <Text className="text-gray-400 text-sm">Muscle Mass</Text>
                </View>
              </View>

              <AnimatedProgress
                progress={75}
                label="Muscle Gain Progress"
                size="medium"
              />
            </View>
          </View>

          {/* Goals */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">Weight Goals</Text>
            {progressGoals.map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </View>

          {/* Trend Analysis */}
          <View className="mb-8">
            <Text className="text-white text-lg font-semibold mb-3">Trend Analysis</Text>
            <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <LinearGradient
                colors={['rgba(16, 185, 129, 0.1)', 'rgba(34, 197, 94, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-2xl"
              />
              
              <View className="flex-row items-center mb-3">
                <TrendingUp size={20} color="#10B981" className="mr-2" />
                <Text className="text-white font-semibold text-base">Progress Trend</Text>
              </View>

              <View className="space-y-3">
                <View className="flex-row justify-between">
                  <Text className="text-gray-300 text-sm">Consistency</Text>
                  <Text className="text-green-400 text-sm font-medium">Excellent</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-300 text-sm">Rate of Loss</Text>
                  <Text className="text-green-400 text-sm font-medium">Healthy</Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="text-gray-300 text-sm">Goal Timeline</Text>
                  <Text className="text-yellow-400 text-sm font-medium">On Track</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}; 