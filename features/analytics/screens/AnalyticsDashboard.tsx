import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BarChart3, TrendingUp, Target, Lightbulb, Activity, Heart, Zap, Moon } from 'lucide-react-native';
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
    { key: 'overview', label: 'Overview', icon: BarChart3, color: '#059669' },
    { key: 'progress', label: 'Progress', icon: TrendingUp, color: '#10B981' },
    { key: 'nutrition', label: 'Nutrition', icon: Target, color: '#F59E0B' },
    { key: 'insights', label: 'AI Insights', icon: Lightbulb, color: '#8B5CF6' },
  ];

  const quickStats = [
    {
      title: 'Current Weight',
      value: recentProgress?.weight || 0,
      unit: 'kg',
      change: progressStats.totalLoss > 0 ? -2.5 : 0,
      changeType: progressStats.trend,
      subtitle: 'Last recorded',
      icon: Activity,
      color: '#059669'
    },
    {
      title: 'Daily Calories',
      value: recentNutrition?.calories || 0,
      unit: 'kcal',
      change: -5,
      changeType: 'decrease',
      subtitle: 'Average intake',
      icon: Heart,
      color: '#EF4444'
    },
    {
      title: 'Sleep Quality',
      value: recentHealth?.sleepQuality || 0,
      unit: '/10',
      change: +2,
      changeType: 'increase',
      subtitle: 'Last night',
      icon: Moon,
      color: '#8B5CF6'
    },
    {
      title: 'Energy Level',
      value: recentHealth?.energyLevel || 0,
      unit: '/10',
      change: +1,
      changeType: 'increase',
      subtitle: 'Today',
      icon: Zap,
      color: '#F59E0B'
    },
  ];

  return (
    <LinearGradient
      colors={["#f5f7fa", "#e0f7fa", "#d1fae5"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={styles.container} 
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Analytics</Text>
            <Text style={styles.subtitle}>
              Track your health journey with AI-powered insights
            </Text>
          </View>

          {/* Period Selector */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Time Period</Text>
            <View style={styles.periodSelector}>
              {periods.map((period) => (
                <TouchableOpacity
                  key={period.key}
                  onPress={() => setSelectedPeriod(period.key as any)}
                  style={[
                    styles.periodButton,
                    selectedPeriod === period.key && styles.periodButtonActive
                  ]}
                >
                  <Text style={[
                    styles.periodButtonText,
                    selectedPeriod === period.key && styles.periodButtonTextActive
                  ]}>
                    {period.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Stats */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Stats</Text>
            <View style={styles.statsGrid}>
              {quickStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <View key={index} style={styles.statCard}>
                    <View style={styles.statHeader}>
                      <View style={[styles.statIcon, { backgroundColor: stat.color + '20' }]}>
                        <IconComponent size={16} color={stat.color} />
                      </View>
                      <View style={styles.statChange}>
                        <Text style={[
                          styles.changeText,
                          { color: stat.changeType === 'increase' ? '#10B981' : '#EF4444' }
                        ]}>
                          {stat.change > 0 ? '+' : ''}{stat.change}%
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.statValue}>
                      {typeof stat.value === 'number' ? stat.value.toFixed(1) : stat.value}
                      <Text style={styles.statUnit}> {stat.unit}</Text>
                    </Text>
                    <Text style={styles.statTitle}>{stat.title}</Text>
                    <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
                  </View>
                );
              })}
            </View>
          </View>

          {/* Progress Chart */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Progress Tracking</Text>
            <View style={styles.chartCard}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Weight & BMI Progress</Text>
                <Text style={styles.chartSubtitle}>Last 4 weeks</Text>
              </View>
              <ProgressChart
                data={{
                  labels: ['1/1', '8/1', '15/1', '22/1', '29/1'],
                  datasets: [
                    {
                      data: [75, 74.2, 73.8, 73.1, 72.5],
                      color: '#059669',
                      strokeWidth: 3,
                    },
                    {
                      data: [24.5, 24.2, 24.0, 23.8, 23.6],
                      color: '#10B981',
                      strokeWidth: 2,
                    },
                  ],
                }}
                title="Weight & BMI Progress"
                subtitle="Last 4 weeks"
              />
            </View>
          </View>

          {/* Nutrition Chart */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Nutrition Overview</Text>
            <View style={styles.chartCard}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Daily Nutrition Intake</Text>
                <Text style={styles.chartSubtitle}>Calories, Protein, Carbs, Fats</Text>
              </View>
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
          </View>

          {/* Goals */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Your Goals</Text>
            {goals.slice(0, 2).map((goal) => (
              <GoalCard key={goal.id} goal={goal} />
            ))}
          </View>

          {/* AI Insights */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI Insights</Text>
            {insights.slice(0, 2).map((insight) => (
              <InsightCard key={insight.id} insight={insight} />
            ))}
          </View>

          {/* Category Navigation */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Explore More</Text>
            <View style={styles.categoriesGrid}>
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <TouchableOpacity
                    key={category.key}
                    onPress={() => setSelectedCategory(category.key)}
                    style={styles.categoryCard}
                  >
                    <View style={[styles.categoryIcon, { backgroundColor: category.color + '20' }]}>
                      <IconComponent size={24} color={category.color} />
                    </View>
                    <Text style={styles.categoryTitle}>{category.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#059669',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    textAlign: 'center',
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 12,
  },
  periodSelector: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 4,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  periodButtonActive: {
    backgroundColor: '#059669',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  periodButtonTextActive: {
    color: '#ffffff',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statChange: {
    alignItems: 'flex-end',
  },
  changeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  statUnit: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  statTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  statSubtitle: {
    fontSize: 12,
    color: '#64748b',
  },
  chartCard: {
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 10,
    elevation: 4,
  },
  chartHeader: {
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 2,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#64748b',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.97)',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center',
  },
}); 