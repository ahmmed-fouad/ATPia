import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UsageChart = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Usage Chart</Text>
      <View style={styles.chartPlaceholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  chartPlaceholder: {
    width: 220,
    height: 120,
    backgroundColor: '#e0e7ef',
    borderRadius: 12,
  },
});

export default UsageChart; 