import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform, AsyncStorage, Text, TouchableOpacity, ScrollView, StyleSheet,} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import HTMLView from 'react-native-htmlview';
import Account from '../../components/Account';
import Modal from "react-native-modal";

import { useSelector, useDispatch } from 'react-redux';
import slice from '../../../reducer';
import {getProfile} from '../../core/model'

function PostViewScreen({navigation}) {

    const dispatch = useDispatch();
    const update = (json) => dispatch(slice.actions.update(json));

    const [isModalVisible, setModalVisible] = useState(false);
    const [article, setArticle] = useState({});
    const [height, setHeight] = useState(false);
    
    useEffect(() => {
        (async () => {
            // const storedPostsAmount = await AsyncStorage.getItem("desocial@0313/postsAmount") 
            // const storedArticle = await AsyncStorage.getItem("desocial@0313/article"+storedPostsAmount);
            const storedArticles = (await getProfile()).articles
            const storedArticle = storedArticles[storedArticles.length-1]
            console.log(storedArticle)
            setArticle(storedArticle)
            const L = storedArticle.title.length;
            if(L>35){
                setHeight(true)
            }
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
        
    }, []);

    const toggleImageModal = () => {
        setModalVisible(!isModalVisible);
    };
    return (
        <View>
            <Account />
            <View style = {{flexDirection:"row", marginLeft:10, marginTop:5,borderBottomWidth:2, borderBottomColor:"#737373", width:"100%", paddingBottom:10,}}>
                <TouchableOpacity onPress={() => navigation.replace('Dashboard')}>
                    <Image source = {require("../../assets/arrow_back.png")} style = {{width:25, height:25,}} />
                </TouchableOpacity>
                <Text style = {{fontSize:18, marginLeft:10,}}>{article.title ? article.title.slice(0,10) + " ..." : null}</Text>
                <Text style = {{fontSize:12, color:"grey", marginLeft:10,marginTop:6,}}> Just now </Text>
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
                {height===true?
                <View>
                    <View style = {{flexDirection:"row", marginTop:10,}}>
                        <Text style = {{color:"gray",marginLeft:"10%", fontSize:18,}}>❤ 0</Text>
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
                        <Text style = {{color:"gray",marginLeft:"10%", fontSize:18,}}>❤ 0</Text>
                        <View style = {{marginLeft:20,}}>
                            {(article.authorPhoto!=="anonymous")?
                                <Image source = {{uri:article.authorPhoto}} style = {{width:25, height:25, borderRadius:12.5,}} />:
                                <Image source={require("../../assets/avatarrandom.png")} style = {{width:20, height:20, borderRadius:10,}} />
                            }
                        </View>
                        <Text style = {{color:"black", marginLeft:7,fontSize:10, color:"grey", marginTop:8,}}>{(article.authorName==='')?"anonymous":article.authorName}</Text>
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
export default PostViewScreen;