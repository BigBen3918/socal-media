import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import { NavigationContainer } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';

import { getProfile } from '../../core/model';

import { useSelector, useDispatch} from 'react-redux';
import slice from '../../../reducer';
import Account from '../../components/Account';

export default function FollowingScreen({navigation}) {
	const G = useSelector(state => state);
	const dispatch = useDispatch();
	const update = (json) => dispatch(slice.actions.update(json));

  const viewPost  = (currentPage) => {
		update({currentPage})
		navigation.navigate("PostedViewScreen")
	}
	return (
		<View>
      <Account />
      <View style = {{flexDirection:"row", padding:10,}}>
        <TouchableOpacity onPress = {() => navigation.navigate("Dashboard")}>
          <Image source = {require('../../assets/arrow_back.png')} style = {{width:30, height:30,}} />
        </TouchableOpacity>
        {G.fullName===""?
          <Text style = {{color:"black", fontSize:15, padding:5,}}>{G.account.slice(0, 12) + "..." + G.account.slice(-5)}</Text>:
          <Text style = {{color:"black", fontSize:15, padding:5,}}>{G.fullName}</Text>
        }
        <Text style = {{color:"black", fontSize:15, padding:5,}}>({G.articles.length})</Text>
      </View>
			<ScrollView style = {{marginTop:20,}}>
				{G.articles.length ? (
						G.articles.map((v,k)=>(
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