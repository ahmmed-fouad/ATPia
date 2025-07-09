import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, Barcode, Search, History, ArrowRight } from 'lucide-react-native';
import { useFoodScanner } from '../hooks/useFoodScanner';
import { ImageUploadButton } from '../components/ui/ImageUploadButton';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const FoodScannerScreen: React.FC = () => {
  const {
    recentScans,
    isScanning,
    isProcessing,
    handleImageScan,
    handleBarcodeScan,
    handleManualInput,
    setShowResults,
  } = useFoodScanner();

  const [imageUri, setImageUri] = useState<string | undefined>();
  const [barcode, setBarcode] = useState('');
  const [manualInput, setManualInput] = useState('');

  const handleCameraPress = () => {
    // TODO: Implement camera functionality
    console.log('Camera pressed');
    setImageUri('https://via.placeholder.com/300x200/34D399/FFFFFF?text=Food+Image');
  };

  const handleGalleryPress = () => {
    // TODO: Implement gallery picker
    console.log('Gallery pressed');
    setImageUri('https://via.placeholder.com/300x200/60A5FA/FFFFFF?text=Gallery+Image');
  };

  const handleUploadPress = async () => {
    if (imageUri) {
      await handleImageScan(imageUri);
      setShowResults(true);
    }
  };

  const handleBarcodeSubmit = async () => {
    if (barcode.trim()) {
      await handleBarcodeScan(barcode.trim());
      setShowResults(true);
      setBarcode('');
    }
  };

  const handleManualSubmit = async () => {
    if (manualInput.trim()) {
      await handleManualInput(manualInput.trim());
      setShowResults(true);
      setManualInput('');
    }
  };

  if (isProcessing) {
    return (
      <SafeAreaView className="flex-1 bg-slate-900">
        <LinearGradient
          colors={['#0F172A', '#1E293B', '#334155']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 justify-center items-center px-4"
        >
          <LoadingSpinner 
            message="Analyzing your food..." 
            size="large"
          />
        </LinearGradient>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-900">
      <LinearGradient
        colors={['#0F172A', '#1E293B', '#334155']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-4 pt-4" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="mb-6">
            <Text className="text-white text-3xl font-bold mb-2">Food Scanner</Text>
            <Text className="text-gray-400 text-base">
              Scan food items to get detailed nutrition information
            </Text>
          </View>

          {/* Image Upload */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">📸 Image Scanning</Text>
            <ImageUploadButton
              imageUri={imageUri}
              onCameraPress={handleCameraPress}
              onGalleryPress={handleGalleryPress}
              onUploadPress={handleUploadPress}
              isUploading={isScanning}
            />
          </View>

          {/* Barcode Scanner */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">📊 Barcode Scanner</Text>
            <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <LinearGradient
                colors={['rgba(96, 165, 250, 0.1)', 'rgba(139, 92, 246, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-2xl"
              />
              
              <View className="flex-row items-center mb-3">
                <Barcode size={20} color="#60A5FA" className="mr-2" />
                <Text className="text-white font-medium">Scan Product Barcode</Text>
              </View>
              
              <View className="flex-row space-x-2">
                <TextInput
                  value={barcode}
                  onChangeText={setBarcode}
                  placeholder="Enter barcode number"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 bg-slate-700/50 rounded-xl px-4 py-3 text-white border border-slate-600/50"
                  keyboardType="numeric"
                />
                <TouchableOpacity
                  onPress={handleBarcodeSubmit}
                  disabled={!barcode.trim()}
                  className={`px-4 py-3 rounded-xl flex-row items-center ${
                    barcode.trim() ? 'bg-blue-600' : 'bg-gray-600'
                  }`}
                  activeOpacity={0.8}
                >
                  <Search size={20} color="white" />
                </TouchableOpacity>
              </View>
              
              <Text className="text-gray-400 text-xs mt-2">
                Enter the barcode number from any food product
              </Text>
            </View>
          </View>

          {/* Manual Input */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-3">✍️ Manual Input</Text>
            <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <LinearGradient
                colors={['rgba(251, 191, 36, 0.1)', 'rgba(34, 197, 94, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-2xl"
              />
              
              <View className="flex-row items-center mb-3">
                <Search size={20} color="#FBBF24" className="mr-2" />
                <Text className="text-white font-medium">Search Food Database</Text>
              </View>
              
              <View className="flex-row space-x-2">
                <TextInput
                  value={manualInput}
                  onChangeText={setManualInput}
                  placeholder="Enter food name"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 bg-slate-700/50 rounded-xl px-4 py-3 text-white border border-slate-600/50"
                />
                <TouchableOpacity
                  onPress={handleManualSubmit}
                  disabled={!manualInput.trim()}
                  className={`px-4 py-3 rounded-xl flex-row items-center ${
                    manualInput.trim() ? 'bg-yellow-600' : 'bg-gray-600'
                  }`}
                  activeOpacity={0.8}
                >
                  <Search size={20} color="white" />
                </TouchableOpacity>
              </View>
              
              <Text className="text-gray-400 text-xs mt-2">
                Search our database for common foods
              </Text>
            </View>
          </View>

          {/* Recent Scans */}
          {recentScans.length > 0 && (
            <View className="mb-8">
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-white text-lg font-semibold">Recent Scans</Text>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-blue-400 text-sm mr-1">View All</Text>
                  <ArrowRight size={16} color="#60A5FA" />
                </TouchableOpacity>
              </View>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {recentScans.slice(0, 5).map((food, index) => (
                  <TouchableOpacity
                    key={food.id}
                    className="bg-slate-800/50 rounded-xl p-3 mr-3 border border-slate-700/50 min-w-[120]"
                    activeOpacity={0.8}
                  >
                    <LinearGradient
                      colors={['rgba(52, 211, 153, 0.1)', 'rgba(96, 165, 250, 0.1)']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      className="absolute inset-0 rounded-xl"
                    />
                    
                    <Text className="text-white font-medium text-sm mb-1" numberOfLines={1}>
                      {food.name}
                    </Text>
                    <Text className="text-gray-400 text-xs mb-2">
                      {food.formattedDate}
                    </Text>
                    <View className="flex-row items-center">
                      <View 
                        className="w-2 h-2 rounded-full mr-1"
                        style={{ 
                          backgroundColor: food.nutritionScore >= 80 ? '#10B981' : 
                                        food.nutritionScore >= 60 ? '#F59E0B' : '#EF4444' 
                        }}
                      />
                      <Text className="text-gray-300 text-xs">
                        Score: {food.nutritionScore}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Quick Tips */}
          <View className="mb-8">
            <Text className="text-white text-lg font-semibold mb-3">💡 Quick Tips</Text>
            <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50">
              <LinearGradient
                colors={['rgba(139, 92, 246, 0.1)', 'rgba(34, 197, 94, 0.1)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute inset-0 rounded-2xl"
              />
              
              <View className="space-y-2">
                <Text className="text-gray-300 text-sm">
                  • 📸 Take clear, well-lit photos for best results
                </Text>
                <Text className="text-gray-300 text-sm">
                  • 📊 Barcode scanning provides the most accurate data
                </Text>
                <Text className="text-gray-300 text-sm">
                  • 🔍 Use manual search for homemade or restaurant foods
                </Text>
                <Text className="text-gray-300 text-sm">
                  • ⚠️ Always check allergen warnings before consuming
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}; 