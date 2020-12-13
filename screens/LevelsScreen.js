import React, { useState, useRef } from 'react'
import { Animated, Image, Text, View, SafeAreaView, Dimensions,
  ScrollView, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { levelsconstants } from '../constants/levelsconstants'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import StarsLevels from '../components/StarsLevels'
import Settings from '../components/Settings'
import SettingsModal from '../components/SettingsModal'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LevelsScreen({ navigation }) {
  const [ animation, setAnimation ] = useState(new Animated.Value(0))
  const [ animationCTRL, setAnimationCTRL ] = useState(0)
  const [ settingsVisibility, setSettingsVisibility ] = useState(true)
  const [ settingsModalVisible, setSettingsModalVisible ] = useState(false)
  const scaleInterpolate = animation.interpolate(
    {
      inputRange: [0,1],
      outputRange: [1,50]
    }
  )
  const insets = useSafeAreaInsets()
  const sizeOfSI = (windowWidth*8/3)//Tamam
  const animationDuration = 1000
  const topOfSI = useRef(new Animated.Value((-(sizeOfSI-30)/2)+10)).current
  const leftOfSI = useRef(new Animated.Value((-(sizeOfSI-30)/2)+windowWidth-40)).current
  const scaleOfSI = useRef(new Animated.Value(30/sizeOfSI)).current
  const spinValue = useRef(new Animated.Value(0)).current
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  })

  function onShow () {
    Animated.timing(leftOfSI,{
      toValue: (windowWidth-sizeOfSI)/2,
      duration: animationDuration,
      useNativeDriver: true
    }).start()
    Animated.timing(topOfSI,{
        toValue: ((windowHeight-insets.top-insets.bottom)-sizeOfSI-10)/2,
        duration: animationDuration,
        useNativeDriver: true
    }).start()
    Animated.timing(scaleOfSI,{
        toValue: (windowWidth*0.8)/(sizeOfSI*0.3),
        duration: animationDuration,
        useNativeDriver: true
    }).start()
    Animated.timing(spinValue,{
        toValue:1,
        duration:animationDuration,
        useNativeDriver:true
    }).start(({}) => {
      setSettingsModalVisible(true)
    })
  }

  function onHide () {
    setSettingsModalVisible(false)
    Animated.timing(leftOfSI,{
      toValue: (-(sizeOfSI-30)/2)+windowWidth-40,
      duration: animationDuration,
      useNativeDriver: true
    }).start()
    Animated.timing(topOfSI,{
        toValue: (-(sizeOfSI-30)/2)+10,
        duration: animationDuration,
        useNativeDriver: true
    }).start()
    Animated.timing(scaleOfSI,{
        toValue: 30/sizeOfSI,
        duration: animationDuration,
        useNativeDriver: true
    }).start()
    Animated.timing(spinValue,{
        toValue:0,
        duration:animationDuration,
        useNativeDriver:true
    }).start()
  }

  return (
    <React.Fragment>
      <SafeAreaView
        style={styles.topsafe}
      >
      </SafeAreaView>
      <SafeAreaView
        style={styles.mainsafe}
      >
        <View
          style={styles.mainview}
        >
          <Settings 
            settingsVisibility={settingsVisibility}
            sizeOfSI={sizeOfSI}
            leftOfSI={leftOfSI}
            topOfSI={topOfSI}
            scaleOfSI={scaleOfSI}
            spin={spin}
            animationDuration={animationDuration}
            onShow={onShow}
          />
          <SettingsModal
            visible={settingsModalVisible}
            backDrop={setSettingsModalVisible}
            onHide={onHide}
          />
          <Animatable.View
            animation={{
              0: {
                scale:70,
                zIndex:9,
              },
              0.9: {
                scale:2.5,
                zIndex:2.5,
              },
              1: {
                scale:1,
                zIndex:0,
              },
            }}
            duration={2000}
            style={styles.animatableview1}
          />
          <View
            style={styles.view1}
          >
            <Text
              style={styles.levelstext}
            >
              LEVELS
            </Text>
          </View>
          <Animatable.View
            animation={'bounceInUp'}
            duration={1000}
            delay={2000}
            style={styles.mainview}
          >
            <ScrollView
              style={styles.scrollview}
              bounces={false}
              contentContainerStyle=
              {styles.scrollviewcontainer}
            >
              {
                levelsconstants.map(levelsitem => {
                  return (
                    <TouchableWithoutFeedback
                      key={levelsitem.levelnumber}
                      onPress={
                      () => 
                        {
                          if(levelsitem.isWon === true || levelsitem.currentLevel === true)
                          {
                            setAnimationCTRL(levelsitem.levelnumber)
                            Animated.timing(animation,{
                              toValue: 1,
                              duration: 1500,
                              useNativeDriver: true
                            }).start()
                            setTimeout(() => { navigation.push('Level',
                            {levelData: levelsitem}) }, 1500)
                            setSettingsVisibility(false)
                          }
                          else
                          {
                            alert(levelsitem.goToScreen + " is locked!")
                          }
                        }
                      }
                    >
                      <Animatable.View
                        animation=
                        {
                          (
                            levelsitem.currentLevel === true
                            ?
                            'pulse'
                            :
                            null
                          )
                        }
                        duration={900}
                        delay={3000}
                        iterationDelay={100}
                        iterationCount="infinite"
                        style={[styles.animatableview2,{
                          backgroundColor:
                          (
                            levelsitem.isWon === true
                            ?
                            '#6FE500'
                            :
                            levelsitem.currentLevel === true
                            ?
                            'white'
                            :
                            'grey'
                          ),
                          zIndex:
                          (
                            animationCTRL === levelsitem.levelnumber
                            ?
                            11
                            :
                            3
                          ),
                        }]}
                      >
                        <View
                          style={[styles.view2,{
                            borderStyle:
                            (
                              levelsitem.isWon === true
                              ?
                              'solid'
                              :
                              'dashed'
                            ),
                          }]}
                        >
                          <Text
                            style={[styles.text1,{
                              opacity:
                              (
                                levelsitem.isWon === true
                                ?
                                1
                                :
                                levelsitem.currentLevel === true
                                ?
                                1
                                :
                                0.8
                              ),
                            }]}
                          >
                            {levelsitem.levelnumber}
                          </Text>
                          {
                            levelsitem.isWon === false && 
                            levelsitem.currentLevel === false
                          ?
                            <Image
                              source={
                                require('../Icons/lockedicon.png')
                              }
                              style={styles.image1}
                            />
                          :
                            levelsitem.isWon === true && 
                            animationCTRL === 0
                          ?
                            <StarsLevels 
                              stars={levelsitem.stars}
                            />
                          :
                            null
                          }
                        </View>
                        {
                          (animationCTRL === levelsitem.levelnumber)
                        ?
                          <Animated.View
                            style={[styles.animatedview1,{
                              backgroundColor:
                              (
                                levelsitem.isWon === true
                                ?
                                '#6FE500'
                                :
                                levelsitem.currentLevel === true
                                ?
                                'white'
                                :
                                'grey'
                              ),
                              transform:[
                                {
                                  scale: scaleInterpolate,
                                }
                              ],
                            }]}
                          >
                            <View
                              style={[styles.view3,{
                                borderStyle:
                                (
                                  levelsitem.isWon === true
                                  ?
                                  'solid'
                                  :
                                  'dashed'
                                ),
                              }]}
                            >
                            </View>
                          </Animated.View>
                        :
                          null
                        }
                      </Animatable.View>
                    </TouchableWithoutFeedback>
                  )
                })
              }
            </ScrollView>
          </Animatable.View>
        </View>
      </SafeAreaView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  topsafe: {
    flex:0,
    backgroundColor:'#FFB900',
  },
  mainsafe: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    overflow:'visible',
  },
  mainview: {
    flex:1,
  },
  animatableview1: {
    justifyContent:'center',
    alignItems:'center',
    height:50,
    width:Dimensions.get('window').width,
    backgroundColor:'#FFB900',
    borderBottomWidth:3,
    borderColor:'white',
    zIndex:0,
  },
  view1: {
    position:'absolute',
    top:0,
    justifyContent:'center',
    alignItems:'center',
    height:50,
    width:Dimensions.get('window').width,
    zIndex:0,
  },
  levelstext: {
    textAlign:'center',
    fontSize:24,
    fontWeight:'bold',
  },
  scrollview: {
    flex:1,
    overflow:'visible',
  },
  scrollviewcontainer: {
    width:'100%',
    height:'100%',
    flexDirection:'row',
    paddingRight:Dimensions.get('window').width*(0.02),
    paddingBottom:Dimensions.get('window').width*(0.02),
    flexWrap:'wrap',
    zIndex:1,
  },
  animatableview2: {
    width:Dimensions.get('window').width*(0.225),
    height:Dimensions.get('window').width*(0.225),
    marginLeft:Dimensions.get('window').width*(0.02),
    marginTop:Dimensions.get('window').width*(0.02),
    borderRadius:15,
    padding:5,
  },
  view2: {
    flex:1,
    borderRadius:10,
    borderWidth:3,
    justifyContent:'center',
    alignItems:'center',
  },
  text1: {
    fontSize:20,
    fontWeight:'bold',
  },
  image1: {
    position:'absolute',
    width:'100%',
    height:'100%',
    opacity:0.6,
  },
  animatedview1: {
    width:Dimensions.get('window').width*(0.225),
    height:Dimensions.get('window').width*(0.225),
    borderRadius:15,
    padding:5,
  },
  view3: {
    flex:1,
    borderRadius:10,
    borderWidth:3,
    justifyContent:'center',
    alignItems:'center',
  }
})