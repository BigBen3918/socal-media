import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import { NavigationContainer } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';


import { useSelector, useDispatch} from 'react-redux';
import slice from '../../../reducer';

/* import { getProfile } from '../core/model'; */
export default function PostScreen({navigation}) {
	const G = useSelector(state => state);
	const dispatch = useDispatch();
	const update = (json) => dispatch(slice.actions.update(json));

	/* const [status, setStatus] = useState({
		articles: [],
		count: 0,
	}); */
	/* useEffect(() => {
		(async () => {
			
			const postsAmount = (await getProfile()).postsAmount
			const count = !isNaN(postsAmount) ? Number(postsAmount) : 0;
			const articles = (await getProfile()).articles;
			// for(let i = 1; i<=postsAmount;i++){
			// 	const storedArticles = (await getProfile()).articles[i-1]
			// 	articles.push(storedArticles)
			// }
			setStatus({articles, count})
			alert(status.articles[0].title)
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
		
	}, []); */

	const viewPost  = (currentPage) => {
		update({currentPage})
		navigation.navigate("PostedViewScreen")
	}
	return (
		<View>
			<Text style = {{color:"black", fontSize:20, zIndex:1,marginTop:-40, marginLeft:80,}}>({G.articles.length})</Text>
			<TouchableOpacity onPress={() => navigation.navigate('PostEditScreen')} style = {{zIndex:1,marginTop:-40, marginLeft:320,}}>
				<Text style = {{fontSize:30,color:"#737373"}}>+</Text>
			</TouchableOpacity>
			<ScrollView style = {{marginTop:20,}} >
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
				) : (
					<View style = {{marginTop:"20%", alignItems: 'center', justifyContent: 'center' ,}}>
						<Image source = {require("../../assets/items.png")} />
						<View style = {{alignItems:"center", marginTop:-30}}>
							<Text style={{ color:"#737373", }}>NO POSTS</Text>
							<View style = {{flexDirection:"row"}}>
								<Text style = {{ fontSize:10,}}>
									<Text style = {{textDecorationLine:"underline", color:"blue"}} onPress = {() => navigation.navigate('PostEditScreen')}>Post</Text>
									<Text> your New Article</Text>
								</Text>
							</View>
						</View>
					</View>
				)}
			</ScrollView>
		</View>
	);
}