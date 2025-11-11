import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { wp, hp } from '../helpers/common';
import { StatusBar  } from 'expo-status-bar';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '@/constants/theme';
import Button from '@/components/Button';
import { useRouter } from 'expo-router';

const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        <Image style={styles.welcomeImage} source={require('../assets/images/welcome.png')} />

        <View style={{gap:20}}>
          <Text style={styles.title}>Framez</Text>
          <Text style={styles.punchLine}>Welcome to Framez App, where every thought and image finds expression</Text>
        </View>

        <View style={styles.footer}>
          <Button 
            title="Get Started"
            buttonStyle={{marginHorizontal: wp(3)}}
            onPress={() => router.push('/signUp')}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Pressable onPress={() => router.push('/login')}>
              <Text style={[styles.loginText, {color: theme.colors.PrimaryDark, fontWeight: theme.fonts.semibold}]}>Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingHorizontal: wp(4),
  },

  welcomeImage: {
    width: wp(100),
    height: hp(30),
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  title: {
    fontSize: hp(4),
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold,  
    color: theme.colors.text,
  },
  punchLine: {
    fontSize: hp(1.7),
    paddingHorizontal: wp(10),
    textAlign: 'center',
    color: theme.colors.text,
  },
  footer: {
    width: '100%',
    gap: 30,
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5
  },
  loginText: {
    textAlign: 'center',
    fontSize: hp(1.6),
    color: theme.colors.text,
  }
})