import React, {ReactNode} from 'react'
import { View, Text } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

type ScreenWrapperProps = {
  children: ReactNode;
  bg?: string;
};

const ScreenWrapper = ({children, bg}: ScreenWrapperProps) => {
  const {top} = useSafeAreaInsets();
  const paddingTop = top>0 ? top+5 : 30;

  return (
    <View style={{flex: 1, backgroundColor: bg ? bg : 'white', paddingTop: paddingTop}} >
      {children}
    </View>
  )
}

export default ScreenWrapper
