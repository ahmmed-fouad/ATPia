import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ChevronDown } from 'lucide-react-native';

interface FormFieldProps {
  label: string;
  value: string | number;
  onChangeText: (text: string) => void;
  placeholder?: string;
  error?: string;
  type?: 'text' | 'number' | 'select';
  options?: Array<{ label: string; value: any; description?: string }>;
  onSelectOption?: (value: any) => void;
  selectedOption?: any;
  keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
  maxLength?: number;
  min?: number;
  max?: number;
  unit?: string;
  required?: boolean;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  type = 'text',
  options,
  onSelectOption,
  selectedOption,
  keyboardType = 'default',
  maxLength,
  min,
  max,
  unit,
  required = false
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleTextChange = (text: string) => {
    if (type === 'number') {
      const numValue = parseFloat(text);
      if (isNaN(numValue) || (min !== undefined && numValue < min) || (max !== undefined && numValue > max)) {
        return;
      }
    }
    onChangeText(text);
  };

  const getSelectedOptionLabel = () => {
    if (!selectedOption || !options) return placeholder || 'Select an option';
    const option = options.find(opt => opt.value === selectedOption);
    return option ? option.label : placeholder || 'Select an option';
  };

  const renderInput = () => {
    if (type === 'select' && options) {
      return (
        <TouchableOpacity
          onPress={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex-row items-center justify-between bg-slate-700/50 rounded-xl px-4 py-3 border border-slate-600/50"
          activeOpacity={0.8}
        >
          <Text className="text-white flex-1">
            {getSelectedOptionLabel()}
          </Text>
          <ChevronDown 
            size={20} 
            color="#9CA3AF" 
            style={{ transform: [{ rotate: isDropdownOpen ? '180deg' : '0deg' }] }}
          />
        </TouchableOpacity>
      );
    }

    return (
      <View className="flex-row items-center">
        <TextInput
          value={value?.toString() || ''}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboardType}
          maxLength={maxLength}
          className="flex-1 bg-slate-700/50 rounded-xl px-4 py-3 text-white border border-slate-600/50"
        />
        {unit && (
          <Text className="text-gray-400 ml-2 font-medium">{unit}</Text>
        )}
      </View>
    );
  };

  return (
    <View className="mb-4">
      <View className="flex-row items-center mb-2">
        <Text className="text-white font-semibold text-base">{label}</Text>
        {required && <Text className="text-red-400 ml-1">*</Text>}
      </View>
      
      <View className="relative">
        <LinearGradient
          colors={['rgba(139, 92, 246, 0.1)', 'rgba(34, 197, 94, 0.1)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="absolute inset-0 rounded-xl"
        />
        
        {renderInput()}
        
        {error && (
          <Text className="text-red-400 text-xs mt-1 ml-1">{error}</Text>
        )}
      </View>

      {/* Dropdown Options */}
      {type === 'select' && isDropdownOpen && options && (
        <View className="mt-2 bg-slate-800/80 rounded-xl border border-slate-700/50 max-h-40">
          <LinearGradient
            colors={['rgba(139, 92, 246, 0.1)', 'rgba(34, 197, 94, 0.1)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            className="absolute inset-0 rounded-xl"
          />
          
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                onSelectOption?.(option.value);
                setIsDropdownOpen(false);
              }}
              className="px-4 py-3 border-b border-slate-700/30 last:border-b-0"
              activeOpacity={0.8}
            >
              <Text className="text-white font-medium">{option.label}</Text>
              {option.description && (
                <Text className="text-gray-400 text-xs mt-1">{option.description}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}; 