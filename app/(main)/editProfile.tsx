import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { hp, wp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import { useAuth } from '@/contexts/AuthContext'
import { getUserImageSrc, uploadFile } from '@/services/imageService'
import Header from '@/components/Header'
import { Image } from 'expo-image'
import Icon from '@/assets/icons'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { updateUser } from '@/services/userService'
import { useRouter } from 'expo-router'
import * as ImagePicker from 'expo-image-picker';

const EditProfile = () => {
  const {user: currentUser, setUserData} = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [user, setUser] = useState({
    name: '',
    phoneNumber: '',
    address: '',
    bio: '',
    image: null,
  });

  useEffect(() => {
    if(currentUser){
      setUser({
        name: currentUser.name || '',
        phoneNumber: currentUser.phone_number || '',
        address: currentUser.address || '',
        bio: currentUser.bio || '',
        image: currentUser.image || null,
      });
    }
  }, [currentUser]);

  const onPickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      setUser({...user, image: result.assets[0]});
    }
  }

  const onSubmit = async () => {
    let userData = {...user};
    let{ name, phoneNumber, address, image, bio } = userData;

    if(!name.trim() || !phoneNumber.trim() || !address.trim() || !bio.trim() || !image){
      Alert.alert('Profile','Please fill all the fields');
      return;
    }
    setLoading(true);

    if(typeof image == 'object'){
      let imageRes = await uploadFile('profiles', image?.uri, true);
      if(imageRes.success) userData.image = imageRes.data;
      else userData.image = null;
    }
    // Update user profile logic here
    const res = await updateUser(currentUser?.id , userData);
    setLoading(false);

    if(res.success){
      setUserData({...currentUser, ...userData});
      router.back();
    }
  };

  let imageSource = user.image && typeof user.image == 'object'? user.image.uri : getUserImageSrc(user.image) as string | null;

  return (
    <ScreenWrapper bg="ehite">
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <Header title='Edit Profile' />

          <View style={styles.form}>
            <View style={styles.avatarContainer}>
              <Image source={imageSource} style={styles.avatar} />
              <Pressable style={styles.cameraIcon} onPress={onPickImage}>
                <Icon name='camera' size={20} strokeWidth={2.5} />
              </Pressable>
            </View>
            <Text style={{fontSize: hp(1.5), color: theme.colors.text}}>
              Please fill your profile details
            </Text>
            <Input
              icon = {<Icon name='user' />}
              placeholder='Enter your name'
              value={user.name}
              onChangeText={(value: string) => setUser({...user, name: value})}
            />
            <Input
              icon = {<Icon name='call' />}
              placeholder='Enter your Phone Number'
              value={user.phoneNumber}
              onChangeText={(value: string) => setUser({...user, phoneNumber: value})}
            />
            <Input
              icon = {<Icon name='location' />}
              placeholder='Enter your address'
              value={user.address}
              onChangeText={(value: string) => setUser({...user, address: value})}
            />
            <Input
              placeholder='Bio'
              value={user.bio}
              multiline={true}
              containerStyle={styles.bio}
              onChangeText={(value: string) => setUser({...user, bio: value})}
            />

            <Button title='Update' loading={loading} onPress={onSubmit} />
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  )
}

export default EditProfile

const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingHorizontal: wp(4),
  },
  avatar:{
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous',
    borderColor: theme.colors.darkLight,
    borderWidth: 1,
  },
   avatarContainer:{
    alignItems: 'center',
    height: hp(14),
    width: hp(14),
  },
  cameraIcon:{
    position: 'absolute',
    bottom: 0,
    right: -10,
    padding: 8,
    borderRadius: 50,
    backgroundColor:'white',
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  form:{
    gap: 18,
    marginTop: 20,
  },
  input:{
    flexDirection: 'row',
    borderWidth: 0.5,
    borderColor: theme.colors.text,
    borderRadius: theme.radius.xxl,
    borderCurve: 'continuous',
    padding: 17,
    paddingHorizontal: 20,
    gap: 15,
  },
  bio: {
    flexDirection: 'row',
    height: hp(15),
    alignItems: 'flex-start',
    paddingVertical: 15,
  },
})