import React from 'react'
import {View, Text, Image, TouchableOpacity, Button} from 'react-native'

export default function RecoverySettingScreen({navigation}) {
    return(
        <View style = {{marginTop:10,}}>
            <View style = {{flexDirection:"row", marginTop:20, backgroundColor:"#002e4d", paddingVertical:10,}}>
                <TouchableOpacity onPress = {() => navigation.navigate("Dashboard")}>
                    <Image source = {require('../../assets/arrow_back_white.png')} style = {{width:40, height:40, }} />
                </TouchableOpacity>
                <Text style = {{color:"white", marginLeft:10,fontSize:20, marginTop:5,}}>Recovery Setting</Text>
                <View style = {{marginLeft:"30%"}}>
                    <Button title = "DONE" onPress = {()=>{alert("Well-done")}} />
                </View>
            </View>
            <Text>will do this page after fix mnemonic error</Text>
        </View>
    )
}