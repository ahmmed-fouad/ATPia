import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Share2, Download, Plus } from 'lucide-react-native';
import { useCalculator } from '../hooks/useCalculator';
import { ResultsCard } from '../components/results/ResultsCard';
import { MacroPieChart } from '../components/charts/MacroPieChart';
import { CalorieBarChart } from '../components/charts/CalorieBarChart';
import { MealPlanCard } from '../components/results/MealPlanCard';
import { TipsCard } from '../components/results/TipsCard';
import { GradientButton } from '../components/ui/GradientButton';

export const ResultsScreen: React.FC = () => {
  const {
    results,
    sampleMealPlan,
    successTips,
    getMacroChartData,
    getCalorieChartData,
    setShowResults
  } = useCalculator();

  if (!results) {
    return (
      <SafeAreaView className="flex-1 bg-slate-900">
        <LinearGradient
          colors={['#0F172A', '#1E293B', '#334155']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 justify-center items-center px-4"
        >
          <Text className="text-white text-lg text-center">
            No results available. Please calculate your nutrition plan first.
          </Text>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    setShowResults(false);
  };

  const handleAddToDiary = () => {
    console.log('Add to diary:', results);
    // TODO: Implement add to diary functionality
  };

  const handleShare = () => {
    console.log('Share results:', results);
    // TODO: Implement share functionality
  };

  const handleDownload = () => {
    console.log('Download results:', results);
    // TODO: Implement download functionality
  };

  const macroChartData = getMacroChartData();
  const calorieChartData = getCalorieChartData();

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#334155']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="p-4">
            <View className="flex-row items-center justify-between mb-6">
              <TouchableOpacity
                onPress={handleBack}
                className="flex-row items-center"
                activeOpacity={0.8}
              >
                <ArrowLeft size={24} color="#8B5CF6" className="mr-2" />
                <Text className="text-white text-lg font-semibold">Back to Calculator</Text>
              </TouchableOpacity>
              
              <View className="flex-row space-x-2">
                <TouchableOpacity
                  onPress={handleShare}
                  className="p-2 rounded-full bg-slate-700/50"
                  activeOpacity={0.8}
                >
                  <Share2 size={20} color="#60A5FA" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDownload}
                  className="p-2 rounded-full bg-slate-700/50"
                  activeOpacity={0.8}
                >
                  <Download size={20} color="#10B981" />
                </TouchableOpacity>
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-white text-3xl font-bold mb-2">Your Results</Text>
              <Text className="text-gray-400 text-base">
                Your personalized nutrition plan is ready
              </Text>
            </View>
          </View>

          {/* Results Card */}
          <View className="px-4 mb-6">
            <ResultsCard
              results={results}
              onAddToDiary={handleAddToDiary}
              onShare={handleShare}
            />
          </View>

          {/* Charts Section */}
          <View className="px-4 mb-6">
            <Text className="text-white text-xl font-semibold mb-4 px-1">
              Nutrition Breakdown
            </Text>
            
            {/* Macro Chart */}
            <View className="mb-4">
              <MacroPieChart
                data={macroChartData}
                title="Macronutrient Distribution"
                subtitle="Protein, Carbs, and Fat breakdown"
                height={200}
              />
            </View>

            {/* Calorie Chart */}
            <View className="mb-4">
              <CalorieBarChart
                data={calorieChartData}
                title="Daily Calorie Target"
                subtitle="Your personalized calorie goal"
                height={120}
              />
            </View>
          </View>

          {/* Meal Plan Section */}
          <View className="px-4 mb-6">
            <Text className="text-white text-xl font-semibold mb-4 px-1">
              Sample Meal Plan
            </Text>
            <MealPlanCard meals={sampleMealPlan} />
          </View>

          {/* Tips Section */}
          <View className="px-4 mb-6">
            <Text className="text-white text-xl font-semibold mb-4 px-1">
              Success Tips
            </Text>
            <TipsCard tips={successTips} />
          </View>

          {/* Action Buttons */}
          <View className="px-4 mb-8">
            <View className="space-y-3">
              <GradientButton
                title="Add to Food Diary"
                onPress={handleAddToDiary}
                variant="success"
                size="large"
                icon={Plus}
                iconPosition="left"
                fullWidth
              />
              
              <GradientButton
                title="Share Results"
                onPress={handleShare}
                variant="secondary"
                size="medium"
                icon={Share2}
                iconPosition="left"
                fullWidth
              />
              
              <GradientButton
                title="Download PDF"
                onPress={handleDownload}
                variant="primary"
                size="medium"
                icon={Download}
                iconPosition="left"
                fullWidth
              />
            </View>
          </View>

          {/* Additional Information */}
          <View className="px-4 mb-8">
            <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.1)', 'rgba(34, 197, 94, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-2xl"
              />
              
              <Text className="text-white text-lg font-semibold mb-3">📊 About Your Results</Text>
              <View className="space-y-2">
                <Text className="text-gray-300 text-sm">
                  • <Text className="text-white font-medium">BMR:</Text> Your basal metabolic rate (calories burned at rest)
                </Text>
                <Text className="text-gray-300 text-sm">
                  • <Text className="text-white font-medium">TDEE:</Text> Total daily energy expenditure (calories burned with activity)
                </Text>
                <Text className="text-gray-300 text-sm">
                  • <Text className="text-white font-medium">Macros:</Text> Optimized for your dietary preference and goals
                </Text>
                <Text className="text-gray-300 text-sm">
                  • <Text className="text-white font-medium">Water:</Text> Recommended daily hydration based on your weight
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}; 