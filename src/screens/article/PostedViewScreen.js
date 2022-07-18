import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView, StyleSheet,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import HTMLView from 'react-native-htmlview';
import Account from '../../components/Account';
import Modal from "react-native-modal";

import { useSelector , useDispatch } from 'react-redux';
import slice from '../../../reducer';

import { getProfile } from '../../core/model';

function PostedViewScreen({navigation}) {
    const G = useSelector(state => state);
    
	const dispatch = useDispatch();
	const update = (json) => dispatch(slice.actions.update(json));

    // const currentPage = useSelector(....)
    const [isModalVisible, setModalVisible] = useState(false);
    const [article, setArticle] = useState({});
    const [articles, setArticles] = useState([]);
    const [goodFeedbackStatu,setGoodFeedbackStatu] = useState(false)
    const [badFeedbackStatu,setBadFeedbackStatu] = useState(false)
    const [followingAmount, setFollowingAmount] = useState(0)
    const [height, setHeight] = useState(false);
    
    useEffect(() => {
        (async () => {
            /* const storedPostsAmount = await AsyncStorage.getItem("desocial@0313/postsAmount") */
            const storedArticles = (await getProfile()).articles
            setArticles(storedArticles)
            const storedArticle = storedArticles[G.currentPage-1]
            setArticle(storedArticle)
            setFollowingAmount(storedArticle.followingAmount)
            const L = storedArticle.title.length;
            if(L>35){
                setHeight(true)
            }
            // const storedFollowingStatu = await AsyncStorage.getItem("desocial@0313/followingStatu")
            // setFollowingAmount(storedFollowingStatu)
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        
    }, [G.currentPage, goodFeedbackStatu, badFeedbackStatu]);

    const toggleImageModal = () => {
        setModalVisible(!isModalVisible);
    };

    const onGoodFeedback = async () => {
        if(badFeedbackStatu===true){
            setBadFeedbackStatu(!badFeedbackStatu)
            setGoodFeedbackStatu(!goodFeedbackStatu)
            article.followingAmount+=2
            setFollowingAmount(article.followingAmount)
            articles[G.currentPage-1] = article
            await AsyncStorage.setItem("desocial@0313/article", JSON.stringify(articles))
            update({articles:articles})
        }else{
            if(goodFeedbackStatu===true){
                setGoodFeedbackStatu(!goodFeedbackStatu)
                article.followingAmount-=1
                setFollowingAmount(article.followingAmount)
                articles[G.currentPage-1] = article
                await AsyncStorage.setItem("desocial@0313/article", JSON.stringify(articles))
                update({articles:articles})
            }else{
                setGoodFeedbackStatu(!goodFeedbackStatu)
                article.followingAmount+=1
                setFollowingAmount(article.followingAmount)
                articles[G.currentPage-1] = article
                await AsyncStorage.setItem("desocial@0313/article", JSON.stringify(articles))
                update({articles:articles})
            }
        }
    }
    const onBadFeedback = async () => {
        if(goodFeedbackStatu===true){
            setGoodFeedbackStatu(!goodFeedbackStatu)
            setBadFeedbackStatu(!badFeedbackStatu)
            article.followingAmount-=2
            setFollowingAmount(article.followingAmount)
            articles[G.currentPage-1] = article
            await AsyncStorage.setItem("desocial@0313/article", JSON.stringify(articles))
            update({articles:articles})
        }else{
            if(badFeedbackStatu===true){
                setBadFeedbackStatu(!badFeedbackStatu)
                article.followingAmount+=1
                setFollowingAmount(article.followingAmount)
                articles[G.currentPage-1] = article
                await AsyncStorage.setItem("desocial@0313/article", JSON.stringify(articles))
                update({articles:articles})
            }else{
                setBadFeedbackStatu(!badFeedbackStatu)
                article.followingAmount-=1
                setFollowingAmount(article.followingAmount)
                articles[G.currentPage-1] = article
                await AsyncStorage.setItem("desocial@0313/article", JSON.stringify(articles))
                update({articles:articles})
            }
        }
    }
    return (
        <View>
            <Account />
            <View style = {{flexDirection:"row", marginLeft:10, marginTop:5,borderBottomWidth:2, borderBottomColor:"#737373", width:"100%", paddingBottom:10,}}>
                <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                    <Image source = {require("../../assets/arrow_back.png")} style = {{width:25, height:25,}} />
                </TouchableOpacity>
                {article.title?.length<10 ? 
                    (<Text style = {{fontSize:18, marginLeft:10,}}>{article.title}</Text> || null) : 
                    (<Text style = {{fontSize:18, marginLeft:10,}}>{article.title?article.title.slice(0,10):null}...</Text>)
                }
                <Text style = {{fontSize:12, color:"grey", marginLeft:10,marginTop:6,}}> saved at </Text>
                <Text style = {{fontSize:10, color:"#333333",marginTop:8,}}> {article.postedTime}</Text>
            </View>
            <Text style = {styles.titleStyle}>{article.title}</Text>
            <ScrollView style = {{marginTop:10,height:350}}>
                <TouchableOpacity onPress = {toggleImageModal} >
                    <Image source = {{uri: article.topicImage}} style = {styles.topicImageStyle} />
                </TouchableOpacity>
                <Modal isVisible={isModalVisible} style = {{marginLeft:30,}}>
                    <TouchableOpacity onPress = {toggleImageModal}>
                        <Image source = {require("../../assets/cross.png")} style = {{width:20, height:20, marginBottom:30,marginLeft:"80%"}} />
                    </TouchableOpacity>
                    <Image source = {{uri: article.topicImage}} style = {{width:300, height:240}} />
                    <Text style = {{color:"white"}}>{article.title}</Text>
                    <Text style = {{color:"white", textAlign:"right", padding:30,}}>Copyright@0x21.</Text>
                </Modal>
                <View style = {styles.articleStyle}>
                    <HTMLView value = {article.content} />
                </View>
                <View style = {{borderWidth:0.5,borderColor:"grey", width:"80%", marginLeft:"10%", paddingVertical:10, marginVertical:20,}}>
                    <Text style= {{textAlign:"center"}}>Is this article helpful?</Text>
                    <View style = {{flexDirection:"row", justifyContent:"center"}}>
                        {(badFeedbackStatu===true)?
                            <TouchableOpacity onPress = {onBadFeedback}>
                                <Image source = {require('../../assets/following_bad.png')} style ={{width:40, height:40,}} />
                            </TouchableOpacity>:
                            <TouchableOpacity onPress = {onBadFeedback}>
                                <Image source = {require('../../assets/following_bad_off.png')} style ={{width:40, height:40,}} />
                            </TouchableOpacity>
                        }
                        {(goodFeedbackStatu===true)?
                            <TouchableOpacity style = {{ marginLeft:30,}} onPress = {onGoodFeedback}>
                                <Image source = {require('../../assets/following_good.png')} style ={{width:40, height:40}} />
                            </TouchableOpacity>:
                            <TouchableOpacity style = {{ marginLeft:30,}} onPress = {onGoodFeedback}>
                                <Image source = {require('../../assets/following_good_off.png')} style ={{width:40, height:40}} />
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                {height===true?
                <View>
                    <View style = {{flexDirection:"row", marginTop:10,}}>
                        <Text style = {{color:"gray",marginLeft:"10%", fontSize:18,}}>❤ {followingAmount}</Text>
                        <View style = {{marginLeft:20,}}>
                            {(article.authorPhoto!=="anonymous")?
                                <Image source = {{uri:article.authorPhoto}} style = {{width:25, height:25, borderRadius:12.5,}} />:
                                <Image source={require("../../assets/avatarrandom.png")} style = {{width:20, height:20, borderRadius:10,}} />
                            }
                        </View>
                        <Text style = {{color:"black", marginLeft:7,fontSize:10, color:"grey", marginTop:8,}}>{article.authorName===''?"anonymous":article.authorName}</Text>
                    </View>
                    <Text style = {{color:"#333333", textAlign:"right", padding:10,}}>Copyright@0x21 </Text>
                </View>:null
                }
            </ScrollView>
            {height===false?
                <View>
                    <View style = {{flexDirection:"row", marginTop:10,}}>
                        <Text style = {{color:"gray",marginLeft:"10%", fontSize:18,}}>❤ {followingAmount}</Text>
                        <View style = {{marginLeft:20,}}>
                            {(article.authorPhoto!=="anonymous")?
                                <Image source = {{uri:article.authorPhoto}} style = {{width:25, height:25, borderRadius:12.5,}} />:
                                <Image source={require("../../assets/avatarrandom.png")} style = {{width:20, height:20, borderRadius:10,}} />
                            }
                        </View>
                        <Text style = {{color:"black", marginLeft:7,fontSize:10, color:"grey", marginTop:8,}}>{article.authorName===''?"anonymous":article.authorName}</Text>
                    </View>
                    <Text style = {{color:"#333333", textAlign:"right", padding:10,}}>Copyright@0x21 </Text>
                </View>:null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    titleStyle: {
        textAlign:"center",
        fontSize:30, 
        marginTop:5,
        padding:10,       
    },
    topicImageStyle: {
        width:150, 
        height:120,
        marginLeft:100,
        marginTop:20,
    },
    articleStyle: {
        marginTop:10,
        alignItems:"center",
        padding:20,
    }
})
export default PostedViewScreen;