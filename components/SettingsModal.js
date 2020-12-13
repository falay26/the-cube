import * as React from 'react'
import { Dimensions, View, Image, Text, TouchableWithoutFeedback, ScrollView } from 'react-native'
import Modal from 'react-native-modal'

const windowWidth = Dimensions.get('window').width;

export default function Block ({ visible, backDrop, onHide }) {
    return (
        <Modal
        isVisible={visible}
        animationIn="fadeIn"
        animationOut="fadeOut"
        animationInTiming={200}
        animationOutTiming={200}
        backdropOpacity={0}
        onBackdropPress={() => { backDrop(false) }}
        onModalHide={() => { onHide() }}
        style={{
          justifyContent:'center',
          alignItems:'center',
          margin:0,
        }}
        >
            <View
            style={{
                width:windowWidth*0.8,
                height:windowWidth*0.8*(4/3),
                borderRadius:6
            }}>
                <View
                style={{
                    width:'100%',
                    height:50,
                    justifyContent:"center",
                    alignItems:"center",
                    borderBottomWidth:2,
                    borderBottomColor:'black',
                    shadowColor: '#000',
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity:  0.4,
                    shadowRadius: 3,
                    elevation: 5,
                }}>
                    <Text
                    style={{
                        fontSize:24,
                        fontWeight:'bold',
                    }}>
                        Settings
                    </Text>
                    <TouchableWithoutFeedback
                        onPress={() => {
                            backDrop(false)
                        }}
                    >
                        <Image
                        style={{
                            position:'absolute',
                            top:10,
                            right:10,
                            height:30,
                            width:30,
                        }}
                        source={require('../Icons/exiticon.png')}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <ScrollView
                style={{
                    flex:1,
                }}>
                </ScrollView>
            </View>
        </Modal>
    )
}