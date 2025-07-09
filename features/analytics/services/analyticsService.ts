import { ProgressData, NutritionData, HealthMetrics, Goal, AIInsight, ChartData, AnalyticsPeriod } from '../types';

export class AnalyticsService {
  // Data processing utilities
  static getFilteredData<T extends { date: string }>(
    data: T[],
    period: AnalyticsPeriod
  ): T[] {
    const now = new Date();
    const periods = {
      week: 7,
      month: 30,
      quarter: 90,
      year: 365,
    };
    
    const daysBack = periods[period];
    const cutoffDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
    
    return data.filter(item => new Date(item.date) >= cutoffDate);
  }

  // Chart data generation
  static generateProgressChartData(data: ProgressData[]): ChartData {
    const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return {
      labels: sortedData.map(item => {
        const date = new Date(item.date);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }),
      datasets: [
        {
          data: sortedData.map(item => item.weight),
          color: '#8B5CF6',
          strokeWidth: 3,
        },
        {
          data: sortedData.map(item => item.bmi),
          color: '#06B6D4',
          strokeWidth: 2,
        },
      ],
    };
  }

  static generateNutritionChartData(data: NutritionData[]): ChartData {
    const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return {
      labels: sortedData.map(item => {
        const date = new Date(item.date);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }),
      datasets: [
        {
          data: sortedData.map(item => item.calories),
          color: '#F59E0B',
          strokeWidth: 3,
        },
        {
          data: sortedData.map(item => item.protein),
          color: '#10B981',
          strokeWidth: 2,
        },
        {
          data: sortedData.map(item => item.carbs),
          color: '#EF4444',
          strokeWidth: 2,
        },
        {
          data: sortedData.map(item => item.fats),
          color: '#8B5CF6',
          strokeWidth: 2,
        },
      ],
    };
  }

  static generateHealthChartData(data: HealthMetrics[]): ChartData {
    const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return {
      labels: sortedData.map(item => {
        const date = new Date(item.date);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }),
      datasets: [
        {
          data: sortedData.map(item => item.sleepQuality),
          color: '#3B82F6',
          strokeWidth: 3,
        },
        {
          data: sortedData.map(item => item.energyLevel),
          color: '#10B981',
          strokeWidth: 2,
        },
        {
          data: sortedData.map(item => item.mood),
          color: '#F59E0B',
          strokeWidth: 2,
        },
      ],
    };
  }

  // Statistics calculations
  static calculateProgressStats(data: ProgressData[]): {
    totalLoss: number;
    weeklyAverage: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  } {
    if (data.length < 2) return { totalLoss: 0, weeklyAverage: 0, trend: 'stable' };
    
    const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const firstWeight = sortedData[0].weight;
    const lastWeight = sortedData[sortedData.length - 1].weight;
    const totalLoss = firstWeight - lastWeight;
    
    const weeks = (new Date(sortedData[sortedData.length - 1].date).getTime() - 
                  new Date(sortedData[0].date).getTime()) / (7 * 24 * 60 * 60 * 1000);
    const weeklyAverage = totalLoss / weeks;
    
    const recentData = sortedData.slice(-3);
    const recentTrend = recentData[recentData.length - 1].weight - recentData[0].weight;
    
    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (recentTrend > 0.5) trend = 'increasing';
    else if (recentTrend < -0.5) trend = 'decreasing';
    
    return { totalLoss, weeklyAverage, trend };
  }

  static calculateNutritionStats(data: NutritionData[]): {
    avgCalories: number;
    avgProtein: number;
    avgCarbs: number;
    avgFats: number;
    consistency: number;
  } {
    if (data.length === 0) return { avgCalories: 0, avgProtein: 0, avgCarbs: 0, avgFats: 0, consistency: 0 };
    
    const avgCalories = data.reduce((sum, item) => sum + item.calories, 0) / data.length;
    const avgProtein = data.reduce((sum, item) => sum + item.protein, 0) / data.length;
    const avgCarbs = data.reduce((sum, item) => sum + item.carbs, 0) / data.length;
    const avgFats = data.reduce((sum, item) => sum + item.fats, 0) / data.length;
    
    // Calculate consistency based on how close daily values are to averages
    const consistency = data.reduce((sum, item) => {
      const calorieDiff = Math.abs(item.calories - avgCalories) / avgCalories;
      return sum + (1 - calorieDiff);
    }, 0) / data.length * 100;
    
    return { avgCalories, avgProtein, avgCarbs, avgFats, consistency };
  }

  // AI Insights generation
  static generateInsights(
    progressData: ProgressData[],
    nutritionData: NutritionData[],
    healthData: HealthMetrics[],
    goals: Goal[]
  ): AIInsight[] {
    const insights: AIInsight[] = [];
    
    // Progress insights
    const progressStats = this.calculateProgressStats(progressData);
    if (progressStats.totalLoss > 0) {
      insights.push({
        id: `insight-${Date.now()}-1`,
        type: 'achievement',
        title: 'Weight Loss Success!',
        message: `You've lost ${progressStats.totalLoss.toFixed(1)}kg. Keep up the great work!`,
        confidence: 95,
        category: 'progress',
        actionable: false,
      });
    }
    
    // Nutrition insights
    const nutritionStats = this.calculateNutritionStats(nutritionData);
    if (nutritionStats.consistency < 70) {
      insights.push({
        id: `insight-${Date.now()}-2`,
        type: 'recommendation',
        title: 'Improve Consistency',
        message: 'Your daily calorie intake varies significantly. Try to maintain more consistent eating patterns.',
        confidence: 85,
        category: 'nutrition',
        actionable: true,
        actionText: 'View Meal Plans',
      });
    }
    
    // Goal insights
    const nearDeadlineGoals = goals.filter(goal => {
      const deadline = new Date(goal.deadline);
      const now = new Date();
      const daysLeft = (deadline.getTime() - now.getTime()) / (24 * 60 * 60 * 1000);
      return daysLeft <= 7 && goal.progress < 90;
    });
    
    nearDeadlineGoals.forEach(goal => {
      insights.push({
        id: `insight-${Date.now()}-3`,
        type: 'warning',
        title: 'Goal Deadline Approaching',
        message: `${goal.title} deadline is coming up. You're ${goal.progress}% complete.`,
        confidence: 90,
        category: 'progress',
        actionable: true,
        actionText: 'Update Progress',
      });
    });
    
    return insights;
  }

  // Utility functions
  static formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  }

  static formatNumber(value: number, decimals: number = 1): string {
    return value.toFixed(decimals);
  }

  static getProgressColor(progress: number): string {
    if (progress >= 80) return '#10B981';
    if (progress >= 60) return '#F59E0B';
    return '#EF4444';
  }

  static getInsightColor(type: AIInsight['type']): string {
    switch (type) {
      case 'achievement': return '#10B981';
      case 'recommendation': return '#3B82F6';
      case 'warning': return '#F59E0B';
      case 'pattern': return '#8B5CF6';
      default: return '#6B7280';
    }
  }
} 