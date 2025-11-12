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
import { supabase } from '@/lib/supabase'

const login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async () => {
    if(!emailRef.current || !passwordRef.current) {
      Alert.alert('Login', "Please fill all the fields");
      return;
    }

    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    console.log('error:', error);
    if(error) {
      Alert.alert('Login', error.message);
    }
  }

  return (
    <ScreenWrapper bg='white'>
      <StatusBar style='dark'/>
      <View style={styles.container}>
        <BackButton router={router}/>

        <View>
          <Text style={styles.welcomeText}>Hello,</Text>
          <Text style={styles.welcomeText}>Welcome Back</Text>
        </View>

        <View style={styles.form}>
          <Text style={{fontSize: hp(2), color: theme.colors.text}}>Login to continue</Text>
        </View>
        <Input 
          icon={<Icon name='mail' size={26} strokeWidth={1.6} />}
          placeholder='Enter your email'
          onChangeText={(value: string) => emailRef.current = value}
        />
        <Input 
          icon={<Icon name='lock' size={26} strokeWidth={1.6} />}
          placeholder='Enter your password'
          secureTextEntry
          onChangeText={(value: string) => passwordRef.current = value}
        />
        <Text style={styles.forgotPassword}>
          Forgot Password?
        </Text>

        <Button title={'Login'} loading={loading} onPress={onSubmit} />

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable onPress={() => router.push('/signUp')}>
            <Text style={[styles.footerText, {color: theme.colors.PrimaryDark, fontWeight: theme.fonts.semibold}]}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1.5,
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
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.7)
  }
})