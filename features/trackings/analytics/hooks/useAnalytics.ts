import { useMemo } from 'react';
import { useAnalyticsStore } from '../stores/analyticsStore';
import { AnalyticsService } from '../services/analyticsService';
import { ProgressData, NutritionData, HealthMetrics, Goal, AIInsight } from '../types';

export const useAnalytics = () => {
  const {
    progressData,
    nutritionData,
    healthMetrics,
    goals,
    insights,
    selectedPeriod,
    selectedCategory,
    isLoading,
    setSelectedPeriod,
    setSelectedCategory,
    setLoading,
  } = useAnalyticsStore();

  // Filter data based on selected period
  const filteredProgressData = useMemo(() => 
    AnalyticsService.getFilteredData(progressData, selectedPeriod),
    [progressData, selectedPeriod]
  );

  const filteredNutritionData = useMemo(() => 
    AnalyticsService.getFilteredData(nutritionData, selectedPeriod),
    [nutritionData, selectedPeriod]
  );

  const filteredHealthData = useMemo(() => 
    AnalyticsService.getFilteredData(healthMetrics, selectedPeriod),
    [healthMetrics, selectedPeriod]
  );

  // Generate chart data
  const progressChartData = useMemo(() => 
    AnalyticsService.generateProgressChartData(filteredProgressData),
    [filteredProgressData]
  );

  const nutritionChartData = useMemo(() => 
    AnalyticsService.generateNutritionChartData(filteredNutritionData),
    [filteredNutritionData]
  );

  const healthChartData = useMemo(() => 
    AnalyticsService.generateHealthChartData(filteredHealthData),
    [filteredHealthData]
  );

  // Calculate statistics
  const progressStats = useMemo(() => 
    AnalyticsService.calculateProgressStats(filteredProgressData),
    [filteredProgressData]
  );

  const nutritionStats = useMemo(() => 
    AnalyticsService.calculateNutritionStats(filteredNutritionData),
    [filteredNutritionData]
  );

  // Filter goals by category
  const filteredGoals = useMemo(() => {
    if (selectedCategory === 'overview') return goals;
    return goals.filter(goal => goal.category === selectedCategory);
  }, [goals, selectedCategory]);

  // Filter insights by category
  const filteredInsights = useMemo(() => {
    if (selectedCategory === 'overview') return insights;
    return insights.filter(insight => insight.category === selectedCategory);
  }, [insights, selectedCategory]);

  // Get recent data for quick stats
  const recentProgress = useMemo(() => 
    filteredProgressData.slice(-1)[0] || null,
    [filteredProgressData]
  );

  const recentNutrition = useMemo(() => 
    filteredNutritionData.slice(-1)[0] || null,
    [filteredNutritionData]
  );

  const recentHealth = useMemo(() => 
    filteredHealthData.slice(-1)[0] || null,
    [filteredHealthData]
  );

  return {
    // Data
    progressData: filteredProgressData,
    nutritionData: filteredNutritionData,
    healthData: filteredHealthData,
    goals: filteredGoals,
    insights: filteredInsights,
    
    // Chart data
    progressChartData,
    nutritionChartData,
    healthChartData,
    
    // Statistics
    progressStats,
    nutritionStats,
    
    // Recent data
    recentProgress,
    recentNutrition,
    recentHealth,
    
    // UI state
    selectedPeriod,
    selectedCategory,
    isLoading,
    
    // Actions
    setSelectedPeriod,
    setSelectedCategory,
    setLoading,
  };
}; 