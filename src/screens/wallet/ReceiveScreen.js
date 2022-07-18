import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Button, Image, Clipboard} from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import Logo from '../../components/Logo'

import { getProfile } from '../../core/model';

export default function ReceiveScreen({navigation}) {

    const [publicKey, setPublicKey] = useState(" ") 

    useEffect(() => {
        (async() => {
            setPublicKey((await getProfile()).account)
        })();
    }, [])

    const copyAddress = () => {
        Clipboard.setString(publicKey)
        alert("Copied Address to clipboard succeessfully!"+'\n'+'\n'+publicKey)
    }

    return(
        <View>
            <View style = {{flexDirection:"row", marginTop:20, backgroundColor:"#002e4d", paddingVertical:10,}}>
                <TouchableOpacity onPress = {() => navigation.navigate("Dashboard")}>
                    <Image source = {require('../../assets/arrow_back_white.png')} style = {{width:40, height:40, }} />
                </TouchableOpacity>
                <Text style = {{color:"white", marginLeft:10,fontSize:20, marginTop:5,}}>RECEIVE</Text>
            </View>
            <View style = {{alignItems:"center", marginTop:0,}}>
                <Logo />
            </View>
            <View style = {{alignItems:"center", marginTop:-20,}}>
                <Image source = {{uri:"https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl="+`${publicKey}`+"=UTF-8"}} style = {{width:300, height:300,}}/>
                <View style = {{width:300, backgroundColor:"white"}}>
                    <Text style = {{color:"#333333", textAlign:"center", fontSize:15,}}>{publicKey}</Text>
                </View>
            </View>
            <Text style = {{color:"grey", textAlign:"center", padding:10,}}>Send only <Text style = {{fontWeight:"bold"}}>0X, BNB, USDT</Text> to this address. Sending any other coins may result in permanent loss</Text>
            <TouchableOpacity style = {{width:"80%", marginLeft:"10%", marginTop:10,}} onPress = {copyAddress}>
                <Text style = {{backgroundColor:"#333333", padding:10, textAlign:"center", fontSize:20, color:"white" }}>Copy Address 
                <Ionicons name = "copy-outline" size = {30} />
                </Text>
            </TouchableOpacity>
        </View>
    )
}