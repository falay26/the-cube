import * as React from 'react'
import { View, Image, Text } from 'react-native'
import Modal from 'react-native-modal'
import * as Animatable from 'react-native-animatable'

import Button1 from './Button1'

export default function FinishModal ({ visible, finishText, nextLevelPassed, 
  onPress1, onPress2, animationControl, animationControlChange, starCount, 
  numberOfLevels, currentLevel }) {
    const starAnimationDuration = 1000
    const firstStarAnimationDelay = 300
  return (
    <Modal
    isVisible={visible}
    animationIn="zoomInDown"
    animationOut="slideOutRight"
    animationInTiming={500}
    style={{
      justifyContent:'center',
      alignItems:'center'
    }}
    >
      <View
      style={{
        width:'80%',
        padding:15,
        backgroundColor:'#d3d3d3',
        borderRadius:12,
      }}>
        <View
        style={{
          width:'100%',
          justifyContent:'space-between',
          flexDirection:'row'
        }}>
          <Image
          style={{
            width:'30%',
            aspectRatio:1,
          }}
          source={require('../Icons/star-outside.png')}
          />
          <Image
          style={{
            width:'30%',
            aspectRatio:1,
          }}
          source={require('../Icons/star-outside.png')}
          />
          <Image
          style={{
            width:'30%',
            aspectRatio:1,
          }}
          source={require('../Icons/star-outside.png')}
          />
        </View>
        <View
        style={{
          width:'100%',
          justifyContent:'space-between',
          flexDirection:'row',
          position:'absolute',
          top:15,
          left:15
        }}>
          <Animatable.Image
          animation={{
            0: {
              scale:0
            },
            0.8: {
              scale:1.4
            },
            1: {
              scale:1
            },
          }}
          duration={starAnimationDuration}
          delay={firstStarAnimationDelay}
          style={{
            width:'30%',
            aspectRatio:1,
            opacity:
            (
              starCount >= 1
              ?
              1
              :
              0
            )
          }}
          source={require('../Icons/star-inside.png')}
          />
          <Animatable.Image
          animation={{
            0: {
              scale:0
            },
            0.8: {
              scale:1.4
            },
            1: {
              scale:1
            },
          }}
          duration={starAnimationDuration}
          delay={firstStarAnimationDelay+starAnimationDuration}
          style={{
            width:'30%',
            aspectRatio:1,
            opacity:
            (
              starCount >= 2
              ?
              1
              :
              0
            )
          }}
          source={require('../Icons/star-inside.png')}
          />
          <Animatable.Image
          animation={{
            0: {
              scale:0
            },
            0.8: {
              scale:1.4
            },
            1: {
              scale:1
            },
          }}
          duration={starAnimationDuration}
          delay={firstStarAnimationDelay+starAnimationDuration*2}
          style={{
            width:'30%',
            aspectRatio:1,
            opacity:
            (
              starCount >= 3
              ?
              1
              :
              0
            )
          }}
          source={require('../Icons/star-inside.png')}
          />
        </View>
        <Animatable.View
        animation={"fadeInRight"}
        delay={firstStarAnimationDelay+starAnimationDuration*starCount}
        style={{
          paddingHorizontal:40,
          justifyContent:'center',
          paddingVertical:40,
        }}>
          <Text
          style={{
            textAlign:'center',
            color:'black',
            fontSize:24,
            fontWeight:'bold'
          }}>
            {finishText}
          </Text>
        </Animatable.View>
        <Animatable.View
        animation={"fadeInLeft"}
        delay={firstStarAnimationDelay+starAnimationDuration*starCount}
        style={{
          width:'100%',
          justifyContent:'space-around',
          flexDirection:'row'
        }}>
          <Button1 
            text={"Levels"}
            onPress={onPress1}
            animationControlChange={animationControlChange}
          />
          {
            ( numberOfLevels > currentLevel )
            ?
            <Button1 
              text={"Next"}
              nextLevelPassed={nextLevelPassed}
              onPress={onPress2}
              animationControl={animationControl}
              animationControlChange={ () => {  } }
            />
            :
            null
          }
        </Animatable.View>
      </View>
    </Modal>
  )
}