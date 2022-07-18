import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import { NavigationContainer } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';

import { getProfile, setProfile } from '../../core/model';

import { useSelector, useDispatch} from 'react-redux';
import slice from '../../../reducer';

export default function FollowingScreen({navigation}) {
	const G = useSelector(state => state);
	const dispatch = useDispatch();
	const update = (json) => dispatch(slice.actions.update(json));
	
	const [followingStatus, setFollowingStatus] = useState()
	useEffect(() => {
		(async () => {
			followingStatu = (await getProfile()).followingStatus
			setFollowingStatus(followingStatu)
			var followingStatu = 0 ;
			for(let i=1;i<=G.articles.length;i++){
				if(G.articles[i-1].followingAmount>0){
					followingStatu+=1;
				}
			}
			setFollowingStatus(followingStatu)
			const amount = !isNaN(followingStatu) ? followingStatu : 0;
			setProfile({followingStatus:String(amount)})
			update({followingStatu:amount})
		})();
	}, [G.articles])

	const viewPost  = (currentPage) => {
		update({currentPage})
		navigation.navigate("PostedViewScreen")
	}
	return (
		<View>
			<Text style = {{color:"black", fontSize:20, zIndex:1,marginTop:-40, marginLeft:120,}}>({followingStatus})</Text>
			<ScrollView style = {{marginTop:20,}}>
				{G.followingStatu && Number(G.followingStatu) > 0 ? (
						G.articles.map((v,k)=>(
							v.followingAmount>0 ? (
								<View key = {k}>
								<TouchableOpacity style = {{flexDirection:"row", marginHorizontal:20, padding:10,borderBottomColor:"lightgrey", borderBottomWidth:0.3,}} onPress = {()=>viewPost(Number(k)+1)}>
										<View>
											<Image source = {{uri:v.topicImage}} style = {{width:50, height:40}} />
										</View>
										<View style = {{marginLeft:20,}}>
											<Text style = {{fontSize:15,}}>
												{v.title?.length<25 ? (v.title || null) : v.title.slice(0, 22) + "..."}
											</Text>
											<View style = {{flexDirection:"row"}}>
												<Text style = {{fontSize:10, color:"grey"}}>posted at </Text>
												<Text style = {{fontSize:10, color:"grey"}}>{v.postedTime}</Text>
											</View>
										</View>
								</TouchableOpacity>
								</View>
							):null
						))
					) :
					<View style = {{marginTop:"20%", alignItems: 'center', justifyContent: 'center' ,}}>
						<Image source = {require("../../assets/items.png")} />
						<View style = {{alignItems:"center", marginTop:-30}}>
							<Text style={{ color:"#737373", }}>NO ITEMS</Text>
						</View>
					</View>
				}
			</ScrollView>
		</View>
	);
}