import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  StyleSheet,
  Platform,
  Linking,
} from 'react-native';
import { RecipeModalProps } from '../types';
import { NutritionChart } from './NutritionChart';
import { useRecipes } from '../hooks/useRecipes';

const { width, height } = Dimensions.get('window');
const FALLBACK_IMAGE = 'https://via.placeholder.com/150?text=No+Image';

export const RecipeModal: React.FC<RecipeModalProps> = ({
  recipe,
  visible,
  onClose,
}) => {
  const { getNutritionData, getIngredients } = useRecipes();
  const [imgUri, setImgUri] = useState(recipe?.strMealThumb || FALLBACK_IMAGE);

  if (!recipe) return null;

  const nutritionData = getNutritionData(recipe);
  const ingredients = getIngredients(recipe);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
      transparent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          {/* Header */}
          <View style={styles.headerRow}>
            <Text style={styles.headerTitle}>Recipe Details</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeBtn}
            >
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 24 }}>
            {/* Recipe Image and Nutrition Chart */}
            <View style={styles.topRow}>
              <Image
                source={{ uri: imgUri }}
                style={styles.image}
                resizeMode="cover"
                onError={() => setImgUri(FALLBACK_IMAGE)}
              />
              <View style={styles.chartCol}>
                <NutritionChart data={nutritionData} size={110} />
              </View>
            </View>

            {/* Recipe Title */}
            <Text style={styles.title}>{recipe.strMeal}</Text>

            {/* Category and Area */}
            <Text style={styles.categoryText}>
              {recipe.strCategory} | {recipe.strArea}
            </Text>

            {/* Ingredients */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Ingredients</Text>
              <View style={styles.ingredientsBox}>
                {ingredients.map((item, index) => (
                  <View key={index} style={styles.ingredientRow}>
                    <View style={styles.ingredientDot} />
                    <Text style={styles.ingredientText}>{item.ingredient}</Text>
                    {item.measure && (
                      <Text style={styles.ingredientMeasure}>({item.measure})</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>

            {/* Instructions */}
            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Instructions</Text>
              <View style={styles.instructionsBox}>
                <Text style={styles.instructionsText}>{recipe.strInstructions}</Text>
              </View>
            </View>

            {/* Tags */}
            {recipe.strTags && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Tags</Text>
                <View style={styles.tagsRow}>
                  {recipe.strTags.split(',').map((tag, index) => (
                    <View
                      key={index}
                      style={[styles.tagChip, { backgroundColor: ['#d1fae5', '#e0e7ff', '#fef9c3'][index % 3] }]}
                    >
                      <Text style={[styles.tagText, { color: ['#059669', '#2563eb', '#b45309'][index % 3] }]}>
                        {tag.trim()}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* YouTube Link */}
            {recipe.strYoutube && (
              <View style={styles.section}>
                <Text style={styles.sectionHeader}>Video Tutorial</Text>
                <TouchableOpacity
                  style={styles.youtubeBtn}
                  onPress={() => Linking.openURL(recipe.strYoutube!)}
                >
                  <Text style={styles.youtubeBtnText}>Watch on YouTube</Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.18)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    backgroundColor: 'rgba(255,255,255,0.99)',
    borderRadius: 16,
    padding: 0,
    width: width - 24,
    maxHeight: height * 0.92,
    shadowColor: '#a7f3d0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13,
    shadowRadius: 12,
    elevation: 5,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e7ef',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0f2fe',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    fontSize: 26,
    color: '#059669',
    fontWeight: 'bold',
    marginTop: -2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingTop: 12,
    gap: 12,
  },
  image: {
    width: 110,
    height: 110,
    borderRadius: 12,
    backgroundColor: '#e5e7eb',
    marginRight: 10,
  },
  chartCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 2,
    paddingHorizontal: 18,
  },
  categoryText: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 8,
  },
  section: {
    marginTop: 10,
    paddingHorizontal: 18,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 6,
  },
  ingredientsBox: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 10,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ingredientDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#059669',
    marginRight: 8,
  },
  ingredientText: {
    flex: 1,
    color: '#222',
    fontSize: 14,
  },
  ingredientMeasure: {
    color: '#64748b',
    fontSize: 13,
    marginLeft: 4,
  },
  instructionsBox: {
    backgroundColor: '#f3f4f6',
    borderRadius: 10,
    padding: 10,
  },
  instructionsText: {
    color: '#222',
    fontSize: 14,
    lineHeight: 20,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 2,
  },
  tagChip: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 4,
    marginBottom: 2,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
  },
  youtubeBtn: {
    backgroundColor: '#ef4444',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 4,
    alignItems: 'center',
  },
  youtubeBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
}); 