import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import Svg, { Circle, G, Text as SvgText } from 'react-native-svg';
import { NutritionData } from '../types';

interface NutritionChartProps {
  data: NutritionData[];
  size?: number;
}

const { width } = Dimensions.get('window');
const CHART_SIZE = Math.min(width * 0.4, 150);

export const NutritionChart: React.FC<NutritionChartProps> = ({ 
  data, 
  size = CHART_SIZE 
}) => {
  const radius = size / 2;
  const center = size / 2;
  
  // Calculate total for percentages
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Generate pie chart segments
  const segments = data.map((item, index) => {
    const percentage = item.value / total;
    const angle = percentage * 2 * Math.PI;
    const startAngle = data
      .slice(0, index)
      .reduce((sum, d) => sum + (d.value / total) * 2 * Math.PI, 0);
    
    const x1 = center + radius * Math.cos(startAngle);
    const y1 = center + radius * Math.sin(startAngle);
    const x2 = center + radius * Math.cos(startAngle + angle);
    const y2 = center + radius * Math.sin(startAngle + angle);
    
    const largeArcFlag = angle > Math.PI ? 1 : 0;
    
    const path = [
      `M ${center} ${center}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
      'Z'
    ].join(' ');
    
    return {
      path,
      color: item.color,
      percentage: Math.round(percentage * 100),
      name: item.name,
      value: item.value
    };
  });

  return (
    <View className="items-center">
      <Svg width={size} height={size}>
        <G>
          {segments.map((segment, index) => (
            <Circle
              key={index}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={segment.color}
              strokeWidth={radius * 0.6}
              strokeDasharray={`${(segment.percentage / 100) * 2 * Math.PI * radius} ${2 * Math.PI * radius}`}
              strokeDashoffset={-index * (2 * Math.PI * radius) / segments.length}
              transform={`rotate(-90 ${center} ${center})`}
            />
          ))}
        </G>
      </Svg>
      
      {/* Legend */}
      <View className="mt-4 w-full">
        {segments.map((segment, index) => (
          <View key={index} className="flex-row items-center justify-between mb-2">
            <View className="flex-row items-center">
              <View 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: segment.color }}
              />
              <Text className="text-xs text-gray-600 dark:text-gray-300">
                {segment.name}
              </Text>
            </View>
            <Text className="text-xs font-semibold text-gray-800 dark:text-gray-200">
              {segment.percentage}%
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}; 