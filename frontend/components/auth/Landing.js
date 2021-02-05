import React from 'react'
import { StyleSheet, Image, Text, View, Button, ImageBackground } from 'react-native'
import background from '../../assets/LoginBackgroud.png'

export default function Landing({ navigation }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',

        },
        image: {
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center"
        },
        textInput: {
            width: '80%',
            height: 40,
            justifyContent: "center",
        },
        button: {
            width: "80%",
            marginBottom : 20,
        },
    });
    return (
        <ImageBackground
            source={background} style={styles.image}>
            <View style={styles.container}>
                <Image
                    source="../assets/MainLogo.png"

                />
                <Button
                    title="회원 가입"
                    color="#03D37C"
                    style = {styles.button}
                    onPress={() => navigation.navigate("Register")}
                />
                <Button
                    title="로그인"
                    color="#03D37C"
                    style = {styles.button}
                    onPress={() => navigation.navigate("Login")} />
            </View>
        </ImageBackground>
    )
    
}
