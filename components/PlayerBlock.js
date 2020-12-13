import React, { useRef, useEffect } from 'react'
import { Animated } from 'react-native'

export default function PlayerBlock ({ size, x, y, moveX, moveY, durationOfX, 
    durationOfY, setIsMoving, nextByTarget, levelFinished }) {
        
    const moveXofPB = useRef(new Animated.Value(x*size)).current
    const moveYofPB = useRef(new Animated.Value(y*size)).current

    useEffect(() => {
        Animated.timing(moveXofPB,{
            toValue: moveX*size,
            duration: durationOfX,
            useNativeDriver: true
        }).start(({}) => {
            Animated.timing(moveYofPB,{
                toValue: moveY*size,
                duration: durationOfY,
                useNativeDriver: true
            }).start(({}) => {
                setIsMoving(false)
                if( nextByTarget === "F" )
                {
                    levelFinished()
                }
            })
        })
    })

    return (
        <Animated.View 
        style={{
            position:'absolute',
            width:size,
            height:size,
            backgroundColor:'#FFB900',
            borderWidth:1,
            borderColor:'black',
            transform:[
                {translateX : moveXofPB},
                {translateY : moveYofPB}
            ]
        }}
        />
    )
}