import React from 'react'
import { Animated, TouchableWithoutFeedback } from 'react-native'

import Settingsicon from '../Icons/settingsicon'

export default function Block ({ sizeOfSI, settingsVisibility, leftOfSI, topOfSI, scaleOfSI, 
    spin, onShow }) {
    return (
    <TouchableWithoutFeedback
        style={{
            flex:1,
        }}
        onPress={() => {
            onShow()
        }}
    >
        <Animated.View
            style={{
                position:'absolute',
                height:sizeOfSI,
                width:sizeOfSI,
                zIndex:2,
                opacity:
                (
                    settingsVisibility ? 1 : 0
                ),
                transform:[
                    {translateX : leftOfSI},
                    {translateY : topOfSI},
                    {scale: scaleOfSI},
                    {rotate: spin}
                ]
            }}
        >
            <Settingsicon />
        </Animated.View>
    </TouchableWithoutFeedback>
    )
}