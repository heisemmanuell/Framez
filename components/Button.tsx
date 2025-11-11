import {  StyleSheet, Text, View, Pressable, StyleProp, ViewStyle, TextStyle } from 'react-native'
import React from 'react'
import { theme } from '@/constants/theme';
import { hp } from '@/helpers/common';
import Loading from './Loading';

type ButtonProps = {
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  title?: string;
  onPress?: () => void;
  loading?: boolean;
  hasShadow?: boolean;
};

const Button = ({
  buttonStyle,
  textStyle,
  title = '',
  onPress = ()=>{},
  loading = false,
  hasShadow = true,
}: ButtonProps) => {

  const shadowStyle = {
    shadowColor: theme.colors.dark,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  };

  if (loading) {
    return (
      <View style={[styles.button, buttonStyle, {backgroundColor: 'white'}]}>
        <Loading />
      </View>
    );
  }

  return (
    <Pressable onPress={onPress} style={[styles.button, buttonStyle, hasShadow && shadowStyle]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: hp(6.7),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.radius.xl,
    borderCurve: 'continuous',
  },
  text: {
    fontSize: hp(2),
    color: 'white',
    fontWeight: theme.fonts.bold,
  },
});