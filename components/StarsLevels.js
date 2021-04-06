import React from 'react'
import { View, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'

export default function StarsLevels({ stars }) {
    const starAnimationDuration = 1200
    const firstStarAnimationDelay = 3000
    return (
        <View
            style={{
                position: 'absolute',
                bottom: 0,
                flexDirection: 'row',
                width: '90%',
                justifyContent: 'space-between',
                padding: 5,
            }}>
            <Image
                style={{
                    width: '25%',
                    aspectRatio: 1,
                }}
                source={require('../Icons/star-outside.png')}
            />
            <Image
                style={{
                    width: '25%',
                    aspectRatio: 1,
                }}
                source={require('../Icons/star-outside.png')}
            />
            <Image
                style={{
                    width: '25%',
                    aspectRatio: 1,
                }}
                source={require('../Icons/star-outside.png')}
            />
            <View
                style={{
                    position: 'absolute',
                    top: 5,
                    left: 5,
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Animatable.Image
                    animation={{
                        0: {
                            scale: 1
                        },
                        0.7: {
                            scale: 1.3
                        },
                        1: {
                            scale: 1
                        },
                    }}
                    duration={starAnimationDuration}
                    delay={firstStarAnimationDelay}
                    iterationCount={"infinite"}
                    style={{
                        width: '25%',
                        aspectRatio: 1,
                        opacity:
                            (
                                stars >= 1
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
                            scale: 1
                        },
                        0.7: {
                            scale: 1.3
                        },
                        1: {
                            scale: 1
                        },
                    }}
                    duration={starAnimationDuration}
                    delay={firstStarAnimationDelay + starAnimationDuration * 1 / 3}
                    iterationCount={"infinite"}
                    style={{
                        width: '25%',
                        aspectRatio: 1,
                        opacity:
                            (
                                stars >= 2
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
                            scale: 1
                        },
                        0.7: {
                            scale: 1.3
                        },
                        1: {
                            scale: 1
                        },
                    }}
                    duration={starAnimationDuration}
                    delay={firstStarAnimationDelay + starAnimationDuration * 2 / 3}
                    iterationCount={"infinite"}
                    style={{
                        width: '25%',
                        aspectRatio: 1,
                        opacity:
                            (
                                stars >= 3
                                    ?
                                    1
                                    :
                                    0
                            )
                    }}
                    source={require('../Icons/star-inside.png')}
                />
            </View>
        </View>
    )
}