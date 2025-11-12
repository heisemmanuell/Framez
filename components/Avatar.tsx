import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { hp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import {Image} from 'expo-image';
import { getUserImageSrc } from '@/services/imageService';

interface AvatarProps {
  uri?: string;
  size?: number;
  rounded?: number;
  style?: any;
}

const Avatar = ({
  uri,
  size = hp(3.5),
  rounded = theme.radius.md,
  style = {}
}: AvatarProps) => {
  // normalize the source to a value acceptable by expo-image (string | number | ImageSource)
  const imageSource = getUserImageSrc(uri ?? '') as unknown as string | number | Record<string, any> | null;

  return (
    <Image 
      source={imageSource as any}
      transition={100}
      style={[styles.avatar, {height: size, width: size, borderRadius: rounded}, style]}
    />
  )
}

export default Avatar

const styles = StyleSheet.create({
  avatar:{
    borderCurve: 'continuous',
    borderColor: theme.colors.darkLight,
    borderWidth: 1
  }
})