import React from 'react';
import { View, Switch, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = () => {
  const { theme, updateTheme } = useTheme();
  const accentColors = ['#4CAF50', '#2196F3', '#9C27B0', '#FF9800'];

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View style={styles.settingItem}>
        <Text style={[styles.label, {color: theme.colors.text}]}>Dark Mode</Text>
        <Switch
          value={theme.mode === 'dark'}
          onValueChange={val => updateTheme({ mode: val ? 'dark' : 'light' })}
          trackColor={{ true: theme.accent, false: '#767577' }}
          accessibilityLabel="Toggle dark mode"
        />
      </View>

      <Text style={[styles.sectionHeader, {color: theme.colors.text}]}>Accent Color</Text>
      <View style={styles.colorGrid}>
        {accentColors.map(color => (
          <TouchableOpacity
            key={color}
            style={[styles.colorButton, {backgroundColor: color, borderWidth: theme.accent === color ? 3 : 0, borderColor: '#333'}]}
            onPress={() => updateTheme({ accent: color })}
            accessibilityLabel={`Select ${color} as accent color`}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  settingItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 15 },
  label: { fontSize: 16 },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 25, marginBottom: 15 },
  colorGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 15 },
  colorButton: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
});

export default SettingsScreen;