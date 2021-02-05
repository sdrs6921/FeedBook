import React from 'react'
import { StyleSheet, Image, Text, View, Button, ImageBackground, TouchableOpacity } from 'react-native'
import background from '../../assets/LoginBackgroud.png'

export default function Landing({ navigation }) {
    const styles = StyleSheet.create({
        backgroundContainer : {
            flex : 1,
            justifyContent : 'flex-end',
            alignItems : 'center'
        },
        container : {
            flex : 1,
            
        },
        button : {
            backgroundColor : '#00C853',
            height : 50,
            width : 350,
            textAlign : 'center',
            alignItems : 'center',
            justifyContent : 'center',
            marginBottom : 30,
            borderRadius : 15
        },
        text : {
            color : '#FFFFFF',
            fontSize : 20,
            fontWeight : 'bold'
        }
    });
    return (
        <ImageBackground source = {background} style = {styles.backgroundContainer}>
            <View styles = {styles.container}>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress={() => navigation.navigate("Register")}>
                    <Text style = {styles.text}>회원 가입</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style = {styles.button}
                    onPress={() => navigation.navigate("Login")}>
                    <Text style = {styles.text}>로그인</Text>
                </TouchableOpacity>
                <View style={{height : 70}}></View>
            </View>
        </ImageBackground>
    )

}
