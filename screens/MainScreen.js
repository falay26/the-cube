import React, { useState, useEffect } from 'react';
import { Animated, Text, View, SafeAreaView, TouchableWithoutFeedback, 
  StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function MainScreen({ navigation }) {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const scaleInterpolate = animation.interpolate(
    {
      inputRange: [0,1],
      outputRange: [1,50]
    }
  )

  useEffect(() => {
    Animated.timing(animation,{
      toValue: 1,
      duration: 1000,
      delay:2000,
      useNativeDriver: true
    }).start()
    setTimeout(() => { navigation.navigate('Levels') }, 2500) 
  })

  return (
    <SafeAreaView 
      style={styles.container}
    >
      <View
        style={styles.mainview}
      >
        <Text
          style={styles.nametext}
        >
          The Cube
        </Text>
        <View 
          style={styles.view1}
        >
          <Animatable.View
            animation={
              'bounceInUp'
            }
            duration={1000}
            delay={200}
            style={styles.animatableview1}
          >
            <Animatable.View
              animation={'pulse'}
              duration={700}
              delay={1200}
              iterationDelay={100}
              iterationCount="infinite"
            >
              <TouchableWithoutFeedback>
                <View
                  style={styles.view2}
                >
                  <Animated.View
                    style={[styles.animatedview1,
                    {
                      zIndex:scaleInterpolate,
                      transform:[
                        {
                          scale: scaleInterpolate,
                        }
                      ],
                    }]}
                  >
                  </Animated.View>
                  <Text
                    style={styles.text1}
                  >
                    PLAY
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Animatable.View>
          </Animatable.View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  mainview: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  nametext: {
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold',
    color:'black',
  },
  view1: {
    width:'100%',
    height:'auto',
    paddingTop:60,
    justifyContent:'center',
    alignItems:'center',
  },
  animatableview1: {
    marginTop:10,
    height:50,
    width:'auto',
    borderRadius:10,
  },
  view2: {
    justifyContent:'center',
    alignItems:'center',
    height:50,
    width:'auto',
    backgroundColor:'#FFB900',
    borderWidth:3,
    borderColor:'white',
    borderRadius:10,
  },
  animatedview1: {
    position:'absolute',
    height:50,
    width:'100%',
    backgroundColor:'#FFB900',
    borderWidth:3,
    borderColor:'white',
    borderRadius:10,
  },
  text1: {
    textAlign:'center',
    fontSize:24,
    fontWeight:'bold',
    marginLeft:20,
    marginRight:20,
    zIndex:2,
    color:'#FFB900',
  }
})