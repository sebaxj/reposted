import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { horizontalScale, moderateScale, scaleFont, verticalScale } from '../utils/scale.utility';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: horizontalScale(8),
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    gap: horizontalScale(8),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(8),
    borderRadius: moderateScale(10),
    backgroundColor: '#DDDDE4',
  },
  searchTextInput: {
    flex: 1,
    color: '#2E2C2F',
    fontSize: scaleFont(15),
  },
  exitButton: {
    position: 'absolute',
    backgroundColor: '#F8F8FF',
    borderRadius: scaleFont(8),
    right: horizontalScale(8),
    zIndex: 1,
    alignSelf: 'center',
  },
  cancelText: {
    fontSize: scaleFont(14),
    color: '#5E5CE6',
  },
});

interface SearchBarProps {
  placeholder: string;
  value: string;
  onValueChange: (value: string) => void;
  onClear: () => void;
  onCancel?: () => void;
}

export default function SearchBar(props: SearchBarProps): JSX.Element {
  const { value, onValueChange, placeholder, onClear, onCancel } = props;

  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchTextInput}
          maxLength={40}
          placeholder={placeholder}
          placeholderTextColor="#7C7C83"
          onChangeText={onValueChange}
          value={value}
        />
      </View>
      {onCancel && (
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
