import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Calculator, User, Activity, Target, Utensils } from 'lucide-react-native';
import { useCalculator } from '../../hooks/useCalculator';
import { FormField } from './FormField';

export const CalculatorForm: React.FC = () => {
  const {
    form,
    handleFormChange,
    validateField,
    activityLevels,
    goals,
    dietaryPreferences
  } = useCalculator();

  const handleFieldChange = (field: keyof typeof form, value: any) => {
    handleFormChange(field, value);
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="p-4 space-y-6">
        {/* Personal Information Section */}
        <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.1)', 'rgba(34, 197, 94, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0 rounded-2xl"
          />
          
          <View className="flex-row items-center mb-4">
            <User size={20} color="#8B5CF6" className="mr-2" />
            <Text className="text-white text-lg font-semibold">Personal Information</Text>
          </View>

          <View className="space-y-4">
            <FormField
              label="Age"
              value={form.age}
              onChangeText={(text) => handleFieldChange('age', parseInt(text) || 0)}
              placeholder="Enter your age"
              type="number"
              keyboardType="numeric"
              min={10}
              max={100}
              required
              error={validateField('age')}
            />

            <FormField
              label="Gender"
              value={form.gender}
              onChangeText={(text) => handleFieldChange('gender', text)}
              type="select"
              options={[
                { label: 'Female', value: 'female' },
                { label: 'Male', value: 'male' }
              ]}
              selectedOption={form.gender}
              onSelectOption={(value) => handleFieldChange('gender', value)}
              required
              error={validateField('gender')}
            />

            <FormField
              label="Height"
              value={form.height}
              onChangeText={(text) => handleFieldChange('height', parseInt(text) || 0)}
              placeholder="Enter height"
              type="number"
              keyboardType="numeric"
              min={100}
              max={250}
              unit="cm"
              required
              error={validateField('height')}
            />

            <FormField
              label="Weight"
              value={form.weight}
              onChangeText={(text) => handleFieldChange('weight', parseInt(text) || 0)}
              placeholder="Enter weight"
              type="number"
              keyboardType="numeric"
              min={30}
              max={250}
              unit="kg"
              required
              error={validateField('weight')}
            />
          </View>
        </View>

        {/* Activity & Goals Section */}
        <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
          <LinearGradient
            colors={['rgba(59, 130, 246, 0.1)', 'rgba(96, 165, 250, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0 rounded-2xl"
          />
          
          <View className="flex-row items-center mb-4">
            <Activity size={20} color="#3B82F6" className="mr-2" />
            <Text className="text-white text-lg font-semibold">Activity & Goals</Text>
          </View>

          <View className="space-y-4">
            <FormField
              label="Activity Level"
              value={form.activity}
              onChangeText={(text) => handleFieldChange('activity', parseFloat(text) || 0)}
              type="select"
              options={activityLevels.map(level => ({
                label: level.label,
                value: level.value,
                description: level.description
              }))}
              selectedOption={form.activity}
              onSelectOption={(value) => handleFieldChange('activity', value)}
              required
              error={validateField('activity')}
            />

            <FormField
              label="Goal"
              value={form.goal}
              onChangeText={(text) => handleFieldChange('goal', parseInt(text) || 0)}
              type="select"
              options={goals.map(goal => ({
                label: goal.label,
                value: goal.value,
                description: goal.description
              }))}
              selectedOption={form.goal}
              onSelectOption={(value) => handleFieldChange('goal', value)}
              required
              error={validateField('goal')}
            />
          </View>
        </View>

        {/* Dietary Preferences Section */}
        <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
          <LinearGradient
            colors={['rgba(251, 191, 36, 0.1)', 'rgba(245, 158, 11, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0 rounded-2xl"
          />
          
          <View className="flex-row items-center mb-4">
            <Utensils size={20} color="#FBBF24" className="mr-2" />
            <Text className="text-white text-lg font-semibold">Dietary Preferences</Text>
          </View>

          <View className="space-y-4">
            <FormField
              label="Dietary Preference"
              value={form.dietaryPref}
              onChangeText={(text) => handleFieldChange('dietaryPref', text)}
              type="select"
              options={dietaryPreferences.map(pref => ({
                label: pref.label,
                value: pref.value,
                description: pref.description
              }))}
              selectedOption={form.dietaryPref}
              onSelectOption={(value) => handleFieldChange('dietaryPref', value)}
              required
              error={validateField('dietaryPref')}
            />

            <FormField
              label="Meals per Day"
              value={form.meals}
              onChangeText={(text) => handleFieldChange('meals', parseInt(text) || 0)}
              placeholder="Number of meals"
              type="number"
              keyboardType="numeric"
              min={1}
              max={8}
              required
              error={validateField('meals')}
            />

            <FormField
              label="Allergies (optional)"
              value={form.allergies}
              onChangeText={(text) => handleFieldChange('allergies', text)}
              placeholder="e.g. peanuts, gluten, dairy"
              type="text"
              maxLength={200}
            />
          </View>
        </View>

        {/* Optional Measurements Section */}
        <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
          <LinearGradient
            colors={['rgba(16, 185, 129, 0.1)', 'rgba(34, 197, 94, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0 rounded-2xl"
          />
          
          <View className="flex-row items-center mb-4">
            <Calculator size={20} color="#10B981" className="mr-2" />
            <Text className="text-white text-lg font-semibold">Optional Measurements</Text>
          </View>

          <View className="space-y-4">
            <FormField
              label="Body Fat % (optional)"
              value={form.bodyFat || ''}
              onChangeText={(text) => handleFieldChange('bodyFat', text ? parseFloat(text) : undefined)}
              placeholder="Body fat percentage"
              type="number"
              keyboardType="numeric"
              min={5}
              max={60}
              unit="%"
              error={validateField('bodyFat')}
            />

            <FormField
              label="Waist (optional)"
              value={form.waist || ''}
              onChangeText={(text) => handleFieldChange('waist', text ? parseInt(text) : undefined)}
              placeholder="Waist circumference"
              type="number"
              keyboardType="numeric"
              min={40}
              max={200}
              unit="cm"
              error={validateField('waist')}
            />

            <FormField
              label="Hip (optional)"
              value={form.hip || ''}
              onChangeText={(text) => handleFieldChange('hip', text ? parseInt(text) : undefined)}
              placeholder="Hip circumference"
              type="number"
              keyboardType="numeric"
              min={40}
              max={200}
              unit="cm"
              error={validateField('hip')}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}; 