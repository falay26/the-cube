import React from 'react'
import { View } from 'react-native'

export default function Block ({ size, type }) {
    return (
        <View 
        style={{
            width:size,
            height:size,
            backgroundColor:
            (
                type === 'R' ?
                'black'
                :
                type === 'F' ?
                '#6FE500'
                :
                'white'
            ),
            borderWidth:1,
            borderColor:'black'
        }}
        />
    )
}