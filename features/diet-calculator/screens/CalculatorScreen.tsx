import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Calculator, ArrowRight, RefreshCw } from 'lucide-react-native';
import { useCalculator } from '../hooks/useCalculator';
import { CalculatorForm } from '../components/forms/CalculatorForm';
import { GradientButton } from '../components/ui/GradientButton';

export const CalculatorScreen: React.FC = () => {
  const {
    form,
    results,
    isLoading,
    showResults,
    formValidation,
    handleCalculate,
    handleReset,
    isFormValid,
    setShowResults
  } = useCalculator();

  const handleCalculatePress = () => {
    handleCalculate();
  };

  const handleResetPress = () => {
    handleReset();
  };

  const handleViewResults = () => {
    setShowResults(true);
  };

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
              <View className="flex-row items-center">
                <View className="w-12 h-12 bg-purple-600/20 rounded-xl items-center justify-center mr-3">
                  <Calculator size={24} color="#8B5CF6" />
                </View>
                <View>
                  <Text className="text-white text-2xl font-bold">Diet Calculator</Text>
                  <Text className="text-gray-400 text-sm">
                    Calculate your personalized nutrition plan
                  </Text>
                </View>
              </View>
              
              <TouchableOpacity
                onPress={handleResetPress}
                className="p-2 rounded-full bg-slate-700/50"
                activeOpacity={0.8}
              >
                <RefreshCw size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>

            {/* Quick Stats */}
            <View className="flex-row space-x-3 mb-6">
              <View className="flex-1 bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                <LinearGradient
                  colors={['rgba(139, 92, 246, 0.1)', 'rgba(34, 197, 94, 0.1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="absolute inset-0 rounded-xl"
                />
                <Text className="text-white text-lg font-bold">{form.age}</Text>
                <Text className="text-gray-400 text-xs">Age</Text>
              </View>
              
              <View className="flex-1 bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                <LinearGradient
                  colors={['rgba(59, 130, 246, 0.1)', 'rgba(96, 165, 250, 0.1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="absolute inset-0 rounded-xl"
                />
                <Text className="text-white text-lg font-bold">{form.height}cm</Text>
                <Text className="text-gray-400 text-xs">Height</Text>
              </View>
              
              <View className="flex-1 bg-slate-800/50 rounded-xl p-3 border border-slate-700/50">
                <LinearGradient
                  colors={['rgba(251, 191, 36, 0.1)', 'rgba(245, 158, 11, 0.1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="absolute inset-0 rounded-xl"
                />
                <Text className="text-white text-lg font-bold">{form.weight}kg</Text>
                <Text className="text-gray-400 text-xs">Weight</Text>
              </View>
            </View>
          </View>

          {/* Form */}
          <CalculatorForm />

          {/* Calculate Button */}
          <View className="p-4">
            <GradientButton
              title={isLoading ? "Calculating..." : "Calculate Nutrition Plan"}
              onPress={handleCalculatePress}
              variant="primary"
              size="large"
              disabled={!isFormValid() || isLoading}
              icon={Calculator}
              iconPosition="left"
              fullWidth
            />

            {/* Validation Errors */}
            {Object.keys(formValidation.errors).length > 0 && (
              <View className="mt-4 p-3 bg-red-600/20 rounded-xl border border-red-600/30">
                <Text className="text-red-400 text-sm font-medium mb-2">
                  Please fix the following errors:
                </Text>
                {Object.entries(formValidation.errors).map(([field, error]) => (
                  <Text key={field} className="text-red-300 text-xs">
                    • {error}
                  </Text>
                ))}
              </View>
            )}

            {/* Results Preview */}
            {results && !showResults && (
              <View className="mt-6 bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
                <LinearGradient
                  colors={['rgba(16, 185, 129, 0.1)', 'rgba(34, 197, 94, 0.1)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  className="absolute inset-0 rounded-2xl"
                />
                
                <View className="flex-row items-center justify-between mb-4">
                  <View>
                    <Text className="text-white text-lg font-semibold">Results Ready!</Text>
                    <Text className="text-gray-400 text-sm">
                      Your personalized nutrition plan is calculated
                    </Text>
                  </View>
                  <View className="w-12 h-12 bg-green-600/20 rounded-full items-center justify-center">
                    <Text className="text-green-400 text-xl">✓</Text>
                  </View>
                </View>

                <View className="flex-row space-x-4 mb-4">
                  <View className="flex-1 items-center">
                    <Text className="text-white text-2xl font-bold">
                      {results.calories.toLocaleString()}
                    </Text>
                    <Text className="text-gray-400 text-xs">Calories</Text>
                  </View>
                  <View className="flex-1 items-center">
                    <Text className="text-white text-2xl font-bold">
                      {results.protein}g
                    </Text>
                    <Text className="text-gray-400 text-xs">Protein</Text>
                  </View>
                  <View className="flex-1 items-center">
                    <Text className="text-white text-2xl font-bold">
                      {results.carbs}g
                    </Text>
                    <Text className="text-gray-400 text-xs">Carbs</Text>
                  </View>
                </View>

                <GradientButton
                  title="View Full Results"
                  onPress={handleViewResults}
                  variant="success"
                  size="medium"
                  icon={ArrowRight}
                  iconPosition="right"
                  fullWidth
                />
              </View>
            )}
          </View>

          {/* Tips Section */}
          <View className="p-4">
            <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.1)', 'rgba(34, 197, 94, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-2xl"
              />
              
              <Text className="text-white text-lg font-semibold mb-3">💡 Tips</Text>
              <View className="space-y-2">
                <Text className="text-gray-300 text-sm">
                  • Fill in all required fields for accurate calculations
                </Text>
                <Text className="text-gray-300 text-sm">
                  • Be honest about your activity level for best results
                </Text>
                <Text className="text-gray-300 text-sm">
                  • Consider your dietary preferences and allergies
                </Text>
                <Text className="text-gray-300 text-sm">
                  • Results are based on scientific formulas (Mifflin-St Jeor)
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}; 