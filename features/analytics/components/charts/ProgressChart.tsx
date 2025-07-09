import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { LinearGradient } from 'expo-linear-gradient';
import { ChartData } from '../../types';

const { width } = Dimensions.get('window');

interface ProgressChartProps {
  data: ChartData;
  title: string;
  subtitle?: string;
}

export const ProgressChart: React.FC<ProgressChartProps> = ({ data, title, subtitle }) => {
  const chartConfig = {
    backgroundGradientFrom: '#1E293B',
    backgroundGradientTo: '#334155',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '6',
      strokeWidth: '2',
      stroke: '#8B5CF6',
    },
  };

  return (
    <View className="bg-slate-800 rounded-3xl p-4 mb-4">
      <LinearGradient
        colors={['rgba(139, 92, 246, 0.1)', 'rgba(6, 182, 212, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-3xl"
      />
      
      <View className="mb-4">
        <Text className="text-white text-lg font-bold mb-1">{title}</Text>
        {subtitle && (
          <Text className="text-gray-300 text-sm">{subtitle}</Text>
        )}
      </View>

      <LineChart
        data={{
          labels: data.labels,
          datasets: data.datasets.map((dataset, index) => ({
            data: dataset.data,
            color: (opacity = 1) => dataset.color || `rgba(139, 92, 246, ${opacity})`,
            strokeWidth: dataset.strokeWidth || 3,
          })),
        }}
        width={width - 48}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        withDots={true}
        withShadow={false}
        withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        withHorizontalLines={true}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        fromZero={false}
        yAxisLabel=""
        yAxisSuffix=""
        yLabelsOffset={10}
        xLabelsOffset={-10}
      />
    </View>
  );
}; 