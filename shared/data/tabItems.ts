import { Apple, BotMessageSquare, Calculator, ChartNoAxesCombined, Camera, Users, BookOpen, ShoppingCart} from 'lucide-react-native';

export type TabItem = {
  id: 'ai' | 'tracking' | 'nutrition' | 'social';
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
};

export type NutritionFeatures = {
  id: "food-scanner" | "diet-calculator" | "meal-plans" | "grocery-list";
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
};

export const tabItems: TabItem[] = [
  { id: 'ai', label: 'AI', icon: BotMessageSquare },
  { id: 'tracking', label: 'Tracking', icon: ChartNoAxesCombined },
  { id: 'nutrition', label: 'Nutrition', icon: Apple },
  { id: 'social', label: 'Social', icon: Users },
]; 

export const nutritionFeatures: NutritionFeatures[] = [
  { id: "food-scanner", label: "Food Scanner", icon: Camera },
  { id: "diet-calculator", label: "Diet Calculator", icon: Calculator },
  { id: "meal-plans", label: "Meal Plans", icon: BookOpen },
  { id: "grocery-list", label: "Grocery List", icon: ShoppingCart },
];