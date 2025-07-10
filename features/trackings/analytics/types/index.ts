export type ProgressData = {
  date: string;
  weight: number;
  bmi: number;
  bodyFat?: number;
  muscleMass?: number;
};

export type NutritionData = {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  water: number;
};

export type HealthMetrics = {
  date: string;
  sleepHours: number;
  sleepQuality: number; // 1-10 scale
  energyLevel: number; // 1-10 scale
  mood: number; // 1-10 scale
  stressLevel: number; // 1-10 scale
};

export type Goal = {
  id: string;
  title: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'weight' | 'nutrition' | 'health' | 'exercise';
  progress: number; // 0-100
};

export type AIInsight = {
  id: string;
  type: 'recommendation' | 'warning' | 'achievement' | 'pattern';
  title: string;
  message: string;
  confidence: number; // 0-100
  category: 'nutrition' | 'exercise' | 'lifestyle' | 'progress';
  actionable: boolean;
  actionText?: string;
};

export type ChartData = {
  labels: string[];
  datasets: {
    data: number[];
    color?: string;
    strokeWidth?: number;
  }[];
};

export type AnalyticsPeriod = 'week' | 'month' | 'quarter' | 'year';

export type AnalyticsState = {
  // Data
  progressData: ProgressData[];
  nutritionData: NutritionData[];
  healthMetrics: HealthMetrics[];
  goals: Goal[];
  insights: AIInsight[];
  
  // UI State
  selectedPeriod: AnalyticsPeriod;
  selectedCategory: 'overview' | 'progress' | 'nutrition' | 'health' | 'insights';
  isLoading: boolean;
  
  // Actions
  setSelectedPeriod: (period: AnalyticsPeriod) => void;
  setSelectedCategory: (category: string) => void;
  setLoading: (loading: boolean) => void;
  addProgressData: (data: ProgressData) => void;
  addNutritionData: (data: NutritionData) => void;
  addHealthMetrics: (data: HealthMetrics) => void;
  updateGoal: (id: string, progress: number) => void;
  addInsight: (insight: AIInsight) => void;
}; 