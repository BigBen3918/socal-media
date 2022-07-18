import React, {useEffect, useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, AsyncStorage, Clipboard, Image, Linking} from 'react-native';
import { TextInput } from 'react-native-paper';
import BackButton from '../../components/BackButton'
import * as ImagePicker from 'expo-image-picker';
import RadioButtonRN from 'radio-buttons-react-native';
import PhoneInput, {isValidPhoneNumber } from "react-native-phone-number-input";

import {setProfile} from '../../core/model'
import { useSelector, useDispatch} from 'react-redux';
import slice from '../../../reducer';


export default function EditProfileScreen({navigation}) {
	const {avatar, fullName, gender, email, instagram, linkedin, phone} = useSelector(state => state);
	const [showAvatar, setShowAvatar] = useState(" ")
	const [showFullName, setShowFullName] = useState(" ")
	const [showGender, setShowGender] = useState(" ")
	const [showEmail, setShowEmail] = useState(" ")
	const [showInstagram, setShowInstagram] = useState(" ")
	const [showLinkedin, setShowLinkedin] = useState(" ")
	const [showPhone, setShowPhone] = useState("")
	const [showNumber, setShowNumber] = useState("")

	const data = [
		{
		  label: 'Male'
		 },                          
		 {
		  label: 'Female'
		 },
		 {
		  label: 'unknown'
		 }
		];

	const refFullName = React.createRef(null)
	const refEmail = React.createRef(null)
	const refPhone = React.createRef(null)
	const refInstagram = React.createRef(null)
	const refLinkedin = React.createRef(null)
	
	const dispatch = useDispatch();
	const update = (json) => dispatch(slice.actions.update(json));

	useEffect(() => {
		setShowAvatar(avatar)
		setShowFullName(fullName)
		setShowGender(gender)
		setShowEmail(email)
		setShowInstagram(instagram)
		setShowLinkedin(linkedin)
		setShowPhone(phone)
	}, [])
	const pickProfilePhoto = async () => {
		let result = await ImagePicker.launchImageLibraryAsync({
		  mediaTypes: ImagePicker.MediaTypeOptions.All,
		  allowsEditing: true,                                   
		  aspect: [3, 3],
		  quality: 1,
		  base64:true,
		});
		
	
		if (!result.cancelled) {
			setShowAvatar(result.uri)
		}
	  };
	const submitProfile = async (e) => {
		if(showAvatar==="anonymous") {
			alert("Please Add your Profile Photo !")
			return
		}
		if(!showFullName){
			return refFullName.current.focus()
		}
		if(!showEmail){
			return refEmail.current.focus()
		}
		if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(showEmail)){
			alert('Invalid Email..')
			setShowEmail("")
			return refEmail.current.focus()
		}
		if(!showNumber){
			alert("Required Number")
			return
		}
		if(!/^\d{10}$/.test(showNumber) && !/^\d{9}$/.test(showNumber)){
			alert("Invalid Phone Number")
			return 
		}
		if(showInstagram && !/^\s*(http\:\/\/)?instagram\.com\/[a-z\A-Z\d-_]{1,255}\s*$/.test(showInstagram)){
			return refInstagram.current.focus()
		}
		if(showLinkedin && !/(https?:\/\/(www.)|(www.))?linkedin.com\/(mwlite\/|m\/)?in\/[a-zA-Z0-9_.-]+\/?/.test(showLinkedin)){
			return refLinkedin.current.focus()
		}
		update({avatar:showAvatar, fullName:showFullName, gender: showGender, email: showEmail, instagram: showInstagram, linkedin: showLinkedin, phone: showPhone});
		setProfile({avatar:showAvatar, fullName:showFullName, gender: showGender, email: showEmail, instagram: showInstagram, linkedin: showLinkedin, phone: showPhone})
		navigation.navigate('ProfileSettingScreen')
	}
	return(
		<View>
			<View style = {styles.topBar}>
				<TouchableOpacity onPress={() => navigation.navigate('ProfileSettingScreen')}>
					<Image style={styles.image} source={require('../../assets/arrow_back.png')}/>
				</TouchableOpacity>
				<Text style = {styles.topBarText}>Edit Profile</Text>
				<TouchableOpacity onPress={submitProfile} style = {{marginLeft:"45%"}}>
					<Image style={styles.submitIcon} source={require('../../assets/correct.png')}/>
				</TouchableOpacity>
			</View>
			{showAvatar!=="anonymous"?
				<View style = {{marginTop:10, alignItems:"center"}}>
					<TouchableOpacity onPress = {pickProfilePhoto} >
						<View style = {{alignItems:"center"}}>
							<Image source={{ uri: showAvatar }} style={{ width: 100, height: 100, marginTop:5, borderRadius:50, borderWidth:2, borderColor:"green",alignItems: "center"}} />
						</View>
						<Image source={require('../../assets/edit.png')} style = {{width:20, height: 20,marginTop: 80, marginLeft: 120,position:"absolute"}} />
						<Text style = {{fontSize:20, color:"black", textAlign:"center"}}>Change Profile Photo</Text>
					</TouchableOpacity>
				</View>:
				<View style = {{marginTop:30, alignItems:"center"}}>
					<TouchableOpacity onPress = {pickProfilePhoto} style = {{ alignItems: "center"}}>
						<Image source = {require('../../assets/avatar.png')} style={{ width: 80, height: 80 }} />
						<Text style = {styles.addProfileIcon}>+</Text>
						<Text style = {{fontSize:20, color:"black"}}>Add Profile Photo</Text>
					</TouchableOpacity>
				</View>
			}
			<View style = {{marginTop:20, marginLeft:15}}>
				<View style = {{flexDirection:"row"}}>
					<Text style={styles.profileheadtext}>*Nickname</Text>
					<TextInput 
						label = 'Nickname'
						value = {showFullName}
						onChangeText = {text => setShowFullName(text)}
						style={styles.profileinputfield}
						mode="outlined"
						ref = {refFullName}
					/>
				</View>
				<View style = {{flexDirection:"row", marginTop:10}}>
					<Text style={styles.profileheadtext}>*Gender</Text>
					{/* <TextInput 
						label = 'Gender'
						value = {gender}
						onChangeText = {gender => update({gender})}
						style={styles.profileinputfield}
						mode="outlined"
					/> */}
					<RadioButtonRN
						data={data}
						selectedBtn={(e) => setShowGender(e?e.label:null)}
						circleSize={10}
						style={{width:"30%", height:100}}
						boxStyle={{background:"none"}}
						box={false}
						initial = {3}
						activeColor='#03a9f4'
						deactiveColor='lightgrey'
						textStyle = {{marginLeft:20,}}
					/>
				</View>
				<View style = {{flexDirection:"row", marginTop:10}}>
					<Text style={styles.profileheadtext}>*E-mail</Text>
					<TextInput 
						label = 'e-mail'
						value = {showEmail}
						onChangeText = {text => setShowEmail(text)}
						style={styles.profileinputfield}
						mode="outlined"
						ref = {refEmail}
					/>
				</View>
				<View style = {{flexDirection:"row", marginTop:10}}>
					<Text style={styles.profileheadtext}>*Phone number</Text>
					{/* <TextInput 
						label = 'PhoneNumber'
						value = {showPhone}
						onChangeText = {text => setShowPhone(text)}
						style={styles.profileinputfield}
						mode="outlined"
						ref = {refPhone}
					/> */}
					<PhoneInput
						ref={refPhone}
						value={showPhone}
						defaultValue={showPhone}
						defaultCode="US"
						onChangeFormattedText={(text) => {
							setShowPhone(text);
						}}
						onChangeText={(text) => {
							setShowNumber(text);
						}}
						withDarkTheme
						withShadow
						autoFocus
						containerStyle = {{width:"60%", height:"90%"}}
						flagButtonStyle = {{width:"25%"}}
						placeholder = "Phone Num"
					/>
				</View>
				<View style = {{flexDirection:"row", marginTop:10}}>
					<Text style={styles.profileheadtext}>*Instagram Link (optional)</Text>
					<TextInput 
						ref = {refInstagram}
						label = 'Instagram'
						value = {showInstagram}
						onChangeText = {text => setShowInstagram(text)}
						style={styles.profileinputfield}
						mode="outlined"
					/>
				</View>
				<View style = {{flexDirection:"row", marginTop:10}}>
					<Text style={styles.profileheadtext}>*Linkedin Link (optional)</Text>
					<TextInput 
						ref = {refLinkedin}
						label = 'Linkedin'
						value = {showLinkedin}
						onChangeText = {text => setShowLinkedin(text)}
						style={styles.profileinputfield}
						mode="outlined"
					/>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
	  width: 24,
	  height: 24,
	  marginLeft:15,
	},
	topBar: {
		flexDirection:"row",
		marginTop: 30,
	},
	topBarText: {
		marginLeft:15,
		fontSize: 20,
	},
	submitIcon: {
		width: 24,
		height: 24,
	},
	profileheadtext: {
		width:"30%"
	},
	profileinputfield: {
		width:"60%", 
		height:40,
	},
	addProfileIcon: {
		position: "absolute",
		marginTop:30,
		fontSize:30,
		color:"#0099ff",
		textAlign:"center",
	}
  })
  