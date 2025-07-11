import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ConnectedAccountsCard = () => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Connected Accounts</Text>
      <Text style={styles.label}>[Google, Apple]</Text>
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
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#64748b',
  },
});

export default ConnectedAccountsCard; 