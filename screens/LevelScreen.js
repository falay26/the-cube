import React, { useState } from 'react'
import { Text, View, SafeAreaView, Dimensions, StyleSheet } from 'react-native'
import * as Animatable from 'react-native-animatable'
import GestureRecognizer from 'react-native-swipe-gestures'

import { levelsconstants } from '../constants/levelsconstants'

import Level from '../components/Level'
import FinishModal from '../components/FinishModal'

import move from '../customFunctions/move'
import asyncSave from '../customFunctions/asyncSave'

export default function LevelScreen({ route, navigation }) {
  const { levelData } = route.params
  const xOfPlayer = levelData.leveldata.indexOf('P') % levelData.h
  const yOfPlayer = Math.floor((levelData.leveldata.indexOf('P') + 0.99) / levelData.v)
  const [moveX, setMoveX] = useState(xOfPlayer)
  const [durationOfX, setDurationOfX] = useState(0)
  const [moveY, setMoveY] = useState(yOfPlayer)
  const [durationOfY, setDurationOfY] = useState(0)
  const [isMoving, setIsMoving] = useState(false)
  const [finishModalVisible, setFinishModalVisible] = useState(false)
  const [animationControl, setAnimationControl] = useState(1)
  const [moves, setMoves] = useState(0)
  const [startTime, setStartTime] = useState(0)
  const [starCount, setStarCount] = useState(0)
  const [nextByTarget, setNextByTarget] = useState("empty")

  const speedOfPlayer = 0.01
  const nextLevelPassed = levelsconstants[levelData.levelnumber]?.isWon
  const numberOfLevels = levelsconstants.length

  function levelFinished() {
    //Check stars
    let starToBeAdded = 1
    if (moves <= levelsconstants[levelData.levelnumber - 1].movesStar) {
      starToBeAdded += 1
    }
    if ((Date.now() - startTime) <= levelsconstants[levelData.levelnumber - 1].msStar) {
      starToBeAdded += 1
    }
    setStarCount(starToBeAdded)
    setFinishModalVisible(true)
    //Change stats
    if (levelsconstants.length >= levelData.levelnumber + 1 &&
      levelsconstants[levelData.levelnumber - 1].currentLevel === true) {
      levelsconstants[levelData.levelnumber].currentLevel = true
    }
    levelsconstants[levelData.levelnumber - 1].isWon = true
    levelsconstants[levelData.levelnumber - 1].currentLevel = false
    if (starToBeAdded > levelsconstants[levelData.levelnumber - 1].stars) {
      levelsconstants[levelData.levelnumber - 1].stars = starToBeAdded
    }
    asyncSave.save(levelsconstants)
    setNextByTarget("empty")
  }

  function toMove(index) {
    if (startTime === 0) {
      setStartTime(Date.now())
    }
    if (!isMoving) {
      setMoves(moves + 1)
      setIsMoving(true)
      setDurationOfX(Math.abs(index.x / speedOfPlayer))
      setDurationOfY(Math.abs(index.y / speedOfPlayer))
      setMoveX(moveX + index.x)
      setMoveY(moveY + index.y)
      setNextByTarget(index.nbt)
    }
    else {
      console.log("Player is already moving!!")
    }
  }

  return (
    <React.Fragment>
      <GestureRecognizer
        onSwipeUp={() => move.up(moveX, moveY, levelData).then((data) => {
          toMove(data)
        })}

        onSwipeDown={() => move.down(moveX, moveY, levelData).then((data) => {
          toMove(data)
        })}

        onSwipeLeft={() => move.left(moveX, moveY, levelData).then((data) => {
          toMove(data)
        })}

        onSwipeRight={() => move.right(moveX, moveY, levelData).then((data) => {
          toMove(data)
        })}

        style={{
          flex: 1,
        }}>
        <SafeAreaView
          style={styles.topsafe}
        />
        <SafeAreaView
          style={styles.mainsafe}
        >
          <View
            style={styles.mainview}
          >
            <View
              style={styles.view1}
            >
              <Text
                style={styles.leveltext}
              >
                LEVEL {levelData.levelnumber}
              </Text>
            </View>
            <View
              style={styles.statsview}
            >
              <Text
                style={styles.statstext}
              >
                Moves = {moves}
              </Text>
            </View>
            <Animatable.View
              animation={'bounceInRight'}
              duration={1000}
              delay={2000}
              style={styles.animatableview1}
            >
              <View
                style={{
                  width: '100%',
                  aspectRatio: levelData.h / levelData.v
                }}
              >
                <Level
                  h={levelData.h}
                  leveldata={levelData.leveldata}
                  x={xOfPlayer}
                  y={yOfPlayer}
                  moveX={moveX}
                  moveY={moveY}
                  durationOfX={durationOfX}
                  durationOfY={durationOfY}
                  setIsMoving={setIsMoving}
                  nextByTarget={nextByTarget}
                  levelFinished={levelFinished}
                />
              </View>
            </Animatable.View>
            <Animatable.View
              animation={{
                0: {
                  scale: 70,
                  zIndex: 10,
                },
                0.9: {
                  scale: 2.5,
                  zIndex: 2.5,
                },
                1: {
                  scale: 1,
                  zIndex: 1,
                },
              }}
              duration={2000}
              style={[styles.animatableview2, {
                backgroundColor:
                  (
                    (levelData.isWon) ? '#6FE500' : 'white'
                  ),
              }]}
            >
              <View
                style={[styles.view2, {
                  borderStyle:
                    (
                      (levelData.isWon) ? 'solid' : 'dashed'
                    ),
                }]}
              >
                <Text
                  style={styles.text1}
                >
                  {
                    (levelData.isWon) ? 'Helal' : 'Dene'
                  }
                </Text>
              </View>
            </Animatable.View>
          </View>
          <FinishModal
            visible={finishModalVisible}
            finishText={(numberOfLevels > levelData.levelnumber) ? "Tebrikler!" :
              "Tebrikler, Tüm seviyeleri bitirdiniz! :)"}
            nextLevelPassed={nextLevelPassed}
            onPress1={() => { navigation.push('Levels'); setFinishModalVisible(false) }}
            animationControlChange={() => { setAnimationControl(0) }}
            onPress2={() => {
              navigation.push('Level',
                { levelData: levelsconstants[levelData.levelnumber] }); setFinishModalVisible(false)
            }}
            animationControl={animationControl}
            starCount={starCount}
            numberOfLevels={numberOfLevels}
            currentLevel={levelData.levelnumber}
          />
        </SafeAreaView>
      </GestureRecognizer>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  topsafe: {
    flex: 0,
    backgroundColor: '#FFB900',
  },
  mainsafe: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainview: {
    flex: 1,
  },
  view1: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: Dimensions.get('window').width,
    backgroundColor: '#FFB900',
    borderBottomWidth: 3,
    zIndex: 1,
    borderColor: 'white',
    elevation: 10,
  },
  leveltext: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  statsview: {
    position: 'absolute',
    width: '100%',
    justifyContent: 'space-between',
    top: 50,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  statstext: {
    color: 'black',
  },
  animatableview1: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 70,
  },
  animatableview2: {
    position: 'absolute',
    bottom: 0,
    paddingTop: 5,
    paddingBottom: 5,
    width: Dimensions.get('window').width + 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view2: {
    left: -5,
    width: '100%',
    borderWidth: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 1,
    height: 50,
  },
  text1: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
})