import React, { useState } from 'react'
import { Animated, TouchableWithoutFeedback, View, Text } from 'react-native'

export default function Button1 ({ onPress, text, nextLevelPassed, animationControl, 
  animationControlChange }) {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const scaleInterpolate = animation.interpolate(
    {
      inputRange: [0,1],
      outputRange: [1,50]
    }
  )

  return (
    <TouchableWithoutFeedback
    onPress={() => {
      animationControlChange()
      Animated.timing(animation,{
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start()
      setTimeout(() => { onPress() }, 1000 )
    }}
    >
      <View
      style={{
        opacity:animationControl,
        height:50,
        width:'auto',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:12,
        borderWidth:3,
        borderColor:'white',
        backgroundColor:
        (
          nextLevelPassed === true
          ?
          '#6FE500'
          :
          nextLevelPassed === false
          ?
          'white'
          :
          '#FFB900'
        ),
        borderWidth:3,
        borderStyle:
        (
          nextLevelPassed === true
          ?
          'solid'
          :
          nextLevelPassed === false
          ?
          'dashed'
          :
          'solid'
        ),
      }}>
        {
          animationControl === 1 || animationControl === 0
          ?
          <Animated.View
          style={{
            position:'absolute',
            height:50,
            width:'120%',
            backgroundColor:
            (
              nextLevelPassed === true
              ?
              '#6FE500'
              :
              nextLevelPassed === true
              ?
              'white'
              :
              'white'
            )
            ,
            borderRadius:15,
            transform:[
              {
                scale: scaleInterpolate,
              }
            ],
            padding:3,
            zIndex:scaleInterpolate,
          }}>
            <View
              style={{
              flex:1,
              borderRadius:10,
              borderWidth:3,
              borderStyle:
              (
                nextLevelPassed === true
                ?
                'solid'
                :
                'dashed'
              ),
              justifyContent:'center',
              alignItems:'center',
            }}>
            </View>
          </Animated.View>
          :
          <Animated.View
          style={{
            height:50,
            width:'auto',
            position:'absolute',
            backgroundColor:
            (
              nextLevelPassed === true
              ?
              '#6FE500'
              :
              nextLevelPassed === false
              ?
              'white'
              :
              '#FFB900'
            ),
            justifyContent:'center',
            alignItems:'center',
            borderWidth:3,
            borderColor:'white',
            borderRadius:12,
            zIndex:scaleInterpolate,
            transform:[
              {
                scale: scaleInterpolate,
              }
            ],
            borderStyle:
            (
              nextLevelPassed === true
              ?
              'solid'
              :
              nextLevelPassed === false
              ?
              'dashed'
              :
              'solid'
            )
          }}>
            <Text
            style={{
              fontSize:24,
              fontWeight:'bold',
              margin:10,
              color:
              (
                nextLevelPassed === true
                ?
                '#6FE500'
                :
                nextLevelPassed === false
                ?
                'white'
                :
                '#FFB900'
              ),
            }}>
              {text}
            </Text>
          </Animated.View>
        }
        <Text
        style={{
          fontSize:20,
          margin:10,
          fontWeight:'bold',
          zIndex:2
        }}>
          {text}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}