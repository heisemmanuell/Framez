import React, {ReactNode, useEffect, JSXElementConstructor} from 'react'
import { router, Stack, useRouter } from 'expo-router'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { getUserData } from '@/services/userService'

const _layout: React.FC = () => {
  return(
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

const MainLayout: React.FC = () => {
  // const auth = useAuth();
  // const setAuth = auth?.setAuth;
  // const setUserData = auth?.setAuth;
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      // console.log('session user:', session?.user?.id);

      if(session){
        setAuth(session?.user);
        updateUserData(session?.user, session?.user.email);
        router.replace('/home');
      }else{
        setAuth(null);
        router.replace('/welcome');
      }
    });
  }, []);

  interface User {
    id: string;
    email?: string | null;
    [key: string]: any;
  }

  interface UserDataResponse<T = Record<string, any>> {
    success: boolean;
    data?: T;
    error?: any;
  }

  const updateUserData = async (user: User | null | undefined, email?: string | null): Promise<void> => {
    const res: UserDataResponse = await getUserData(user?.id);
    if (res.success && res.data) setUserData({ ...res.data, email });
  }

  return (
    <Stack 
      screenOptions={{
        headerShown: false
      }}
    />
  )
}

export default _layout