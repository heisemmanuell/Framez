import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Pressable } from 'react-native'
import Icon from '@/assets/icons'
import { theme } from '@/constants/theme'
import { useRouter } from 'expo-router'

type BackButtonProps = {
  size?: number;
};

const BackButton = ({size=26}: BackButtonProps) => {
  const router = useRouter();
  return (
    <Pressable onPress={() => router.back()} style={styles.button}>
      <Icon name='arrowLeft' strokeWidth={2.5} size={size} color={theme.colors.text} />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: theme.radius.xl,
    backgroundColor: 'rgba(0,0,0,0.07)'
  }
})