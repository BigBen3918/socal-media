import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Button, Image} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

export default function WalletScreen({navigation}) {

    const goSend = () => {
        navigation.navigate("SendScreen")
    }

    const goReceive = () => {
        navigation.navigate("ReceiveScreen")
    }
    return(
        <View>
            <Image source = {require("../../assets/oxcoin.png")} style = {{width:150, height:100, marginLeft:"31%", paddingVertical:20,}} />
            <Text style = {{fontSize:30, fontWeight:"bold", textAlign:"center"}}>0 <Text style = {{color:"#33ccff"}}>OX</Text></Text>
            <View style = {{flexDirection:"row", justifyContent:"center", marginTop:5,}}>
                <TouchableOpacity onPress = {goSend}> 
                    <Ionicons name = "arrow-up" size = {40} color = "white" style = {{backgroundColor:"#33ccff", borderRadius:25, padding:2,}} />
                    <Text style = {{textAlign:"center"}}>Send</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {{marginLeft:60}} onPress = {goReceive}>
                    <Ionicons name = "arrow-down" size = {40} color = "white" style = {{backgroundColor:"#33ccff", borderRadius:25, padding:2,}} />
                    <Text style = {{textAlign:"center"}}>Receive</Text>
                </TouchableOpacity>
            </View>
            <View style = {{flexDirection:"row", marginTop:20,}}>
                <View style = {{width:"40%"}}>
                    <Text style = {{backgroundColor:"white", width:"60%", marginLeft:"20%", textAlign:"center", fontSize:20, color:"#333333", borderTopRightRadius:10, borderTopLeftRadius:10, }}>Assets</Text>
                    <View style = {{backgroundColor:"white", width:"100%", height:"100%",}}>
                        <View style = {{padding:15, flexDirection:"row", marginTop:25, borderBottomWidth:0.7, borderBottomColor:"lightgrey"}}>
                            <Image source = {require('../../assets/bnb.webp')} style = {{width:40, height:40}} />
                            <Text style = {{marginLeft:10, fontSize:20,}}>0 <Text style = {{color:"#33ccff"}}> BNB</Text></Text>
                        </View>
                        <View style = {{padding:15, flexDirection:"row"}}>
                            <Image source = {require('../../assets/usdt.png')} style = {{width:40, height:40}} />
                            <Text style = {{marginLeft:10, fontSize:20,}}>0 <Text style = {{color:"#33ccff"}}> USDT</Text></Text>
                        </View>
                    </View>
                </View>
                <View style = {{width:"60%"}}>
                    <Text style = {{backgroundColor:"white", width:"60%", marginLeft:"20%", textAlign:"center", fontSize:20, color:"#333333", borderTopRightRadius:10, borderTopLeftRadius:10, }}>Activity</Text>
                    <View style = {{backgroundColor:"white", width:"100%", height:"100%", borderLeftWidth:0.7, borderLeftColor:"lightgrey",}}>
                        <Text style = {{textAlign:"center", marginTop:"35%", color:"grey"}}>transactions will appear here</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}