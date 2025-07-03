import { Apple, BotMessageSquare, ChartNoAxesCombined, Users } from 'lucide-react-native';

export type TabItem = {
  id: 'ai' | 'tracking' | 'nutrition' | 'social';
  label: string;
  icon: React.ComponentType<{ size: number; color: string }>;
};

export const tabItems: TabItem[] = [
  { id: 'ai', label: 'AI', icon: BotMessageSquare },
  { id: 'tracking', label: 'Tracking', icon: ChartNoAxesCombined },
  { id: 'nutrition', label: 'Nutrition', icon: Apple },
  { id: 'social', label: 'Social', icon: Users },
]; 