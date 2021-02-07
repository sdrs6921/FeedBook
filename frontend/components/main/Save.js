import React, { useState } from 'react'
import { Text, View, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native'

import firebase from 'firebase'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require("firebase/firebase-storage")


export default function Save(props) {
    const [caption, setCaption] = useState("")
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [theme, setTheme] = useState("")

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            console.log(`transferred: ${snapshot.bytesTransferred}`)
        }

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log(snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {

        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                likesCount: 0,
                creation: firebase.firestore.FieldValue.serverTimestamp(),
                title,
                author,
                theme
            }).then((function () {
                props.navigation.popToTop()
            }))
    }
    return (
        <View style={styles.container}>
            <View style = {styles.imageContainer}>
            <Image source={{ uri: props.route.params.image }} style = {styles.image} />
            </View>
            <View style = {styles.textInputContainer}>
            <TextInput
                style = {styles.textInput}
                placeholder="제목"
                onChangeText={(title) => setTitle(title)}/>
            
            <TextInput
                style = {styles.textInput}
                placeholder="지은이"
                onChangeText={(author) => setAuthor(author)}
            />
            <TextInput
                style = {styles.textInput}
                placeholder="장르"
                onChangeText={(theme) => setTheme(theme)}
            />
            <TextInput
                style = {styles.textInput}
                placeholder="책의 느낌을 말해주세요.."
                onChangeText={(caption) => setCaption(caption)}
            />
            </View>
            <TouchableOpacity
                style = {styles.button} onPress={() => uploadImage()}>
                <Text
                    style = {styles.text}>사진 올리기</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        alignContent : 'center',
        
        
    },
    image : {
        width : 300,
        height : 300,
    },
    textInputContainer : {
        marginBottom : 20,
        marginLeft : 20
    },
    textInput : {
        height : 40,
        fontSize : 20,
        marginBottom : 10
    },
    imageContainer : {
        marginTop : 20,
        alignItems : 'center',
        marginBottom : 10
    },
    button : {
        height : 50,
        backgroundColor : '#03D37C',
        alignItems : 'center',
        justifyContent : 'center',
        marginLeft : 20,
        marginRight : 20,
        borderRadius : 15
    },
    text : {
        color : '#FFFFFF',
        fontSize : 20,
        fontWeight : 'bold'
    }
})
