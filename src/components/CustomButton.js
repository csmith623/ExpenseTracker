import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Tooltip from 'react-native-tooltip';

export default CustomButton = ({ 
  title, 
  onPress, 
  accessibilityLabel,
  tooltip 
}) => {
  const { theme } = useTheme();

  return (
    <Tooltip
      backgroundColor={theme.colors.card}
      textColor={theme.colors.text}
      label={tooltip}
    >
      <TouchableOpacity
        onPress={onPress}
        accessibilityLabel={accessibilityLabel || title}
        style={[styles.button, {backgroundColor: theme.accent}]}
      >
        <Text style={[styles.text, {color: theme.colors.text}]}>{title}</Text>
      </TouchableOpacity>
    </Tooltip>
  );
};

const styles = StyleSheet.create({
  button: { padding: 15, borderRadius: 8, marginVertical: 10 },
  text: { fontSize: 16, fontWeight: '500' },
});