import React, {useEffect, useState} from 'react';
import {Button, View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Clipboard, Image, Linking, Touchable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Background from '../../components/Background'
import Modal from "react-native-modal";

import { useSelector, useDispatch} from 'react-redux';
import slice from '../../../reducer';
import {setProfile } from '../../core/model';

export default function ProfileSettingScreen({navigation}) {
    const {avatar, fullName, gender, email, instagram, linkedin, phone} = useSelector(state => state);

    const dispatch = useDispatch();
	const update = (json) => dispatch(slice.actions.update(json));
    const [isModalVisible, setModalVisible] = useState(false);
    const pickProfilePhoto = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,                                   
			aspect: [3, 3],
			quality: 1,
			base64:true,
        });
        
    
        if (!result.cancelled) {
        	update({avatar:result.uri})
        	setProfile({avatar:result.uri})
        }
        
    };
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const removeProfilePhoto = async () => {
        update({avatar:'anonymous'})
        setProfile({avatar:''});
        setModalVisible(!isModalVisible);
    }
	return (
		<View style = {{marginTop:25}}>
			<View style = {styles.topBar}>
				<TouchableOpacity onPress = {() => navigation.navigate("Dashboard")} style = {{marginLeft:10,}}>
					<Image source = {require("../../assets/arrow_back_white.png")} style = {{width: 25, height: 25, }} />
				</TouchableOpacity>
				<Text style = {{color:"white", fontSize:20, marginLeft:10,}}>{fullName}</Text>
			</View>
			<View style={styles.container}>
				<View>
					<View>
						{avatar!=="anonymous"?
							<View>
								<TouchableOpacity onPress = {toggleModal}>
									<Image source={{ uri: avatar }} style={{ width: 100, height: 100, borderRadius:50, borderWidth:2, borderColor:"green"}} />
									<Image source={require('../../assets/trash.png')} style = {{position:"absolute", width: 20, height:20,marginTop: 80, marginLeft: 75}} />
								</TouchableOpacity>
								<Modal isVisible={isModalVisible}>
									<View>
									<Text style = {{color:"white", textAlign:"center", fontSize:25, backgroundColor:"#222127", borderColor:"#333333", borderRadius:10, borderWidth:1,padding: 20,}}>Remove your photo?</Text>
									<View style = {{flexDirection:"row", marginTop:50,}}>
										<View style = {{width:"40%", marginLeft:"5%"}}>
										<Button title="YES" onPress={removeProfilePhoto} />
										</View>
										<View style = {{width:"40%", marginLeft:"10%"}}>
										<Button title="CANCEL" onPress={toggleModal} />
										</View>
									</View>
									</View>
								</Modal>
							</View>:
							<TouchableOpacity onPress = {pickProfilePhoto}>
								<Image source = {require('../../assets/avatar.png')} style={{ width: 80, height: 80, marginTop:10,}} />
								<Text style = {styles.addProfileIcon}>+</Text>
							</TouchableOpacity>
						}
						
					</View>
					<Text style = {{textAlign:'center', marginTop:5,}}>{fullName!==""?fullName:"anonymous"}</Text>
				</View>
				<View style = {styles.myStatus}>
					<View style = {styles.postStatus}>
						<Text style={{textAlign:"center"}}>0</Text>
						<Text>posts</Text>
					</View>
					<View style = {styles.followerStatus}>
						<Text style={{textAlign:"center"}}>0</Text>
						<Text>followers</Text>
					</View>
					<View style = {styles.followingStatus}>
						<Text style={{textAlign:"center"}}>0</Text>
						<Text>following</Text>
					</View>
				</View>
				<View style = {{marginTop:30}}>
						<Text>*Gender: {gender!==""?gender:"unknown"}</Text>
						<Text style = {{marginTop:5,}}>*E-mail: {email!==""?email:"unknown"}</Text>
						<Text style = {{marginTop:5,}}>*Phone Number: {phone!==""?phone:"unknown"}</Text>
						<Text style = {{marginTop:5,}}>*Instagram Link: {instagram!==""?instagram:"unknown"}</Text>
						<Text style = {{marginTop:5,}}>*Linkedin Link: {linkedin!==""?linkedin:"unknown"}</Text>
				</View>
				<View style = {{width:"80%", marginTop: 40,}}>
					<Button mode="contained" title = "EDIT PROFILE" onPress={() => navigation.navigate('EditProfileScreen')} color = "#333333" />
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
    container :{
        // flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        marginTop:70,
    },
    row :{
        flexDirection : "row",
        marginTop: 20,
    },
    address :{
        width: "50%",
        alignItems: "center",
    },
    balance :{
        width: "50%",
        alignItems: "center",
    },
    myStatus:{
        flexDirection: "row",
        marginTop:20,
    },
    followerStatus: {
        marginLeft: 25,
    },
    followingStatus: {
        marginLeft: 25,
    },
    addProfileIcon: {
        position: "absolute",
        marginTop:65,
        marginLeft:52,
        fontSize:23,
        color:"white",
        backgroundColor:"#0099ff",
        width:28,
        height:28,
        borderRadius:14,
        borderWidth:2,
        borderColor:"white",
        textAlign:"center",
    },
    topBar: {
        flexDirection:"row",
        backgroundColor:"#002e4d",
        padding:10,
    }
})