import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Searchbar } from 'react-native-paper';
import Modal from "react-native-modal";
import { NavigationContainer } from '@react-navigation/native';
import HTMLView from 'react-native-htmlview';
import { useSelector } from 'react-redux';

import FollowingScreen from './article/FollowingScreen'
import PostScreen from './article/PostScreen';

export default function HomeScreen({navigation}) {
	const {avatar} = useSelector(state => state)
	const [articleTitle, setArticleTitle] = useState("");
	const [topicImage, setTopicImage] = useState(null);
	const [postedTime, setPostedTime] = useState("");
	const [searchQuery, setSearchQuery] = useState('')
	const onChangeSearch = query => setSearchQuery(query);
	useEffect(() => {
		(async () => {
			const storedArticleTitle = await AsyncStorage.getItem("desocial@0313/articleTitle") || '';
				if(storedArticleTitle.length >= 15){
					const showItemTitle = storedArticleTitle.slice(0,15) + "...";
					setArticleTitle(showItemTitle)
				}else{
					setArticleTitle(storedArticleTitle)
				}
			const storedTopicImage = await AsyncStorage.getItem("desocial@0313/articleTopicImage")
				setTopicImage(storedTopicImage)
			const storedTime = await AsyncStorage.getItem("desocial@0313/articlePostTime")
				setPostedTime(storedTime)
			if (Platform.OS !== 'web') {
				const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
				if (status !== 'granted') {
					alert('Sorry, we need camera roll permissions to make this work!');
				}
			}
		})();
		
	}, []);

	const viewPost  = () => {
		navigation.navigate("PostViewScreen")
	}
	return (
		<View>
			<View>
				<Searchbar
						placeholder = "Search"
						onChangeText={onChangeSearch}
						value = {searchQuery}
				/>
			</View>
			<View>
				<Text style = {{marginTop:10, marginLeft:10,fontSize:10,}}>
					RECOMMANDED AUTHORS
				</Text>
				<ScrollView horizontal = {true}>
					<View style = {{flexDirection:"row", padding:15, borderBottomWidth:2, borderBottomColor:"rgba(230, 230, 230, 1)"}}>
						{avatar!=="anonymous"?
							<TouchableOpacity style = {{ paddingHorizontal: 10}} onPress = {() => navigation.navigate('RecommandedPostScreen')}>
								<Image source = {{uri:avatar}} style = {{width:50, height:50,borderRadius:25,borderWidth:0.5, borderColor:"#333333",}} />
							</TouchableOpacity>:
							<TouchableOpacity style = {{ paddingHorizontal: 10}} onPress = {() => navigation.navigate('RecommandedPostScreen')}>
								<Image source = {require('../assets/avatarrandom.png')} style = {{width:50, height:50,borderRadius:25,borderWidth:0.5, borderColor:"#333333",}} />
							</TouchableOpacity>
						}
						<TouchableOpacity style = {{ paddingHorizontal: 10}} onPress = {() => navigation.navigate('RecommandedPostScreen')}>
							<Image source = {{uri:"https://randomuser.me/api/portraits/med/men/1.jpg"}} style = {{width:50, height:50,borderRadius:25,borderWidth:0.5, borderColor:"#333333",}} />
						</TouchableOpacity>
						<TouchableOpacity style = {{ paddingHorizontal: 10}} onPress = {() => navigation.navigate('RecommandedPostScreen')}>
							<Image source = {{uri:"https://randomuser.me/api/portraits/med/men/2.jpg"}} style = {{width:50, height:50,borderRadius:25,borderWidth:0.5, borderColor:"#333333",}} />
						</TouchableOpacity>
						<TouchableOpacity style = {{ paddingHorizontal: 10}} onPress = {() => navigation.navigate('RecommandedPostScreen')}>
							<Image source = {{uri:"https://randomuser.me/api/portraits/med/women/3.jpg"}} style = {{width:50, height:50,borderRadius:25,borderWidth:0.5, borderColor:"#333333",}} />
						</TouchableOpacity>
						<TouchableOpacity style = {{ paddingHorizontal: 10}} onPress = {() => navigation.navigate('RecommandedPostScreen')}>
							<Image source = {{uri:"https://randomuser.me/api/portraits/med/men/4.jpg"}} style = {{width:50, height:50,borderRadius:25,borderWidth:0.5, borderColor:"#333333",}} />
						</TouchableOpacity>
						<TouchableOpacity style = {{ paddingHorizontal: 10}} onPress = {() => navigation.navigate('RecommandedPostScreen')}>
							<Image source = {{uri:"https://randomuser.me/api/portraits/med/women/5.jpg"}} style = {{width:50, height:50,borderRadius:25,borderWidth:0.5, borderColor:"#333333",}} />
						</TouchableOpacity>
					</View>
				</ScrollView>
			</View>
			<View style = {{flexDirection:"row"}}>
				<View style = {{borderRightWidth:2, borderRightColor:"rgba(230, 230, 230, 1)", width:"30%", height:230,}}>
					<Text style = {{margin:10,fontSize:10,}}>
						MOST RECENT ARTICLES
					</Text>
					<View>
						<ScrollView>
							{/* <TouchableOpacity style = {{flexDirection:"row", padding:10, marginLeft:10,}} onPress = {viewPost}>
									<Image source = {{uri:topicImage}} style = {{width:60, height:48,}} />
							</TouchableOpacity>
							<TouchableOpacity style = {{flexDirection:"row", padding:10, marginLeft:10,}} onPress = {viewPost}>
									<Image source = {{uri:topicImage}} style = {{width:60, height:48,}} />
							</TouchableOpacity>
							<TouchableOpacity style = {{flexDirection:"row", padding:10, marginLeft:10,}} onPress = {viewPost}>
									<Image source = {{uri:topicImage}} style = {{width:60, height:48,}} />
							</TouchableOpacity>
							<TouchableOpacity style = {{flexDirection:"row", padding:10, marginLeft:10,}} onPress = {viewPost}>
									<Image source = {{uri:topicImage}} style = {{width:60, height:48,}} />
							</TouchableOpacity>
							<TouchableOpacity style = {{flexDirection:"row", padding:10, marginLeft:10,}} onPress = {viewPost}>
									<Image source = {{uri:topicImage}} style = {{width:60, height:48,}} />
							</TouchableOpacity>
							<TouchableOpacity style = {{flexDirection:"row", padding:10, marginLeft:10,}} onPress = {viewPost}>
									<Image source = {{uri:topicImage}} style = {{width:60, height:48,}} />
							</TouchableOpacity> */}
							<PostScreen />
						</ScrollView>
					</View>
				</View>
				<View style = {{height:230,}}>
					<Text style = {{margin: 10,fontSize:10,}}>
						RECOMMANDED ARTICLES
					</Text>
					<View>
						<ScrollView>
							{/* <TouchableOpacity style = {{flexDirection:"row", padding:10,}} onPress = {viewPost}>
								<View>
									<Image source = {{uri:topicImage}} style = {{width:40, height:32}} />
								</View>
								<View style = {{marginLeft:20,}}>
									<Text style = {{fontSize:15,}}>{articleTitle}</Text>
									<View style = {{flexDirection:"row"}}>
										<Text style = {{fontSize:10, color:"grey"}}>posted at </Text>
										<Text style = {{fontSize:10, color:"grey"}}>{postedTime}</Text>
									</View>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style = {{flexDirection:"row", padding:10,}} onPress = {viewPost}>
								<View>
									<Image source = {{uri:topicImage}} style = {{width:40, height:32}} />
								</View>
								<View style = {{marginLeft:20,}}>
									<Text style = {{fontSize:15,}}>{articleTitle}</Text>
									<View style = {{flexDirection:"row"}}>
										<Text style = {{fontSize:10, color:"grey"}}>posted at </Text>
										<Text style = {{fontSize:10, color:"grey"}}>{postedTime}</Text>
									</View>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style = {{flexDirection:"row", padding:10,}} onPress = {viewPost}>
								<View>
									<Image source = {{uri:topicImage}} style = {{width:40, height:32}} />
								</View>
								<View style = {{marginLeft:20,}}>
									<Text style = {{fontSize:15,}}>{articleTitle}</Text>
									<View style = {{flexDirection:"row"}}>
										<Text style = {{fontSize:10, color:"grey"}}>posted at </Text>
										<Text style = {{fontSize:10, color:"grey"}}>{postedTime}</Text>
									</View>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style = {{flexDirection:"row", padding:10,}} onPress = {viewPost}>
								<View>
									<Image source = {{uri:topicImage}} style = {{width:40, height:32}} />
								</View>
								<View style = {{marginLeft:20,}}>
									<Text style = {{fontSize:15,}}>{articleTitle}</Text>
									<View style = {{flexDirection:"row"}}>
										<Text style = {{fontSize:10, color:"grey"}}>posted at </Text>
										<Text style = {{fontSize:10, color:"grey"}}>{postedTime}</Text>
									</View>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style = {{flexDirection:"row", padding:10,}} onPress = {viewPost}>
								<View>
									<Image source = {{uri:topicImage}} style = {{width:40, height:32}} />
								</View>
								<View style = {{marginLeft:20,}}>
									<Text style = {{fontSize:15,}}>{articleTitle}</Text>
									<View style = {{flexDirection:"row"}}>
										<Text style = {{fontSize:10, color:"grey"}}>posted at </Text>
										<Text style = {{fontSize:10, color:"grey"}}>{postedTime}</Text>
									</View>
								</View>
							</TouchableOpacity>
							<TouchableOpacity style = {{flexDirection:"row", padding:10,}} onPress = {viewPost}>
								<View>
									<Image source = {{uri:topicImage}} style = {{width:40, height:32}} />
								</View>
								<View style = {{marginLeft:20,}}>
									<Text style = {{fontSize:15,}}>{articleTitle}</Text>
									<View style = {{flexDirection:"row"}}>
										<Text style = {{fontSize:10, color:"grey"}}>posted at </Text>
										<Text style = {{fontSize:10, color:"grey"}}>{postedTime}</Text>
									</View>
								</View>
							</TouchableOpacity> */}
							<FollowingScreen />
						</ScrollView>
					</View>
				</View>
			</View>
		</View>
	);
}