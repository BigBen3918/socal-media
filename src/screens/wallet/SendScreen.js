import React, {useState, useEffect} from 'react'
import {View, Text, TouchableOpacity, Button, Image, Clipboard} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';

import { useSelector } from 'react-redux';
import { TextInput } from 'react-native-paper';

export default function SendScreen({navigation}) {
    const {avatar} = useSelector(state => state)
    const [recepAddress, setRecepAddress] = useState("")
    const [addressError, setAddressError]  = useState(false)
    const [amount, setAmount] = useState("0")

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: '0X', value: '0x21', icon: () => <Image source={require('../../assets/oxcoin.png')} style={{width:50, height:50, marginRight:40,}} />},
        {label: 'BNB', value: 'BNB', icon: () => <Image source={require('../../assets/bnb.webp')} style={{width:30, height:30, marginLeft:10, marginRight:50,}} />},
        {label: 'USDT', value: 'USDT', icon: () => <Image source={require('../../assets/usdt.png')} style={{width:30, height:30, marginLeft:10, marginRight:50,}} />}
    ]);

    useEffect(() => {
        if(!/^(0x){1}[0-9a-fA-F]{40}$/i.test(recepAddress)){
            setAddressError(true)
        }else{
            setAddressError(false)
        }
        if(!/[\+]?([\-]?([0-9]{1,})?[\.]?[0-9]{1,})/.test(amount)){
            setAmount("")
        }
    }, [recepAddress, amount])

    const pasteClipboard = async() => {
        const text = await Clipboard.getString()
        setRecepAddress(text)
    }
    return(
        <View>
            <View style = {{flexDirection:"row", marginTop:20, backgroundColor:"#002e4d", paddingVertical:10,}}>
                <TouchableOpacity onPress = {() => navigation.navigate("Dashboard")}>
                    <Image source = {require('../../assets/arrow_back_white.png')} style = {{width:40, height:40, }} />
                </TouchableOpacity>
                <Text style = {{color:"white", marginLeft:10,fontSize:20, marginTop:5,}}>SEND {value}</Text>
                <View style = {{marginLeft:"40%"}}>
                    <Button title = "CONTINUE" onPress = {()=>{alert("Loading...please wait until confirm transaction")}} />
                </View>
            </View>
            <View style = {{marginTop:50, flexDirection:"row", justifyContent:"center"}}>
                {avatar!=="anonymous"?
                    <Image source = {{uri:avatar}} style = {{width:70, height:70, borderRadius:35, }} />:
                    <Image source = {require('../../assets/avatarrandom.png')} style = {{width:70, height:70, borderRadius:35, }} />
                }
                <Ionicons name = "caret-forward-outline" size = {50} style = {{marginTop:10, marginLeft:20,}} />
                <Ionicons name = "caret-forward-outline" size = {30} style = {{marginTop:20, marginRight:20,}} />
                {addressError!==true?
                    <Image source = {{uri:avatar}} style = {{width:70, height:70, borderRadius:35, }} />:
                    <Image source = {require('../../assets/question_avatar.jpg')} style = {{width:70, height:70, borderRadius:35, }} />
                }
            </View>
            <View style = {{width:"90%", marginLeft:"5%", marginTop:50,}}>
                <TextInput 
                    label = "Reception's address"
                    value = {recepAddress}
                    onChangeText = {(text) => setRecepAddress(text)}
                    mode="outlined"
                    right = {recepAddress===""?<TextInput.Icon name={'clipboard-outline'} size={28} color={'#333333'} onPress = {pasteClipboard} />:<TextInput.Icon name={'close-circle'} size={28} color={'#333333'} onPress = {() => setRecepAddress("")} />}
                />
                {addressError!==false?
                    <Text style = {recepAddress===""?{display:"none"}:{color:"red",}}>Invalid Address</Text>:
                    <Text style = {{color:"green"}}>✔ Success</Text>
                    }
            </View>
            <View style = {{width:"90%", marginLeft:"5%", marginTop:50,}}>
                <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder = "Assets"
                    placeholderStyle = {{color:"grey"}}
                    searchable={true}
                    searchPlaceholder = "Search asset..."
                    searchContainerStyle = {{borderBottomWidth:0}}
                    searchTextInputStyle = {{borderColor:"grey", backgroundColor:"white"}}
                    bottomOffset = {100}
                    dropDownContainerStyle={{ backgroundColor: "#e6f3ff", color:"white", borderWidth:0}}
                    style = {{backgroundColor:"lightgrey", height:50,borderColor:"green"}}
                />
            </View>
            <View style = {{width:"90%", marginLeft:"5%", marginTop:50,}}>
                <TextInput 
                    placeholder = {"Amount "+(value===null?"":value)}
                    value = {amount}
                    onChangeText = {(text) => setAmount(text)}
                    mode="flat"
                    style = {{backgroundColor:"white", height:60,}}
                    right = {<TextInput.Affix text="MAX" />}
                />
            </View>
        </View>
    )
}