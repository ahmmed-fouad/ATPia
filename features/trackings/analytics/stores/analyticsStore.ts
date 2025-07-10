import { create } from 'zustand';
import { AnalyticsState, ProgressData, NutritionData, HealthMetrics, Goal, AIInsight, AnalyticsPeriod } from '../types';

// Demo data for development
const demoProgressData: ProgressData[] = [
  { date: '2024-01-01', weight: 75, bmi: 24.5, bodyFat: 18, muscleMass: 45 },
  { date: '2024-01-08', weight: 74.2, bmi: 24.2, bodyFat: 17.5, muscleMass: 45.5 },
  { date: '2024-01-15', weight: 73.8, bmi: 24.0, bodyFat: 17, muscleMass: 46 },
  { date: '2024-01-22', weight: 73.1, bmi: 23.8, bodyFat: 16.5, muscleMass: 46.5 },
  { date: '2024-01-29', weight: 72.5, bmi: 23.6, bodyFat: 16, muscleMass: 47 },
];

const demoNutritionData: NutritionData[] = [
  { date: '2024-01-01', calories: 2100, protein: 150, carbs: 200, fats: 70, fiber: 25, water: 2500 },
  { date: '2024-01-08', calories: 2050, protein: 155, carbs: 190, fats: 68, fiber: 28, water: 2600 },
  { date: '2024-01-15', calories: 2000, protein: 160, carbs: 180, fats: 65, fiber: 30, water: 2700 },
  { date: '2024-01-22', calories: 1950, protein: 165, carbs: 170, fats: 62, fiber: 32, water: 2800 },
  { date: '2024-01-29', calories: 1900, protein: 170, carbs: 160, fats: 60, fiber: 35, water: 2900 },
];

const demoHealthMetrics: HealthMetrics[] = [
  { date: '2024-01-01', sleepHours: 7.5, sleepQuality: 7, energyLevel: 6, mood: 7, stressLevel: 5 },
  { date: '2024-01-08', sleepHours: 8, sleepQuality: 8, energyLevel: 7, mood: 8, stressLevel: 4 },
  { date: '2024-01-15', sleepHours: 8.5, sleepQuality: 9, energyLevel: 8, mood: 9, stressLevel: 3 },
  { date: '2024-01-22', sleepHours: 8, sleepQuality: 8, energyLevel: 8, mood: 8, stressLevel: 4 },
  { date: '2024-01-29', sleepHours: 8.5, sleepQuality: 9, energyLevel: 9, mood: 9, stressLevel: 2 },
];

const demoGoals: Goal[] = [
  {
    id: '1',
    title: 'Target Weight',
    target: 70,
    current: 72.5,
    unit: 'kg',
    deadline: '2024-03-01',
    category: 'weight',
    progress: 75,
  },
  {
    id: '2',
    title: 'Daily Protein',
    target: 180,
    current: 170,
    unit: 'g',
    deadline: '2024-02-15',
    category: 'nutrition',
    progress: 94,
  },
  {
    id: '3',
    title: 'Sleep Quality',
    target: 9,
    current: 9,
    unit: '/10',
    deadline: '2024-02-01',
    category: 'health',
    progress: 100,
  },
];

const demoInsights: AIInsight[] = [
  {
    id: '1',
    type: 'achievement',
    title: 'Great Progress!',
    message: 'You\'ve lost 2.5kg in the last 4 weeks. Your consistency is paying off!',
    confidence: 95,
    category: 'progress',
    actionable: false,
  },
  {
    id: '2',
    type: 'recommendation',
    title: 'Increase Protein Intake',
    message: 'Try adding more lean protein to reach your daily goal of 180g.',
    confidence: 88,
    category: 'nutrition',
    actionable: true,
    actionText: 'View Recipes',
  },
  {
    id: '3',
    type: 'pattern',
    title: 'Sleep Quality Correlation',
    message: 'Your weight loss is 40% faster on days when you sleep 8+ hours.',
    confidence: 92,
    category: 'lifestyle',
    actionable: true,
    actionText: 'Sleep Tips',
  },
];

export const useAnalyticsStore = create<AnalyticsState>((set, get) => ({
  // Initial data
  progressData: demoProgressData,
  nutritionData: demoNutritionData,
  healthMetrics: demoHealthMetrics,
  goals: demoGoals,
  insights: demoInsights,
  
  // UI State
  selectedPeriod: 'month',
  selectedCategory: 'overview',
  isLoading: false,
  
  // Actions
  setSelectedPeriod: (period: AnalyticsPeriod) => set({ selectedPeriod: period }),
  setSelectedCategory: (category: string) => set({ selectedCategory: category as any }),
  setLoading: (loading: boolean) => set({ isLoading: loading }),
  
  addProgressData: (data: ProgressData) => 
    set((state) => ({ 
      progressData: [...state.progressData, data] 
    })),
    
  addNutritionData: (data: NutritionData) => 
    set((state) => ({ 
      nutritionData: [...state.nutritionData, data] 
    })),
    
  addHealthMetrics: (data: HealthMetrics) => 
    set((state) => ({ 
      healthMetrics: [...state.healthMetrics, data] 
    })),
    
  updateGoal: (id: string, progress: number) => 
    set((state) => ({
      goals: state.goals.map(goal => 
        goal.id === id ? { ...goal, progress } : goal
      )
    })),
    
  addInsight: (insight: AIInsight) => 
    set((state) => ({ 
      insights: [...state.insights, insight] 
    })),
})); 