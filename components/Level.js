import React from 'react'
import { View, Dimensions } from 'react-native'

import Block from './Block'
import PlayerBlock from './PlayerBlock'

const windowWidth = Dimensions.get('window').width

export default function Level({ h, leveldata, x, y, moveX, moveY, durationOfX,
    durationOfY, setIsMoving, nextByTarget, levelFinished }) {

    return (
        <View
            style={{
                width: '100%',
                flexDirection: 'row',
                flexWrap: 'wrap'
            }}>
            {(leveldata.map((index, i) => (
                <Block
                    key={i}
                    size={windowWidth / (h + 0.001)}
                    type={index[0]}
                />
            )))
            }
            <PlayerBlock
                size={windowWidth / (h + 0.001)}
                x={x}
                y={y}
                moveX={moveX}
                moveY={moveY}
                durationOfX={durationOfX}
                durationOfY={durationOfY}
                setIsMoving={setIsMoving}
                nextByTarget={nextByTarget}
                levelFinished={levelFinished}
            />
        </View>
    )
}