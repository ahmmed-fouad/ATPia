import React from 'react';
import { useCalculator } from '../../../features/diet-calculator/hooks/useCalculator';
import { CalculatorScreen } from '../../../features/diet-calculator/screens/CalculatorScreen';
import { ResultsScreen } from '../../../features/diet-calculator/screens/ResultsScreen';

const DietCalculator = () => {
  const { showResults } = useCalculator();

  return showResults ? <ResultsScreen /> : <CalculatorScreen />;
};

export default DietCalculator;