import { View, Text, LogBox } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { router, Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { getUserData } from '../services/userService';

LogBox.ignoreLogs(['Warning: TNodeChildrenRenderer','Warning: MemoizedTNodeRenderer','Warning: TRenderEngineProvider']);
const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth,setUserData } = useAuth(); // Destructure setAuth from the context
  const listenerAttached = useRef(false); // A ref to track whether the listener has been attached

  useEffect(() => {
    // Only attach the listener if it hasn't been already
    if (!listenerAttached.current) {
      supabase.auth.onAuthStateChange((_event, session) => {
        console.log('session user: ', session?.user?.id);
        if (session) {
          setAuth(session?.user);
          updateUserData(session?.user, session?.user?.email);
          
          router.replace('/home');
        } else {
          setAuth(null);
          router.replace('/welcome');
        }
      });
      listenerAttached.current = true; // Mark listener as attached
    }
  }, []);

  const updateUserData= async(user,email)=>{
    let res = await getUserData(user?.id);
    if(res.success) setUserData({...res.data,email});
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >

  <Stack.Screen
      name  = "(main)/postDetails"
      options={{
        presentation: 'modal'
      }}
      />
    </Stack>
  );
};

export default _layout;
