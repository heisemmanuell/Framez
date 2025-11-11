import { Alert, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import BackButton from '@/components/BackButton'
import { wp, hp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import Input from '@/components/Input'
import Icon from '@/assets/icons'
import Button from '@/components/Button'

const signUp = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const nameRef = useRef("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = () => {
    if(!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign Up', "Please fill all the fields");
      return;
    }
  }

  return (
    <ScreenWrapper bg='white'>
      <StatusBar style='dark'/>
      <View style={styles.container}>
        <BackButton router={router}/>

        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>

        <View style={styles.form}>
          <Text style={{fontSize: hp(2), color: theme.colors.text}}>Sign up to Framez</Text>
        </View>
        <Input 
          icon={<Icon name='user' size={26} strokeWidth={1.6} />}
          placeholder='Enter your name'
          onChangeText={value=> nameRef.current = value}
        />
        <Input 
          icon={<Icon name='mail' size={26} strokeWidth={1.6} />}
          placeholder='Enter your email'
          onChangeText={value=> emailRef.current = value}
        />
        <Input 
          icon={<Icon name='lock' size={26} strokeWidth={1.6} />}
          placeholder='Enter your password'
          secureTextEntry
          onChangeText={value => passwordRef.current = value}
        />

        <Button title={'Sign up'} loading={loading} onPress={onSubmit} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => router.push('/login')}>
            <Text style={[styles.footerText, {color: theme.colors.PrimaryDark, fontWeight: theme.fonts.semibold}]}>Log In</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default signUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 25,
    paddingHorizontal: wp(5),
  },
  welcomeText:{
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form:{
    gap: 25,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.7)
  }
})