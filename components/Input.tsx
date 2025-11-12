import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { theme } from '@/constants/theme'
import { hp } from '@/helpers/common'

interface InputProps {
  containerStyles?: object;
  icon?: React.ReactNode;
  inputRef?: React.Ref<TextInput>;
  placeholder?: string;
  [key: string]: any; // For any additional props
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
      {
        props.icon && props.icon
      }
      <TextInput 
        style={{flex: 1}}
        placeholderTextColor={theme.colors.textLight}
        ref={props.inputRef}
        {...props}
      />
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    height: hp(7.2),
    alignItems: 'center',
    justifyContent:'center',
    borderWidth: 0.4,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xl,
    paddingHorizontal: 18,
    borderCurve: 'continuous',
    gap: 12,
  }
})