import { View, Text } from 'react-native'
import React, {ReactNode} from 'react'
import AppColors from '../../utils/AppColors'

type BgProps = {
    children: ReactNode,
    stylesPorp?: any
}

const BackgroundScreen = ({children,stylesPorp}: BgProps) => {
  return (
    <View style={[stylesPorp,{flex:1, backgroundColor:AppColors.BGCOLOURS, padding:20}]}>
        {children}
    </View>
  )
}

export default BackgroundScreen