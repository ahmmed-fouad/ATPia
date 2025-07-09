import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, Image as ImageIcon, Upload } from 'lucide-react-native';

interface ImageUploadButtonProps {
  imageUri?: string;
  onCameraPress: () => void;
  onGalleryPress: () => void;
  onUploadPress: () => void;
  isUploading?: boolean;
}

export const ImageUploadButton: React.FC<ImageUploadButtonProps> = ({
  imageUri,
  onCameraPress,
  onGalleryPress,
  onUploadPress,
  isUploading = false,
}) => {
  return (
    <View className="bg-slate-800/50 rounded-2xl p-4 border border-slate-700/50 mb-4">
      <LinearGradient
        colors={['rgba(52, 211, 153, 0.1)', 'rgba(96, 165, 250, 0.1)']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="absolute inset-0 rounded-2xl"
      />
      
      <Text className="text-white font-semibold text-base mb-3">Upload Food Image</Text>
      
      {imageUri ? (
        <View className="items-center">
          <Image
            source={{ uri: imageUri }}
            className="w-full h-32 rounded-xl mb-3"
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={onUploadPress}
            disabled={isUploading}
            className={`w-full py-3 rounded-xl flex-row items-center justify-center ${
              isUploading ? 'bg-gray-600' : 'bg-green-600'
            }`}
            activeOpacity={0.8}
          >
            <Upload size={20} color="white" className="mr-2" />
            <Text className="text-white font-semibold text-base ml-2">
              {isUploading ? 'Processing...' : 'Scan Image'}
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="space-y-3">
          <TouchableOpacity
            onPress={onCameraPress}
            className="bg-blue-600 rounded-xl py-4 flex-row items-center justify-center"
            activeOpacity={0.8}
          >
            <Camera size={24} color="white" className="mr-3" />
            <Text className="text-white font-semibold text-base">Take Photo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            onPress={onGalleryPress}
            className="bg-purple-600 rounded-xl py-4 flex-row items-center justify-center"
            activeOpacity={0.8}
          >
            <ImageIcon size={24} color="white" className="mr-3" />
            <Text className="text-white font-semibold text-base">Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <Text className="text-gray-400 text-xs text-center mt-3">
        Take a clear photo of your food for accurate nutrition analysis
      </Text>
    </View>
  );
}; 