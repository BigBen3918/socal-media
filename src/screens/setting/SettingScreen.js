import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';


export default function SettingsScreen({navigation}) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: "60%", marginLeft:"20%" }}>
        <TouchableOpacity onPress = {()=>navigation.navigate('ProfileSettingScreen')} style = {{backgroundColor:"#333333",padding:10, width:"100%", borderRadius:7,}}>
            <Text style = {{color:"white", textAlign:"center"}}><Image source = {require("../../assets/profile.png")} style = {{width:25, height:25,}} /> Profile Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>navigation.navigate('ChangePasswordScreen')} style = {{marginTop:40, backgroundColor:"#333333",padding:10, width:"100%", borderRadius:7,}}>
            <Text style = {{color:"white", textAlign:"center"}}><Image source = {require("../../assets/key.png")} style = {{width:20, height:20,}} /> Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>navigation.navigate('RecoverySettingScreen')} style = {{marginTop:40, backgroundColor:"#333333",padding:10, width:"100%", borderRadius:7,}}>
            <Text style = {{color:"white", textAlign:"center"}}><Image source = {require("../../assets/recovery.png")} style = {{width:20, height:20,}} /> Recovery Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress = {()=>navigation.replace('LoginScreen')} style = {{marginTop:40, backgroundColor:"white",padding:10, width:"100%", borderWidth:0.5, borderColor:"#333333", borderRadius:7,}}>
            <Text style = {{color:"#333333", textAlign:"center"}}><Image source = {require("../../assets/logout.png")} style = {{width:20, height:20,}} /> Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
  