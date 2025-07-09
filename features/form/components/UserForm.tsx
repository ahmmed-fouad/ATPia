import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Platform, Switch } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useFormStore } from '../stores/formStore';
import type { UserFormFields } from '../types/index';
import DropDownPicker from 'react-native-dropdown-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const mealOptions = ['Pizza', 'Burger', 'Pasta', 'Other'];
const commonMealOptions = ['Rice', 'Chicken', 'Fish', 'Other'];
const fruitOptions = ['Apple', 'Banana', 'Orange', 'Other'];
const vegetableOptions = ['Carrot', 'Broccoli', 'Spinach', 'Other'];
const sportOptions = ['Running', 'Swimming', 'Cycling', 'Other'];
const pregnancyMonths = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  age: Yup.string().required('Age is required'),
  gender: Yup.string().oneOf(['male', 'female', '']).required('Gender is required'),
  length: Yup.string().required('Length is required'),
  weight: Yup.string().required('Weight is required'),
  waterPerDay: Yup.string().required('Water per day is required'),
});

export default function UserForm() {
  const { userForm, setUserForm } = useFormStore();

  // Local state for each dropdown
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(userForm.gender);
  const [pregnancyMonthOpen, setPregnancyMonthOpen] = useState(false);
  const [pregnancyMonthValue, setPregnancyMonthValue] = useState(userForm.pregnancyMonth);
  const [favoriteMealOpen, setFavoriteMealOpen] = useState(false);
  const [favoriteMealValue, setFavoriteMealValue] = useState(userForm.favoriteMeal);
  const [commonMealsOpen, setCommonMealsOpen] = useState(false);
  const [commonMealsValue, setCommonMealsValue] = useState(userForm.commonMeals);
  const [favoriteFruitOpen, setFavoriteFruitOpen] = useState(false);
  const [favoriteFruitValue, setFavoriteFruitValue] = useState(userForm.favoriteFruit);
  const [favoriteVegetablesOpen, setFavoriteVegetablesOpen] = useState(false);
  const [favoriteVegetablesValue, setFavoriteVegetablesValue] = useState(userForm.favoriteVegetables);
  const [favoriteSportOpen, setFavoriteSportOpen] = useState(false);
  const [favoriteSportValue, setFavoriteSportValue] = useState(userForm.favoriteSport);

  // Sync local dropdown value with Formik initialValues
  useEffect(() => { setGenderValue(userForm.gender); }, [userForm.gender]);
  useEffect(() => { setPregnancyMonthValue(userForm.pregnancyMonth); }, [userForm.pregnancyMonth]);
  useEffect(() => { setFavoriteMealValue(userForm.favoriteMeal); }, [userForm.favoriteMeal]);
  useEffect(() => { setCommonMealsValue(userForm.commonMeals); }, [userForm.commonMeals]);
  useEffect(() => { setFavoriteFruitValue(userForm.favoriteFruit); }, [userForm.favoriteFruit]);
  useEffect(() => { setFavoriteVegetablesValue(userForm.favoriteVegetables); }, [userForm.favoriteVegetables]);
  useEffect(() => { setFavoriteSportValue(userForm.favoriteSport); }, [userForm.favoriteSport]);

  // Dropdown items
  const genderItems = [
    { label: 'Select', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];
  const pregnancyMonthItems = [
    { label: 'Select', value: '' },
    ...pregnancyMonths.map(m => ({ label: m, value: m })),
  ];
  const mealItems = [
    { label: 'Select', value: '' },
    ...mealOptions.map(m => ({ label: m, value: m })),
  ];
  const commonMealItems = [
    { label: 'Select', value: '' },
    ...commonMealOptions.map(m => ({ label: m, value: m })),
  ];
  const fruitItems = [
    { label: 'Select', value: '' },
    ...fruitOptions.map(m => ({ label: m, value: m })),
  ];
  const vegetableItems = [
    { label: 'Select', value: '' },
    ...vegetableOptions.map(m => ({ label: m, value: m })),
  ];
  const sportItems = [
    { label: 'Select', value: '' },
    ...sportOptions.map(m => ({ label: m, value: m })),
  ];

  return (
    <Formik
      initialValues={userForm}
      validationSchema={validationSchema}
      onSubmit={setUserForm}
      enableReinitialize
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <KeyboardAwareScrollView contentContainerStyle={{ alignItems: 'center', padding: 20 }} style={{ width: '100%' }}>
          <View style={{ width: '100%', maxWidth: 420, backgroundColor: 'rgba(255,255,255,0.98)', borderRadius: 18, padding: 20, shadowColor: '#60a5fa', shadowOffset: { width: 0, height: 4 }, shadowOpacity: Platform.OS === 'ios' ? 0.10 : 0.13, shadowRadius: 10, elevation: 4 }}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#2563eb', marginBottom: 16 }}>User Form</Text>
            {/* Name */}
            <FormField label="Name *" error={errors.name} touched={touched.name}>
              <View style={{ width: '100%' }}>
                <TextInput
                  style={inputStyle(!!errors.name && !!touched.name)}
                  placeholder="Enter your name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
              </View>
            </FormField>
            {/* Age */}
            <FormField label="Age *" error={errors.age} touched={touched.age}>
              <View style={{ width: '100%' }}>
                <TextInput
                  style={inputStyle(!!errors.age && !!touched.age)}
                  placeholder="Enter your age"
                  keyboardType="numeric"
                  onChangeText={handleChange('age')}
                  onBlur={handleBlur('age')}
                  value={values.age}
                />
              </View>
            </FormField>
            {/* Gender */}
            <FormField label="Gender *" error={errors.gender} touched={touched.gender}>
              <DropDownPicker
                open={genderOpen}
                setOpen={setGenderOpen}
                value={genderValue}
                setValue={setGenderValue}
                items={genderItems}
                onChangeValue={val => setFieldValue('gender', val)}
                style={dropdownStyle(!!errors.gender && !!touched.gender)}
                dropDownContainerStyle={dropdownContainerStyle}
                listItemLabelStyle={{ fontSize: 15 }}
                textStyle={{ fontSize: 15 }}
                placeholder="Select"
                zIndex={1000}
              />
            </FormField>
            {/* Pregnant (only if female) */}
            {values.gender === 'female' && (
              <FormField label="Pregnant?">
                <Switch
                  value={!!values.pregnant}
                  onValueChange={val => { setFieldValue('pregnant', val); }}
                  style={{ marginVertical: 4 }}
                />
              </FormField>
            )}
            {/* Pregnancy Month (only if pregnant) */}
            {values.gender === 'female' && values.pregnant && (
              <FormField label="Pregnancy Month *">
                <DropDownPicker
                  open={pregnancyMonthOpen}
                  setOpen={setPregnancyMonthOpen}
                  value={pregnancyMonthValue}
                  setValue={setPregnancyMonthValue}
                  items={pregnancyMonthItems}
                  onChangeValue={val => setFieldValue('pregnancyMonth', val)}
                  style={dropdownStyle()}
                  dropDownContainerStyle={dropdownContainerStyle}
                  listItemLabelStyle={{ fontSize: 15 }}
                  textStyle={{ fontSize: 15 }}
                  placeholder="Select"
                  zIndex={900}
                />
              </FormField>
            )}
            {/* Length */}
            <FormField label="Length (cm) *" error={errors.length} touched={touched.length}>
              <View style={{ width: '100%' }}>
                <TextInput
                  style={inputStyle(!!errors.length && !!touched.length)}
                  placeholder="Enter your height in cm"
                  keyboardType="numeric"
                  onChangeText={handleChange('length')}
                  onBlur={handleBlur('length')}
                  value={values.length}
                />
              </View>
            </FormField>
            {/* Weight */}
            <FormField label="Weight (kg) *" error={errors.weight} touched={touched.weight}>
              <View style={{ width: '100%' }}>
                <TextInput
                  style={inputStyle(!!errors.weight && !!touched.weight)}
                  placeholder="Enter your weight in kg"
                  keyboardType="numeric"
                  onChangeText={handleChange('weight')}
                  onBlur={handleBlur('weight')}
                  value={values.weight}
                />
              </View>
            </FormField>
            {/* Water per day */}
            <FormField label="Water drunk per day (L) *" error={errors.waterPerDay} touched={touched.waterPerDay}>
              <View style={{ width: '100%' }}>
                <TextInput
                  style={inputStyle(!!errors.waterPerDay && !!touched.waterPerDay)}
                  placeholder="How much water do you drink per day?"
                  keyboardType="numeric"
                  onChangeText={handleChange('waterPerDay')}
                  onBlur={handleBlur('waterPerDay')}
                  value={values.waterPerDay}
                />
              </View>
            </FormField>
            {/* Meals per day */}
            <FormField label="Number of meals per day (optional)">
              <View style={{ width: '100%' }}>
                <TextInput
                  style={inputStyle()}
                  placeholder="e.g. 3"
                  keyboardType="numeric"
                  onChangeText={handleChange('mealsPerDay')}
                  onBlur={handleBlur('mealsPerDay')}
                  value={values.mealsPerDay}
                />
              </View>
            </FormField>
            {/* Favorite meal */}
            <FormField label="Favorite meal (optional)">
              <DropDownPicker
                open={favoriteMealOpen}
                setOpen={setFavoriteMealOpen}
                value={favoriteMealValue}
                setValue={setFavoriteMealValue}
                items={mealItems}
                onChangeValue={val => setFieldValue('favoriteMeal', val)}
                style={dropdownStyle()}
                dropDownContainerStyle={dropdownContainerStyle}
                listItemLabelStyle={{ fontSize: 15 }}
                textStyle={{ fontSize: 15 }}
                placeholder="Select"
                zIndex={800}
              />
              {values.favoriteMeal === 'Other' && (
                <View style={{ width: '100%' }}>
                  <TextInput
                    style={inputStyle()}
                    placeholder="Please specify"
                    onChangeText={handleChange('favoriteMealOther')}
                    onBlur={handleBlur('favoriteMealOther')}
                    value={values.favoriteMealOther}
                  />
                </View>
              )}
            </FormField>
            {/* Common meals */}
            <FormField label="Common meals (optional)">
              <DropDownPicker
                open={commonMealsOpen}
                setOpen={setCommonMealsOpen}
                value={commonMealsValue}
                setValue={setCommonMealsValue}
                items={commonMealItems}
                onChangeValue={val => setFieldValue('commonMeals', val)}
                style={dropdownStyle()}
                dropDownContainerStyle={dropdownContainerStyle}
                listItemLabelStyle={{ fontSize: 15 }}
                textStyle={{ fontSize: 15 }}
                placeholder="Select"
                zIndex={700}
              />
              {values.commonMeals === 'Other' && (
                <View style={{ width: '100%' }}>
                  <TextInput
                    style={inputStyle()}
                    placeholder="Please specify"
                    onChangeText={handleChange('commonMealsOther')}
                    onBlur={handleBlur('commonMealsOther')}
                    value={values.commonMealsOther}
                  />
                </View>
              )}
            </FormField>
            {/* Favorite fruit */}
            <FormField label="Favorite fruit (optional)">
              <DropDownPicker
                open={favoriteFruitOpen}
                setOpen={setFavoriteFruitOpen}
                value={favoriteFruitValue}
                setValue={setFavoriteFruitValue}
                items={fruitItems}
                onChangeValue={val => setFieldValue('favoriteFruit', val)}
                style={dropdownStyle()}
                dropDownContainerStyle={dropdownContainerStyle}
                listItemLabelStyle={{ fontSize: 15 }}
                textStyle={{ fontSize: 15 }}
                placeholder="Select"
                zIndex={600}
              />
              {values.favoriteFruit === 'Other' && (
                <View style={{ width: '100%' }}>
                  <TextInput
                    style={inputStyle()}
                    placeholder="Please specify"
                    onChangeText={handleChange('favoriteFruitOther')}
                    onBlur={handleBlur('favoriteFruitOther')}
                    value={values.favoriteFruitOther}
                  />
                </View>
              )}
            </FormField>
            {/* Favorite vegetables */}
            <FormField label="Favorite vegetables (optional)">
              <DropDownPicker
                open={favoriteVegetablesOpen}
                setOpen={setFavoriteVegetablesOpen}
                value={favoriteVegetablesValue}
                setValue={setFavoriteVegetablesValue}
                items={vegetableItems}
                onChangeValue={val => setFieldValue('favoriteVegetables', val)}
                style={dropdownStyle()}
                dropDownContainerStyle={dropdownContainerStyle}
                listItemLabelStyle={{ fontSize: 15 }}
                textStyle={{ fontSize: 15 }}
                placeholder="Select"
                zIndex={500}
              />
              {values.favoriteVegetables === 'Other' && (
                <View style={{ width: '100%' }}>
                  <TextInput
                    style={inputStyle()}
                    placeholder="Please specify"
                    onChangeText={handleChange('favoriteVegetablesOther')}
                    onBlur={handleBlur('favoriteVegetablesOther')}
                    value={values.favoriteVegetablesOther}
                  />
                </View>
              )}
            </FormField>
            {/* Favorite sport */}
            <FormField label="Favorite sport (optional)">
              <DropDownPicker
                open={favoriteSportOpen}
                setOpen={setFavoriteSportOpen}
                value={favoriteSportValue}
                setValue={setFavoriteSportValue}
                items={sportItems}
                onChangeValue={val => setFieldValue('favoriteSport', val)}
                style={dropdownStyle()}
                dropDownContainerStyle={dropdownContainerStyle}
                listItemLabelStyle={{ fontSize: 15 }}
                textStyle={{ fontSize: 15 }}
                placeholder="Select"
                zIndex={400}
              />
              {values.favoriteSport === 'Other' && (
                <View style={{ width: '100%' }}>
                  <TextInput
                    style={inputStyle()}
                    placeholder="Please specify"
                    onChangeText={handleChange('favoriteSportOther')}
                    onBlur={handleBlur('favoriteSportOther')}
                    value={values.favoriteSportOther}
                  />
                </View>
              )}
            </FormField>
            {/* Exercise hours per day */}
            <FormField label="Hours of exercise per day (optional)">
              <View style={{ width: '100%' }}>
                <TextInput
                  style={inputStyle()}
                  placeholder="e.g. 1"
                  keyboardType="numeric"
                  onChangeText={handleChange('exerciseHoursPerDay')}
                  onBlur={handleBlur('exerciseHoursPerDay')}
                  value={values.exerciseHoursPerDay}
                />
              </View>
            </FormField>
            {/* Submit button */}
            <TouchableOpacity
              onPress={() => handleSubmit()}
              style={{
                backgroundColor: '#2563eb',
                borderRadius: 14,
                paddingVertical: 12,
                alignItems: 'center',
                marginTop: 8,
              }}
              activeOpacity={0.85}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Save</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      )}
    </Formik>
  );
}

function FormField({ label, children, error, touched }: { label: string; children: React.ReactNode; error?: string; touched?: boolean }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={{ fontSize: 14, color: '#222', marginBottom: 4, fontWeight: '500' }}>{label}</Text>
      {children}
      {error && touched && (
        <Text style={{ color: '#f87171', fontSize: 12, marginTop: 2 }}>{error}</Text>
      )}
    </View>
  );
}

function inputStyle(error?: boolean) {
  return {
    borderRadius: 10,
    backgroundColor: '#f3f4f6',
    padding: 10,
    fontSize: 15,
    color: '#222',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
    borderWidth: error ? 1 : 0,
    borderColor: error ? '#f87171' : 'transparent',
    marginBottom: 2,
    minHeight: 40,
  };
}

const dropdownStyle = (error?: boolean) => ({
  borderRadius: 10,
  backgroundColor: '#f3f4f6',
  borderWidth: error ? 1 : 0,
  borderColor: error ? '#f87171' : '#e5e7eb',
  minHeight: 40,
  height: 40,
});

const dropdownContainerStyle = {
  borderRadius: 10,
  backgroundColor: '#f3f4f6',
  borderColor: '#e5e7eb',
  zIndex: 100,
}; 