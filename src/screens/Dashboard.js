import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';  

import HomeScreen from './HomeScreen'
import PostScreen from './article/PostScreen'
// import PostViewScreen from './PostViewScreen'
import SettingsScreen from './setting/SettingScreen'
import FollowingScreen from './article/FollowingScreen'
import Background from '../components/Background'
import Account from '../components/Account';
import WalletScreen from './wallet/WalletScreen';

import { useSelector, useDispatch } from 'react-redux';
import slice from '../../reducer';

import { getProfile, initialAccount } from '../core/model';
// import { white } from 'react-native-paper/lib/typescript/styles/colors';
const Tab = createBottomTabNavigator();

export default function Dashboard() {
	const dispatch = useDispatch();
    const update = (json) => dispatch(slice.actions.update(json));

	const A = useSelector(state => state)
	// const [postsAmount, setPostsAmount] = useState(null);
	// const [followingStatu, setFollowingStatu] = useState(null);

	// useEffect(() => {
	// 	(async () => {
	// 		setPostsAmount((await getProfile()).postsAmount)
	// 		setFollowingStatu((await getProfile()).followingStatus)
	// 	})();
		
	// }, []);
  return (
	<>
		<Account />
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options = {{tabBarIcon:({focused})=>(
          <Ionicons name="home" focused={focused} color={focused?"#0099ff":"#737373"} size={30}/>
        )}} />
        <Tab.Screen name="Posts" component={PostScreen} 
          options = {{tabBarIcon:({focused})=>(
          	<View>
           		<Ionicons name="add-circle-outline" focused={focused} color={focused?"#0099ff":"#737373"} size={30}/>
				{A.postsAmount==="0" || 0 || null || undefined?
					null:
					<Text style = {styles.alamAmount_post}>{A.postsAmount}</Text>
				}
        	</View>
        )}}
        />
        <Tab.Screen name="Followings" component={FollowingScreen} 
          options = {{tabBarIcon:({focused})=>(
			<View>
				<Ionicons name="heart-outline" focused={focused}  color={focused?"#0099ff":"#737373"} size={30}/>
				{A.followingStatu==("0" || 0 || null || undefined)?
					null:
					<Text style = {styles.alamAmount_following}>{A.followingStatu}</Text>
				}
			</View>
        )}}
        />
		<Tab.Screen name="Wallet"
          component={WalletScreen}
          options = {{tabBarIcon:({focused})=>(
          <Ionicons name="wallet-outline" focused={focused} color={focused?"#0099ff":"#737373"} size={30}/>
        )}}
        />
        <Tab.Screen name="Settings"
          component={SettingsScreen}
          options = {{tabBarIcon:({focused})=>(
          <Ionicons name="settings-outline" focused={focused} color={focused?"#0099ff":"#737373"} size={30}/>
        )}}
        />
      </Tab.Navigator>
	  </>
  );
}


const styles = StyleSheet.create ({
	alamAmount_post:{
		position:"absolute",
		backgroundColor:"green",
		// borderWidth:1,
		borderRadius:7,
		color: "white",
		fontSize:8,
		padding: 2,
		width:14,
		height:14,
		fontWeight:"bold",
	},
	alamAmount_following:{
		position:"absolute",
		backgroundColor:"red",
		// borderWidth:1,
		borderRadius:7,
		color: "white",
		fontSize:8,
		padding: 2,
		width:14,
		height:14,
		fontWeight:"bold",
	}
})